import { books, authors } from "../data/data.js";

export const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (_root, args) => {
      if (args.author) {
        return books.filter((book) => book.author === args.author);
      }

      return books;
    },
    allAuthors: () => {
      return authors.map((author) => {
        const cnt = books.filter((book) => book.author === author.name).length;
        return { ...author, bookCount: cnt };
      });
    },
  },
};
