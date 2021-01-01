const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: async (parent, args, context, info) => {
      return context.prisma.link.findMany();
    },
    link: async (parent, args, context) => {
      const link = await context.prisma.link.findUnique({
        where: {
          id: parseInt(args.id),
        },
      });
      return link;
    },
  },
  Mutation: {
    post: (parent, args, context) => {
      const link = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return link;
    },
    updateLink: async (parent, args, context) => {
      const { url, description } = args;
      if (url && description) {
        const link = await context.prisma.link.update({
          where: {
            id: parseInt(args.id),
          },
          data: {
            url,
            description,
          },
        });
        return link;
      }
      return;
    },
    deleteLink: async (parent, args, context) => {
      const link = await context.prisma.link.delete({
        where: {
          id: parseInt(args.id),
        },
      });
      return link;
    },
  },
};

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: {
    prisma,
  },
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
