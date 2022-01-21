const { ApolloServer } = require('apollo-server');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const MemzAPI = require('./dataSource')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env')})

const port = process.env.port || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    MemzAPI: new MemzAPI(),
  }),
});


server.listen((port), () => {
  console.log(`Server is running on port: ${port}.`)
})
