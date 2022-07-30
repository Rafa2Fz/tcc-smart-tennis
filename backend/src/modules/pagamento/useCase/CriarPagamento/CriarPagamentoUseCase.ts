import { inject, injectable } from 'tsyringe';
import mercadoPago from 'mercadopago';
import { AppError } from 'shared/error/AppError';
import { IUsuarioRepositorio } from 'modules/usuario/repositories/IUsuarioRepositorio';
import { IPagamentoRepositorio } from '../../repositories/IPagamentoRepositorio';

interface IRequest {
    usuarioId: string
    pacote: 'pacote100' | 'pacote30'
}

interface IResponse {
    id: string;
}
@injectable()
export class CriarPagamentoUseCase {
  constructor(
        @inject('UsuarioRepositorio')
        private usuarioRepositorio: IUsuarioRepositorio,
        @inject('PagamentoRepositorio')
        private pagamentoRepositorio: IPagamentoRepositorio,
  ) {}

  async execute({ usuarioId, pacote }: IRequest): Promise<IResponse> {
    const usuario = await this.usuarioRepositorio.buscarPorId(usuarioId);

    const produtos = {
      pacote100: () => 100,
      pacote30: () => 30,
    };
    const gerarTotal = produtos[pacote];

    const total = gerarTotal();

    if (typeof total !== 'number') {
      throw new AppError('Pacote inválido', 400);
    }

    mercadoPago.configure({
      access_token: process.env.NODE_ENV === 'dev' ? process.env.DEV_ACCESS_TOKEN_MERCADOPAGO : process.env.PROD_ACCESS_TOKEN,
    });

    const preference = {

      items: [
        {
          title: pacote,
          unit_price: total,
          quantity: 1,
        },
      ],
      back_urls: {
        success: 'https://smart-tennis-front.herokuapp.com/dashboard',
        failure: 'https://smart-tennis-front.herokuapp.com/dashboard',
        pending: 'https://smart-tennis-front.herokuapp.com/dashboard',
      },

    };

    try {
      const response = await mercadoPago.preferences.create(preference);

      const { id } = response.body;

      const pagamento = await this.pagamentoRepositorio.criar(usuario, id, total);

      await this.pagamentoRepositorio.salvar(pagamento);

      usuario.setCredito = usuario.getCredito + total;
      await this.usuarioRepositorio.salvar(usuario);
      return { id };
    } catch (err) {
      console.log(err);
    }
  }
}
