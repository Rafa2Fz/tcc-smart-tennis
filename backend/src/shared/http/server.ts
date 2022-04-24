import "reflect-metadata";
import 'config/database'
import 'shared/container'
import 'express-async-errors'

import dotenv from 'dotenv';
import express, { Request, Response } from 'express'
import rotas from './routes';
import { AppError } from "shared/error/AppError";
import path from 'path'
import cors from 'cors'


dotenv.config({
    path: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env',
    override: true
})


const app = express()

app.use(cors())
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

app.listen(`${process.env.PORT || 3000}`, () => {
    console.log(`Server iniciado na porta ${process.env.PORT? process.env.PORT:3000}`)
})