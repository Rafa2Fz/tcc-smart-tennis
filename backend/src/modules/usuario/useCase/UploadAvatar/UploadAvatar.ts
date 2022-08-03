import { IUsuarioRepositorio } from 'modules/usuario/repositories/IUsuarioRepositorio';
import { IFileStorageProvider } from 'shared/container/providers/FileStorageProvider/IFileStorageProvider';
import { inject, injectable } from 'tsyringe';
import upload from 'config/upload';
import path from 'path';
import { IUsuarioDTO } from 'modules/usuario/dto/IUsuarioDTO';

interface Request {
  userId: string,
  arquivo: string
}

@injectable()
export default class UploadAvatar {
  constructor(
    @inject('FileStorageProvider')
    private fileStorageProvider: IFileStorageProvider,
    @inject('UsuarioRepositorio')
    public usuarioRepositorio: IUsuarioRepositorio,
  ) {}

  async execute({ arquivo, userId }:Request): Promise<IUsuarioDTO> {
    const usuario = await this.usuarioRepositorio.buscarPorId(userId);
    const tempFileDir = path.resolve(upload.tempDir, arquivo);

    if (!usuario.avatar) {
      await this.fileStorageProvider.salvar(arquivo, userId);
      usuario.avatar = arquivo;
      await this.usuarioRepositorio.salvar(usuario);
      await this.fileStorageProvider.apagarArquivo(tempFileDir);

      return { ...usuario, avatar_url: usuario.avatarUrl };
    }
    const avatarAntigo = path.resolve(upload.tempDir, usuario.id, usuario.avatar);

    await this.fileStorageProvider.apagarArquivo(avatarAntigo);
    await this.fileStorageProvider.salvar(arquivo, userId);
    usuario.avatar = arquivo;
    await this.usuarioRepositorio.salvar(usuario);
    await this.fileStorageProvider.apagarArquivo(tempFileDir);

    return { ...usuario, avatar_url: usuario.avatarUrl };
  }
}
