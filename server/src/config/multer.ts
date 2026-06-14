import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer, {StorageEngine} from 'multer'
import cloudinary from '../config/cloudinary'

const storage: StorageEngine = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'profile_images',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 200, height: 200, crop: 'fill' }]
    } as object
});

export const upload = multer({ storage })