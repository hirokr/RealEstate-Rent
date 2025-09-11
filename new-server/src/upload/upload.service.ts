import { Injectable } from '@nestjs/common';
import { UTApi } from 'uploadthing/server';

@Injectable()
export class UploadService {
  private utapi: UTApi;

  constructor() {
    this.utapi = new UTApi();
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    try {
      // Convert Multer files to File objects
      const fileObjects = files.map(file => 
        new File([new Uint8Array(file.buffer)], file.originalname, { type: file.mimetype })
      );

      // Upload files using UTApi
      const response = await this.utapi.uploadFiles(fileObjects);
      
      // Extract URLs from successful uploads
      const urls = response
        .filter(result => result.data)
        .map(result => result.data!.url);

      if (urls.length === 0) {
        throw new Error('No files were uploaded successfully');
      }

      return urls;
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error(`Failed to upload files: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async uploadPropertyImages(files: Express.Multer.File[]): Promise<string[]> {
    try {
      return await this.uploadFiles(files);
    } catch (error) {
      console.error('Property images upload error:', error);
      throw new Error(`Failed to upload property images: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async deleteFile(fileKey: string): Promise<void> {
    try {
      await this.utapi.deleteFiles(fileKey);
    } catch (error) {
      console.error('Delete file error:', error);
      throw new Error(`Failed to delete file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async deleteFiles(fileKeys: string[]): Promise<void> {
    try {
      await this.utapi.deleteFiles(fileKeys);
    } catch (error) {
      console.error('Delete files error:', error);
      throw new Error(`Failed to delete files: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}