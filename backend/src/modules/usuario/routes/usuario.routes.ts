import { Router } from 'express';
import { ensureAuthenticated } from 'shared/http/middleware/ensureAuthenticate';
import multer from 'multer';
import uploadConfig from 'config/upload';
import { AdicionarCreditoUsuarioController } from '../useCase/AdicionarCreditoUsuario/AdicionarCreditoUsuarioController';
import { BuscarUsuarioController } from '../useCase/BuscarUsuario/BuscarUsuarioController';

import { CriarUsuarioController } from '../useCase/CriarUsuario/CriarUsuarioController';
import UploadAvatarController from '../useCase/UploadAvatar/UploadAvatarController';

const upload = multer(uploadConfig);

const usuarioRotas = Router();
const buscarUsuarioController = new BuscarUsuarioController();
const criarUsuarioController = new CriarUsuarioController();
const adicionarCreditoUsuarioController = new AdicionarCreditoUsuarioController();
const uploadAvatarController = new UploadAvatarController();
usuarioRotas.post('/', criarUsuarioController.handler);
usuarioRotas.get('/', ensureAuthenticated, buscarUsuarioController.index);
usuarioRotas.post('/adicionarCredito', ensureAuthenticated, adicionarCreditoUsuarioController.index);
usuarioRotas.put('/avatar', ensureAuthenticated, upload.single('avatar'), uploadAvatarController.index);
usuarioRotas.get('/avatar/:userId/:fileName', ensureAuthenticated, (req, res) => {
  const { userId } = req.params;
  const { fileName } = req.params;

  res.sendFile(`${uploadConfig.tempDir}/${userId}/${fileName}`);
});

export default usuarioRotas;
