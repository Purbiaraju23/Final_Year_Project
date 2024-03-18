import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

/**
 * Service class is responsible for managing the interaction with Appwrite's API.
 * It initializes the Appwrite client, databases, and storage instances.
 */
export class Service {
    // Initialize Appwrite client.
    client = new Client();
    // Initialize Appwrite databases instance.
    databases;
    // Initialize Appwrite storage instance.
    storage;

    /**
     * Service constructor initializes the client, databases, and storage instances
     * with the provided config.
     * @param {Object} config - Configuration object containing the appwriteURL and
     * appwriteProjectId.
     */
    constructor() {
        // Set the Appwrite endpoint and project ID.
        this.client.setEndpoint(conf.appwriteURL).setProject(conf.appwriteProjectId);
        // Initialize Appwrite databases instance.
        this.databases = new Databases(this.client);
        // Initialize Appwrite storage instance.
        this.storage = new Storage(this.client);
    }

    /**
     * createPost method creates a new post document in the Appwrite database
     * with the given document properties.
     * @param {Object} data - Object containing the post document properties such as
     * title, slug, content, featuredImage, status, and userId.
     * @returns {Promise} Promise resolving the newly created document or rejecting
     * with an error if one occurs.
     */
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            // Create a new document with the given document properties.
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, // The ID of the database.
                conf.appwriteCollectionId, // The ID of the collection.
                slug, // The ID of the new document.
                {
                    title, // The title of the post.
                    content, // The content of the post.
                    featuredImage, // The featured image of the post.
                    status, // The status of the post.
                    userId, // The ID of the user who created the post.
                }
            );
        } catch (error) {
            // Log the error when creating the post.
            console.log("Appwrite service :: createPost :: error", "error");
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, {
                title, content, featuredImage, status
            })
        } catch (error) {
            console.log("Appwrite :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            return true;
        } catch (error) {
            console.log("Appwrite :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        } catch (error) {
            console.log("Appwrite :: deletePost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch (error) {
            console.log("Apprwite :: getPosts :: error", error);
            return false;
        }
    }

    //file Upload Service 

    // upload image to appwrite storage and returns the file
    async uploadFile(file) {
        try {
            return await this.storage.createFile(conf.appwriteBucketId, ID.unique(), file)
        } catch (error) {
            console.log("Appwrite File Upload Error: ", error);
            return false;
        }
    }

    // delete image from appwrite storage
    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(conf.appwriteBucketId, fileId)
            return true;
        } catch (error) {
            console.log("Appwrite Delete File Error: ", error);
            return false;
        }
    }

    // Get a file preview for a uploaded image on AppWrite Storage
    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId, fileId
        )
    }
}

/**
 * Initialize the Service class and export it for use.
 */
const service = new Service();
export default service;