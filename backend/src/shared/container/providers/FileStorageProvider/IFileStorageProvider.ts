export interface IFileStorageProvider {
      salvar(arquivo: string, userId: string): Promise<string>
      criarDiretorioUsuario(userId: string): Promise<void>
      existeDiretorio(diretorio: string): Promise<boolean>
      apagarArquivo(diretorio: string): Promise<string>;
}
