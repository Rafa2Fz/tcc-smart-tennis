import {
  copyFile, stat, mkdir, unlink,
} from 'node:fs/promises';
import path from 'node:path';
import upload from 'config/upload';

import { AppError } from 'shared/error/AppError';
import { IFileStorageProvider } from './IFileStorageProvider';

export class FileStorageProvider implements IFileStorageProvider {
  async salvar(arquivo: string, userId: string): Promise<string> {
    const userFold = path.resolve(upload.tempDir, userId);
    const existeDiretorioUsuario = await this.existeDiretorio(userFold);

    if (existeDiretorioUsuario) {
      try {
        const originDir = path.resolve(upload.tempDir, arquivo);
        const destDir = path.resolve(upload.tempDir, userId, arquivo);
        await copyFile(originDir, destDir);
        return destDir;
      } catch {
        throw new AppError('O arquivo não pode ser copiado!', 500);
      }
    } else {
      await this.criarDiretorioUsuario(userId);
      try {
        const originDir = path.resolve(upload.tempDir, arquivo);
        const destDir = path.resolve(upload.tempDir, userId, arquivo);
        await copyFile(originDir, destDir);
        return destDir;
      } catch {
        throw new AppError('O arquivo não pode ser copiado', 500);
      }
    }
  }

  async existeDiretorio(diretorio: string): Promise<boolean> {
    try {
      await stat(diretorio);
      return true;
    } catch (err) {
      return false;
    }
  }

  async criarDiretorioUsuario(userId: string): Promise<void> {
    const userFold = path.resolve(upload.tempDir, userId);
    const existeDiretorioUsuario = await this.existeDiretorio(userFold);
    if (!existeDiretorioUsuario) {
      try {
        await mkdir(userFold);
      } catch (err) {
        throw new AppError('Erro na criação do diretório do usuário', 500);
      }
    }
  }

  async apagarArquivo(diretorio: string): Promise<string> {
    const existeDiretorio = this.existeDiretorio(diretorio);
    if (existeDiretorio) {
      try {
        await unlink(diretorio);
      } catch (err) {
        throw new AppError('Falha ao apagar o arquivo', 500);
      }
    }
    return diretorio;
  }
}
