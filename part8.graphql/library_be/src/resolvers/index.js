import { books, authors } from "../data/data.js";
import { v1 as uuid } from "uuid";

export const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (_root, args) => {
      if (args.author && args.genre && args.genre.length > 0) {
        return books.filter((book) => {
          const sameAuthor = book.author === args.author;
          const sameGenre = args.genre.some((genre) =>
            book.genres.includes(genre)
          );

          return sameAuthor && sameGenre;
        });
      }

      if (args.author) {
        return books.filter((book) => book.author === args.author);
      }

      if (args.genre && args.genre.length > 0) {
        return books.filter((book) => {
          return args.genre.some((genre) => book.genres.includes(genre));
        });
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
  Mutation: {
    addBook: (_root, args) => {
      const { title, author, published, genres } = args;
      const isNewBook = !books.some((book) => book.title === title);
      const isNewAuthor = !authors.some((auth) => auth.name === author);

      if (!isNewBook) return;

      const newBook = { title, author, published, genres, id: uuid() };
      books.push(newBook);

      if (isNewAuthor) {
        const newAuthor = { name: author, id: uuid() };
        authors.push(newAuthor);
      }

      return newBook;
    },
  },
};
