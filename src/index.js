const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => {
      return links.find((link) => link.id === args.id);
    },
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      const link = links.find((link) => link.id === args.id);
      if (!link) {
        return;
      }
      const { url, description } = args;
      if (url && description) {
        link.url = url;
        link.description = description;
        return link;
      }
      return;
    },
    deleteLink: (parent, args) => {
      const link = links.find((link) => link.id === args.id);
      if (!link) {
        return;
      }
      const index = links.findIndex((link) => link.id === args.id);
      links.splice(index, 1);
      return link;
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
