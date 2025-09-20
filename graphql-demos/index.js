import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// In-memory database
let users = []; // Will hold created users
let idCounter = 1; // For generating unique IDs

// GraphQL schema definition
const typeDefs = `#graphql
  type User {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    password: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    addUser(
      first_name: String!
      last_name: String!
      email: String!
      password: String!
    ): User!
  }
`;

// Resolvers define how to fetch the types
const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    addUser: (_, { first_name, last_name, email, password }) => {
      const newUser = {
        id: String(idCounter++), // Make sure it's a string since type is ID
        first_name,
        last_name,
        email,
        password,
      };
      users.push(newUser);
      return newUser;
    },
  },
};

// Create and start Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at: ${url}`);
