import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const startServer = async () => {
    
    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    server.applyMiddleware({ app });

    await mongoose.connect('mongodb://localhost:27017/test', { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).catch(e => console.log(e));

    app.listen({ port: 4000 }, () => {
        mongoose.connection.db.dropDatabase();
        console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    });
};

startServer();