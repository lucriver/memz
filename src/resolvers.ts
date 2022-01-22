module.exports = {
  Query: {
    user: async (_: any, { user_id }: any, { dataSources }: any) =>
      dataSources.MemzAPI.getUser(user_id),
    user_posts: async (
      _: any,
      { user_id, filter }: any,
      { dataSources }: any
    ) => dataSources.MemzAPI.getPosts(user_id, filter),
    user_post: async (
      _: any,
      { user_id, post_number }: any,
      { dataSources }: any
    ) => dataSources.MemzAPI.getPost(user_id, post_number),
  },
  Mutation: {
    createUser: async (_: any, newUser: any, { dataSources }: any) => {
      return dataSources.MemzAPI.postUser(newUser);
    },
    updateUser: async (_: any, user: any, { dataSources }: any) => {
      return dataSources.MemzAPI.putUser(user);
    },
    deleteUser: async (_: any, user: any, { dataSources }: any) => {
      return dataSources.MemzAPI.deleteUser(user);
    },
    createPost: async (_: any, post: any, { dataSources }: any) => {
      return dataSources.MemzAPI.postPost(post);
    },
    updatePost: async (_: any, post: any, { dataSources }: any) => {
      return dataSources.MemzAPI.putPost(post);
    },
    deletePost: async (_: any, post: any, { dataSources }: any) => {
      return dataSources.MemzAPI.deletePost(post);
    },
    deletePosts: async (_: any, post: any, { dataSources }: any) => {
      return dataSources.MemzAPI.deletePosts(post);
    },
  },
};
