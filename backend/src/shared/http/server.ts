import "reflect-metadata";
import 'config/database'
import 'shared/container'
import 'express-async-errors'

import express, { Request, Response } from 'express'
import rotas from './routes';
import { AppError } from "shared/error/AppError";

const app = express()

app.use(express.json());

app.use(rotas)

app.use((err, request: Request, response: Response, next) => {
    try {
        if (err instanceof AppError) {
            response.status(err.statusCode).json(err.message)
        } else {
            response.status(500).json({ message: 'Internal server error' })
            console.log(err.message)
        }
    } catch (err) {
        next(err);
    }
})

app.listen('3003', () => {
    console.log('Server iniciado na porta 3003')
})