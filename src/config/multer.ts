import multer from 'multer'
import crypto from 'crypto'
import {resolve, extname} from 'path'

export default {
    storage: multer.diskStorage({
        destination: resolve(__dirname + '..', '..', '..', 'temp'),
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, res) => {
                if (err) return
                return cb(null, res.toString('hex') + extname(file.originalname))
            })
        }
    })
}