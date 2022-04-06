import { CriarReservaUseCase, IDataRequest } from './CriarReservaUseCase';
import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'
import * as yup from 'yup';
import { AppError } from 'shared/error/AppError';

export class CriarReservaController {

    async index(request: Request, response: Response, next: NextFunction) {

        const criarReservaUseCase = container.resolve(CriarReservaUseCase)

        const { usuarioId, quadraId, personal, horario } = request.body as IDataRequest
        let schema = yup.object().shape({
            usuarioId: yup.string().uuid().required(),
            quadraId: yup.number().required(),
            personal: yup.boolean(),
            horario: yup.object().shape({
                ano: yup.number().required(),
                mes: yup.number().required(),
                dia: yup.number().required(),
                hora: yup.number().required()

            })
        })

        try {
            const eValido = await schema.validate(request.body)
        } catch (err) {
            const { message } = err as Error
            throw new AppError(message, 401)
        }

        const reserva = await criarReservaUseCase.execute({ usuarioId, quadraId, personal, horario })

        response.json({ reserva })
    }
}

