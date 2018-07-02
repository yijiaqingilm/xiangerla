import express from 'express'
import BaseData from 'server/baseData'
import ErrorData from 'server/baseData/ErrorData'
import { handleErr } from 'server/lib/utils'
import companyService from 'server/service/companyService'
import { check } from 'express-validator/check'

const router = express.Router()

router.post('/info', (req, res, next) => {
  companyService.getCompany({companyId: 1}).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})
router.post('/set', [check('companyId', 'companyId 格式不正确').isInt(), handleErr], (req, res, next) => {
  let company = req.body
  companyService.setCompany(company).then((data) => {
    res.json(new BaseData(data))
  }).catch((error) => {
    res.json(new ErrorData(error))
  })
})

export default router
