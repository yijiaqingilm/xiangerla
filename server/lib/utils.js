import ErrorData from '../baseData/ErrorData'
import { validationResult, check } from 'express-validator/check'
import { PAGESIZE } from '../const/const'
import moment from 'moment'
import config from 'server/config/config.json'
import Hashids from 'hashids'

const handleErr = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(422).json(new ErrorData(errors.array()[0].msg))
    return
  } else {
    next()
  }
}
const checkPage = check('page', 'page参数格式不正确').isInt()
const setPageAndSize = (page, size = PAGESIZE) => {
  let preIndex = (page - 1) * size
  let sufIndex = (page - 1) * size + size
  return [preIndex, sufIndex]
}

const hashIds = new Hashids(config.hashSalt, 8, '12345ABCDE67890FGHJKMNPRSTUWXYZ')
const encodeOrderNo = (orderId, createTime) => `${moment(createTime).format('YYMMDD')}${hashIds.encode(orderId)}`
const decodeOrderNo = (str) => Number(hashIds.decode(str.substr(6)))
export {
  handleErr,
  checkPage,
  setPageAndSize,
  encodeOrderNo,
  decodeOrderNo
}
