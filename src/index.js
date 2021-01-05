const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const { PubSub } = require("apollo-server");
const fs = require("fs");
const path = require("path");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Subscription = require("./resolvers/Subscription");
const { getUserId } = require("./utils");

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
  Subscription,
};

const prisma = new PrismaClient();
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
  context: ({ req }) => ({
    ...req,
    prisma,
    pubsub,
    userId: req && req.headers.authorization ? getUserId(req) : null,
  }),
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
