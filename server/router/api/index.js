import express from 'express'
import sysRouter from './sys'

const router = express.Router()
router.use('/sys', sysRouter)
export default router
