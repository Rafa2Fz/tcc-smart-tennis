
export interface IHashProvider {
    gerarHash(senha: string, salt: number): Promise<string>
    compare(senhaLimpa: string, senhaCriptografada: string): Promise<Boolean>
}