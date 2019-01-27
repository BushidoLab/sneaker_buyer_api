import * as mongoose from 'mongoose';
import { ApolloServer, gql } from 'apollo-server';
import { importSchema } from 'graphql-import';
import resolvers from './resolvers';
import { config } from 'dotenv';
config();

const start = async () => {
  mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  );
  const port = process.env.PORT || 4000;
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', _ => console.log('MongoDB now connected'));

  const apolloServer = new ApolloServer({
    typeDefs: gql(importSchema('src/schema.graphql')),
    resolvers,
    context: ({ req }) => ({
      ...req,
      db
    })
  });

  apolloServer.listen({ port }).then(({ url }) => {
    console.log(`🚀 Server Ready at ${url}`);
  });
};

start();
