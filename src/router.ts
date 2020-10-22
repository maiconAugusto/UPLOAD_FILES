import {Router} from 'express';
const routes = Router();
import multer from 'multer';
import uploadControllers from './app/controllers/uploadControllers';
import Bucket from './storage/index';
import storage from './config/multer';
const upload = multer(storage);

routes.get('/list', uploadControllers.index)
routes.post('/upload', upload.single('file'), Bucket.uploadFile, uploadControllers.store)
routes.put('/upload-update/:path_buket/:id', upload.single('file'), Bucket.updateFile, uploadControllers.update)
routes.delete('/remove-upload/:path_buket/:id', Bucket.removeFile, uploadControllers.delete)

export default routes;