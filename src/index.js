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
      return context.prisma.link.findFirst({
        where: {
          id: parseInt(args.id),
        },
      });
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
    updateLink: (parent, args) => {
      // const link = links.find((link) => link.id === args.id);
      // if (!link) {
      //   return;
      // }
      // const { url, description } = args;
      // if (url && description) {
      //   link.url = url;
      //   link.description = description;
      //   return link;
      // }
      return;
    },
    deleteLink: (parent, args) => {
      // const link = links.find((link) => link.id === args.id);
      // if (!link) {
      //   return;
      // }
      // const index = links.findIndex((link) => link.id === args.id);
      // links.splice(index, 1);
      // return link;
      return;
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
