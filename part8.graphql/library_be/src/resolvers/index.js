// import { books, authors } from "../data/data.js";
import { v1 as uuid } from "uuid";

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "The Demon ",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

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
    editAuthor: (_root, args) => {
      if (args.setBornTo) {
        const auth = authors.find((author) => author.name === args.name);

        if (!auth) return;

        const updatedAuth = { ...auth, born: args.setBornTo };

        authors = authors.map((author) =>
          author.name === args.name ? updatedAuth : author
        );

        return updatedAuth;
      }
    },
  },
};
