import { CriarReservaUseCase, IDataRequest } from './CriarReservaUseCase';
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import * as yup from 'yup';

export class CriarReservaController {

    async index(request: Request, response: Response) {

        const criarReservaUseCase = container.resolve(CriarReservaUseCase)

        const { usuarioId, quadraId, personal, horario } = request.body as IDataRequest

        let schema = yup.object().shape({
            usuarioId: yup.string().uuid().required(),
            quadraId: yup.string().required(),
            personal: yup.boolean().required(),
            horario: yup.object().shape({
                ano: yup.number().required(),
                mes: yup.number().required(),
                dia: yup.number().required(),
                hora: yup.number().required()

            })
        })

        const reserva = await criarReservaUseCase.execute({ usuarioId, quadraId, personal, horario })

        response.json({ reserva })
    }
}

