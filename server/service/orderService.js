import * as Model from 'server/db/AuthorModel'
import sequelize from 'server/db/sequelize'
import { setPageAndSize, encodeOrderNo, decodeOrderNo } from 'server/lib/utils'
import { orderStatus, sourceStatus } from 'server/const/const'
import Sequelize from 'sequelize'

const Op = Sequelize.Op
const orderService = {}
orderService.addOrder = (order) => {
  let {goods, combo, ...other} = order
  other.createdAt = new Date().getTime()
  console.log('other', other)
  const createOrderPromise = Model.Order.create(other)
  const createOrder2Goods = (orderId) => {
    let order2goods = goods.map((goodsId) => ({goodsId, orderId}))
    return Model.Order2Goods.bulkCreate(order2goods)
  }
  const createOrder2combo = (orderId) => {
    let order2combo = combo.map((comboId) => ({orderId, comboId}))
    return Model.Order2Combo.bulkCreate(order2combo)
  }
  return createOrderPromise.then((data) => {
    let orderId = data.orderId
    return Promise.all([createOrder2Goods(orderId), createOrder2combo(orderId)])
  })
}
orderService.orderListAll = (order) => {
  let {page, size, userInfo = ''} = order
  let [offset, limit] = setPageAndSize(page, size)
  let where
  if (userInfo) {
    where = {
      [Op.or]: {
        name: {
          [Op.like]: `${userInfo}%`
        },
        mobile: {
          [Op.like]: `${userInfo}%`
        },
        cardId: {
          [Op.like]: `${userInfo}%`
        }

      }
    }
  }
  const getUser = () => Model.Users.findAll({where})
  const orderListPromise = () => {
    if (!where) {
      return Model.Order.findAndCountAll({
        offset,
        limit
      })
    } else {
      return getUser().then((userList) => {
        let userIds = userList.map((user) => user.userId)
        return Model.Order.findAndCountAll({
          offset,
          limit,
          where: {
            userId: {
              [Op.in]: userIds
            }
          }
        })
      })

    }

  }
  return new Promise((resolve, reject) => {
    orderListPromise().then((result) => {
      let {rows, count} = result
      let orderList = rows.map((order) => {
        order = JSON.parse(JSON.stringify(order))
        order.orderId = encodeOrderNo(order.orderId, order.createdAt)
        return order
      })
      resolve({rows: orderList, count})
    }).catch((err) => {
      reject(err)
    })
  })
}
orderService.getOrder = (where) => {
  const orderInfo = Model.Order.findOne({
    where,
    include: [
      {
        model: Model.Goods,
        attributes: ['goodsId', 'name', 'price'],
        through: {
          attributes: []
        }
      },
      {
        model: Model.Combo,
        attributes: ['comboId', 'name', 'oprice', 'price'],
        through: {
          attributes: []
        }
      }
    ]
  })
  return new Promise((resolve, reject) => {
    orderInfo().then((order) => {
      order.orderId = encodeOrderNo(order.orderId, order.createdAt)
      resolve(order)
    }).catch((error) => {
      reject(error)
    })
  })
}
orderService.setOrder = (order) => {
  let {orderId, ...other} = order
  let decodeOrderId = decodeOrderNo(orderId)
  return Model.Order.update(other, {
    where: {
      orderId: decodeOrderId
    }
  })
}
orderService.offlinePay = (encodeOrderId) => {
  const orderId = decodeOrderNo(encodeOrderId)
  const getOrder = Model.Order.findOne({
    where: {
      orderId
    }
  })
  return getOrder.then((order) => {
    let {source, status} = order
    if (source === sourceStatus.offline && status === orderStatus.noPay) {
      order.status = orderStatus.pay
      return order.save()
    } else {
      return Promise.reject('该订单不可操作！！！')
    }
  })
}
export default orderService
