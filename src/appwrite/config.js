/* eslint-disable no-unused-vars */
import conf from "../conf/conf.js";

import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectID);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        slug
      );
    } catch (error) {
      console.log("appwrite service :: getpost() :: ", error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        queries
      );
    } catch (error) {
      console.log("appwrite service :: getPosts() :: ", error);
    }
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId
        }
      );
    } catch (error) {
      console.log("appwrite service :: createPost() :: ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status, userId }) {
    try {
      return await this.databases.updateDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId
        }
      );
    } catch (error) {
      console.log("appwrite service :: updatePost() :: ", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appWriteDatabaseID,
        conf.appWriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log("appwrite service :: deleteDocument() :: ", error);
    }
  }

  //storgae service

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appWriteBucketID,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("appwrite service :: uploadFile() :: ", error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(conf.appWriteBucketID, fileId);
    } catch (error) {
      console.log("appwrite service :: deleteFile() :: ", error);
    }
  }

  getFilePreview(fileId){
return this.bucket.getFilePreview(conf.appWriteBucketID, fileId).href
  }
}

const service = new Service()

export default service
  