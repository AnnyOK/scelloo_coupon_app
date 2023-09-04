import { Request, Response } from 'express'
import { Cart } from '../models/carts'

export const addToCart = async (req: Request, res: Response) => {
  const payload = {
    user_id: req.query.user_id,
    ...req.body,
  }
  try {
    const newitem = await Cart.create(payload)
    res.status(201).send(newitem)
  } catch (e) {
    res.status(500).send(e)
  }
}
export const getCart = async (req: Request, res: Response) => {
  try {
    const cart = await Cart.findAll({ where: { user_id: req.query.user_id } })
    const totalPrice = cart.reduce(
      (total, product) => total + product.product_price * product.product_qty,
      0,
    )
    const totalItemCount = cart.reduce(
      (total, item) => total + item.product_qty,
      0,
    )
    res.status(200).send({ cart, totalPrice, totalItemCount })
  } catch (e) {
    res.status(500).send(e)
  }
}
