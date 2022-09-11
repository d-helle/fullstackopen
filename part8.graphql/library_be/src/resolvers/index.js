import { books, authors } from "../data/data.js";

export const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: () => books,
    allAuthors: () => {
      return authors.map((author) => {
        const cnt = books.filter((book) => book.author === author.name).length;
        return { ...author, bookCount: cnt };
      });
    },
  },
};
