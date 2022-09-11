import { books, authors } from "../data/data.js";

export const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: () => books,
  },
};
