import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite"

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.projectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.databaseId,
                conf.collectionId, 
                slug.slice(0, 26),
                {
                    title,
                    content,
                    featuredImage,
                    status, 
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.databaseId,
                conf.collectionId, 
                slug,{
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.databaseId,
                conf.collectionId, 
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.databaseId,
                conf.collectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.databaseId, 
                conf.collectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return false
        }
    }

    async uploadFile (file) {
        try {
            return await this.bucket.createFile(
                conf.bucketId, 
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.bucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            return false
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            conf.bucketId,
            fileId
        )

    }

}

const service = new Service()

export default service