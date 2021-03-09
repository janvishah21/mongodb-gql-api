import { Cat } from './models/Cat';

export const resolvers = {
    Query: {
        hello: () => 'Helloooo',
        cats: () => Cat.find()
    },
    Mutation: {
        createCat: async (_, { name }) => {
            console.log(name);
            const kitty = new Cat({ name });
            await kitty.save();
            console.log(kitty);
            return kitty;
        }
    }
};