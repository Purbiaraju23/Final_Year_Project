import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// AuthService class for managing authentication-related operations
export class AuthService {
  client = new Client(); // Creating a new instance of the 'Client' class from the 'appwrite' SDK
  account; // Variable to hold the 'Account' instance for authentication operations

  constructor() {
    // Configuring the 'Client' instance with the Appwrite API endpoint and project ID
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectId);

    // Creating an 'Account' instance with the confured 'Client' for user account operations
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      // Create a new user account with Appwrite SDK
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      // If the account creation is successful, automatically log in the user
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Error getting current user: ", error);
    }
    return null;
  }

  async logout() {
    try {
      return await this.account.deleteSessions();
    } catch (error) {
      console.log("Error logging out: ", error);
    }
  }
}

// Creating a singleton instance of the AuthService class to be used throughout the application
const authService = new AuthService();

export default authService;
