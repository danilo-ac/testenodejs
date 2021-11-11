import express from 'express'
import customerController from '../controller/CustomerController'
import { CUSTOMER_URI_PARAMS } from '../model/CustomerModel'

export const customerRoutes = express.Router()

customerRoutes.get(`/:${[CUSTOMER_URI_PARAMS.ID]}/gerar-vendas`, customerController.getSalesByCustomerId)
customerRoutes.post('', customerController.postNewCustomer)
customerRoutes.put(`/:${[CUSTOMER_URI_PARAMS.ID]}`, customerController.editCustomer)
customerRoutes.get(`/todas-vendas-pdf`, customerController.getAllCustomersSales)