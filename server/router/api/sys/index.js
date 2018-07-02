import express from 'express'
import userRouter from './user'
import orderRouter from './order'
import shopRouter from './shop'
import companyRouter from './company'

const router = express.Router()
router.use('/user', userRouter)
router.use('/order', orderRouter)
router.use('/shop', shopRouter)
router.use('/company', companyRouter)
export default router
