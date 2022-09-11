import { gql } from "apollo-server";

export const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
  }
`;
