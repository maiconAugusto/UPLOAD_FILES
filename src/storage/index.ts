import {Request, Response, NextFunction} from 'express';
import bucket from '../config/firebase';
import {unlink} from 'fs';

export default {
    async uploadFile(req: Request, res: Response, next: NextFunction) {
        if (req.file === undefined){
            return next()
        }
        const metadata = {
          metadata: {
            firebaseStorageDownloadTokens: req.file.filename
          },
          contentType: 'image/png',
          cacheControl: 'public, max-age=31536000',
        };
      
        await bucket.upload(req.file.path, {
          gzip: true,
          metadata: metadata,
        });

        let file = await Promise.resolve("https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(req.file.filename) + "?alt=media&token=" + req.file.filename)
        req.body = {
            file_url: file,
            path_buket: req.file.filename
        }
        unlink(req.file.path, ()=>{})
        next()
    },
    async updateFile(req: Request, res: Response, next: NextFunction){
    const {path_buket} = req.params
    const metadata = {
      metadata: {
        firebaseStorageDownloadTokens: req.file.filename
      },
      contentType: 'image/png',
      cacheControl: 'public, max-age=31536000',
    };
    bucket.deleteFiles({
      prefix: path_buket
    },async function( err) {
      if (!err) {
        await bucket.upload(req.file.path, {
          gzip: true,
          metadata: metadata,
        });
    
        let file = await Promise.resolve("https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(req.file.filename) + "?alt=media&token=" + req.file.filename)
        req.body = {
            file_url: file,
            path_buket: req.file.filename
        }
        unlink(req.file.path, ()=>{})
        next()
      }
    });
    },
    async removeFile(req: Request, res: Response, next: NextFunction) {
      const {path_buket} = req.params

      bucket.deleteFiles({
        prefix: path_buket
      }, function(err) {
        if (!err) {
          return next()
        }
        return res.status(400).json({data: 'Not found!'})
      });
    }
}