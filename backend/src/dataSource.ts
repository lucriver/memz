import { RESTDataSource } from "apollo-datasource-rest";

class MemzAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.BASEURL;
  }

  // Get a specific user's credentials only
  async getUser(user_id: string): Promise<any[]> {
    return await this.get("/users/" + user_id);
  }

  // Get a specific user's posts only, filter is "all" or type.
  async getPosts(user_id: string, filter: string): Promise<any[]> {
    return await this.get("/posts/" + user_id + "/" + filter);
  }

  // Get a specific user's post. Only 1 post will return.
  async getPost(user_id: string, post_number: number): Promise<any[]> {
    return await this.get("/posts/" + user_id + "/post/" + post_number);
  }

  // Post a new user to the database
  async postUser({ user }: any): Promise<any[]> {
    return await this.post("/users", user);
  }

  // Update a users credentials
  async putUser({ user }: any): Promise<any[]> {
    return await this.put("/users/" + user.user_id, user);
  }

  // Delete a user and all their posts from the database.
  async deleteUser({ user }: any): Promise<any[]> {
    return await this.delete("/users/" + user.user_id);
  }

  // Post a post to the database.
  async postPost({ post }: any): Promise<any[]> {
    return await this.post("/posts/", post);
  }

  // Update a post from the database.
  async putPost({ post }: any): Promise<any[]> {
    console.log(post.user_id + " " + post.post_number);
    return await this.put(
      "/posts/" + post.user_id + "/" + post.post_number,
      post
    );
  }

  // Delete a user's specific post from the database
  async deletePost({ post }: any): Promise<any[]> {
    return await this.delete(
      "/posts/" + post.user_id + "/post/" + post.post_number
    );
  }

  // Delete all of a user's post from the data base by filter "all" or type.
  async deletePosts({ post }: any): Promise<any[]> {
    return await this.delete("/posts/" + post.user_id + "/" + post.post_type);
  }
}

module.exports = MemzAPI;
