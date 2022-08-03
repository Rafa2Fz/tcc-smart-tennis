import path from 'path';
import multer from 'multer';
import { AppError } from 'shared/error/AppError';

const tempDir = path.resolve(__dirname, '..', '..', './tmp');
export default {
  tempDir,
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, tempDir);
    },
    filename(req, file, callback) {
      const extension = file.mimetype.split('/')[1];
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      callback(null, `${uniqueSuffix}.${extension}`);
    },
  }),

  fileFilter(req, file, cb) {
    const mimeType = file.mimetype.split('/')[1];

    const extensoesAceitas = new RegExp('\jpeg|png|jpg');

    const eImagem = extensoesAceitas.test(mimeType);

    eImagem ? cb(null, true) : cb(new AppError('Formato da imagem inválido', 400));
  },
};
