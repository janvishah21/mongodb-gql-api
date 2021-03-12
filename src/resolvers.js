import { Book } from './models/Book';
import { Author } from './models/Author';

export const resolvers = {
    Author: {
        books: (author) => Book.find({ authorId: author.id })
    },
    Book: {
        author: (book) => Author.findById(book.authorId)
    },
    Query: {
        hello: () => 'Helloooo',
        authors: () => Author.find(),
        author: (_, { id }) => Author.findById(id),
        books: () => Book.find(),
        book: (_, { id }) => Book.findById(id)
    },
    Mutation: {
        addAuthor: async (_, { name }) => {
            const author = new Author({ name });
            await author.save();
            return author;
        },
        addBook: async (_, { name, authorName }) => {
            const author = await Author.findOne({ name: authorName.trim() });
            let authorId;
            if(!author) {
                const author = new Author({ name: authorName });
                console.log('New Author Created');
                await author.save();
                authorId = author.id;
            } else
                authorId = author.id;
            const book = new Book({ name, authorId });
            await book.save();
            return book;
        }
    }
};