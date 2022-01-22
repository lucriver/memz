const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    user_id: String
    user_number: Int
    email: String
    first_name: String
    last_name: String
    bio: String
    avatar: String
    location: String
    date_joined: String
  }

  input UserInput {
    user_id: String
    email: String
    first_name: String
    last_name: String
    bio: String
    avatar: String
    location: String
  }

  type Post {
    post_number: Int
    user_id: String
    post_type: String
    title: String
    description: String
    tags: [String]
    url: String
    date_posted: String
  }

  input PostInput {
    post_number: Int
    user_id: String
    post_type: String
    title: String
    description: String
    tags: [String]
    url: String
  }

  input PostInputDelete {
    post_number: Int
    user_id: String
    post_type: String
  }

  type DeletePayload {
    response: String
  }

  type Query {
    user(user_id: String): User!
    user_posts(user_id: String, filter: String): [Post!]!
    user_post(user_id: String, post_number: Int): Post!
  }

  type Mutation {
    createUser(user: UserInput): User
    updateUser(user: UserInput): User
    deleteUser(user: UserInput): DeletePayload
    createPost(post: PostInput): Post
    updatePost(post: PostInput): Post
    deletePost(post: PostInputDelete): DeletePayload
    deletePosts(post: PostInputDelete): DeletePayload
  }
`;
