import 'reflect-metadata'
import express, { Response, Request, Express } from 'express'
import dotenv from 'dotenv'
import connection from './src/db/connection'
import router from './src/routes/routes'

dotenv.config()
const app: Express = express()

app.use(express.json())
const port = process.env.PORT
app.use("/",router)
app.get('/', async(req: Request, res: Response) => {
  res.send('Express + TypeScript Server ')
})
const start = async (): Promise<void> => {
  try {
      await connection.sync()
    app.listen(port, () => {
      console.log(`Server started on port ${port}`)
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

void start()
