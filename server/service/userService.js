import * as Model from 'server/db/AuthorModel'
import sequelize from 'server/db/sequelize'
import { setPageAndSize } from 'server/lib/utils'
import { PAGESIZE } from 'server/const/const'
import Sequelize from 'sequelize'

const Op = Sequelize.Op
const userService = {}
userService.userListAll = (user) => {
  let {page, size = PAGESIZE} = user
  let [offset, limit] = setPageAndSize(page, size)
  return Model.Users.findAndCountAll({
    offset,
    limit,
  })
}
userService.searchUser = (key) => Model.Users.findAll({
  where: {
    [Op.or]: {
      name: {
        [Op.like]: `${key}%`
      },
      mobile: {
        [Op.like]: `${key}%`
      },
      cardId: {
        [Op.like]: `${key}%`
      }
    }
  }
})
userService.addUser = (user) => Model.Users.create(user)
userService.getUser = (where) => Model.Users.findOne({where})
userService.setUser = (user) => {
  let {userId, ...other} = user
  return Model.Users.update(other, {
    where: {userId}
  })
}
export default userService
