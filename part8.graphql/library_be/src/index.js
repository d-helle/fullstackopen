import { ApolloServer, gql } from "apollo-server";
import { typeDefs } from "./typeDefs/index.js";
import { resolvers } from "./resolvers/index.js";

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
