import { Request, Response } from 'express'
import { User } from '../models/user'

export const createNewUser = async (req: Request, res: Response) => {
  const payload = { ...req.body }
  try {
    const newUser = await User.create(payload)

    res.status(201).send(newUser)
  } catch (e) {
    res.status(500).send('internal server error')
  }
  
}
export const getAllUser=async(req:Request,res:Response)=>{
  const allUsers = await User.findAll()
  res.status(200).send(allUsers)
}
