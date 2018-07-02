import * as Model from 'server/db/AuthorModel'
import sequelize from 'server/db/sequelize'
import { setPageAndSize } from 'server/lib/utils'

const companyService = {}
companyService.getCompany = (where) => Model.Company.findOne({where})
companyService.setCompany = (company) => {
  let {companyId, ...other} = company
  return Model.Company.update(other, {where: {companyId}})
}
companyService.addCompany = (company) => Model.Company.create(company)
export default companyService
