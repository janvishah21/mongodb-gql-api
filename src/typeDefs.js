import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type Query {
        hello: String!
        authors: [Author!]!
        author(id: String!): Author
        books: [Book!]!
        book(id: String!): Book
    }
    type Mutation {
        addAuthor(name: String!): Author!
        updateAuthor(id: String!, name: String): Author!
        addBook(name: String!, authorName: String): Book!
        updateBook(id: String!, name: String, authorName: String): Book!
    }
    type Book {
        id: ID!
        name: String!
        author: Author
    }
    type Author {
        id: ID!
        name: String!
        books: [Book!]!
    }
`;