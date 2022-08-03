import { Request } from 'express';
import { container } from 'tsyringe';
import UploadAvatar from './UploadAvatar';

export default class UploadAvatarController {
  async index(request: Request, response: Response) {
    const { filename } = request.file;
    const { id } = request.usuario;

    const uploadAvatar = container.resolve(UploadAvatar);

    const usuario = await uploadAvatar.execute({ arquivo: filename, userId: id });
    response.json(usuario);
  }
}
