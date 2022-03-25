import express from 'express'

const app = express()
app.use(express.json());

app.listen('3003', () => {
    console.log('Server has started on port 3003')
})