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
        updateAuthor: async (_, { id, name }) => {
            if(name) {
                let author = await Author.findByIdAndUpdate(id, { name });
                author = await Author.findById(id);
                return author;
            }
            return null;
        },
        deleteAuthor: async (_, { id }) => {
            const author = Author.findByIdAndDelete(id);
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
        },
        updateBook: async (_, { id, name, authorName }) => {
            let update = {};
            if(authorName) {
                const author = await Author.findOne({ name: authorName.trim() });
                let authorId;
                if(!author) {
                    const author = new Author({ name: authorName });
                    console.log('New Author Created');
                    await author.save();
                    authorId = author.id;
                } else
                    authorId = author.id;
                update.authorId = authorId;
            }
            if(name)
                update.name = name;
            let book = await Book.findByIdAndUpdate(id, update);
            book = await Book.findById(id);
            return book;
        },
        deleteBook: async (_, { id }) => {
            const book = Book.findByIdAndDelete(id);
            return book;
        },
    }
};