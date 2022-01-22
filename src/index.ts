const { ApolloServer } = require("apollo-server");
const { ApolloServerPluginLandingPageDisabled } = require("apollo-server-core");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const MemzAPI = require("./dataSource");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const port = process.env.PORT || 8080;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageDisabled()],
  dataSources: () => ({
    MemzAPI: new MemzAPI(),
  }),
  context: ({ req }: any) => {
    return {
      token: req.headers.authorization || " ",
    };
  },
});

if(process.env.NODE_ENV === 'production'){
  server.use(ApolloServer.static('client/build/'));

  server.get('*', (req: any,res: any) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

server.listen(port, () => {
  console.log(`Server is running on port: ${port}.`);
});
