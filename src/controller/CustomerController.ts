import { Request, Response } from "express";
import CustomerBusiness from "../business/CustomerBusiness";
import SQLCustomerDatabase from "../data/SQLCustomerDatabase";
import CustomError from "../error/CustomError";
import { CUSTOMER_FILES_TYPE, CUSTOMER_URI_PARAMS, CUSTOMER_URI_QUERIES, editCustomerDTO, EDIT_CUSTOMER_DTO, newCustomerDTO, NEW_CUSTOMER_DTO, RESULT_EDIT_CUSTOMER } from "../model/CustomerModel";


export class CustomerController {

    constructor(
        private customerBusiness: CustomerBusiness
    ) { }


    public async getSalesByCustomerId(
        req: Request, res: Response
    ): Promise<any> {

        //to do: input params validation 

        const customerId = Number(req.params[CUSTOMER_URI_PARAMS.ID])

        if (
            req.query[CUSTOMER_URI_QUERIES.GENERATE_REPORT] &&
            (Object.values(CUSTOMER_FILES_TYPE) as Array<any>)
                .includes(req.query[CUSTOMER_URI_QUERIES.GENERATE_REPORT])
        ) {

            try {

                const generateFile = await customerBusiness.getExcelReportByCustomerId(customerId)

                return res
                    .status(201)
                    .send(generateFile)
                    .end()

            } catch (error: any) {
                res
                    .status(error.code || 500)
                    .send(error.message || "Internal Error")
                    .end()
            }

        }

        try {

            const salesByCustomerId = await customerBusiness
                .getSalesByCustomerId(customerId)

            return res
                .status(200)
                .send(salesByCustomerId)
                .end()

        } catch (error: any) {
            res
                .status(error.code || 500)
                .send(error.message || "Internal Error")
                .end()
        }
    }


    public async postNewCustomer(
        req: Request, res: Response
    ): Promise<any> {

        try {

            if (!Object.keys(req.body).length) {
                throw new CustomError(
                    400,
                    "Informações ausentes",
                    1,
                    `Necessário informar '${NEW_CUSTOMER_DTO.NAME}', '${NEW_CUSTOMER_DTO.PHONE}' e '${NEW_CUSTOMER_DTO.CPF}'`)
                    .mountError()
            }

            const newCustomerDTO: newCustomerDTO = {
                [NEW_CUSTOMER_DTO.NAME]: req.body[NEW_CUSTOMER_DTO.NAME],
                [NEW_CUSTOMER_DTO.PHONE]: req.body[NEW_CUSTOMER_DTO.PHONE],
                [NEW_CUSTOMER_DTO.CPF]: req.body[NEW_CUSTOMER_DTO.CPF]
            }

            const newCustomerInfo = await customerBusiness
                .postNewCustomer(newCustomerDTO)

            return res
                .status(201)
                .send(newCustomerInfo)
                .end()

        } catch (error: any) {
            res
                .status(error.code || 500)
                .send(error.message || "Internal Error")
                .end()
        }
    }


    public async editCustomer(
        req: Request, res: Response
    ): Promise<any> {

        try {

            if (!req.params[CUSTOMER_URI_PARAMS.ID] ||
                !req.params[CUSTOMER_URI_PARAMS.ID].trim() ||
                req.params[CUSTOMER_URI_PARAMS.ID] === `:${[CUSTOMER_URI_PARAMS.ID]}`) {
                throw new CustomError(
                    400,
                    "Informações ausentes",
                    1,
                    `Necessário informar '${RESULT_EDIT_CUSTOMER.ID}'`)
                    .mountError()
            }

            if (!Object.keys(req.body).length) {
                throw new CustomError(
                    400,
                    "Informações ausentes",
                    1,
                    `Necessário informar qual campo de edição`)
                    .mountError()
            }

            const editCustomerDTO: editCustomerDTO = req.body
            editCustomerDTO[EDIT_CUSTOMER_DTO.ID] = Number(req.params[CUSTOMER_URI_PARAMS.ID])

            const editCustomerInfo = await customerBusiness
                .editCustomer(editCustomerDTO)

            return res
                .status(201)
                .send(editCustomerInfo)
                .end()

        } catch (error: any) {
            res
                .status(error.code || 500)
                .send(error.message || "Internal Error")
                .end()
        }
    }


    public async getAllCustomersSales(
        req: Request, res: Response
    ): Promise<any> {
        try {

            const generateFile = await customerBusiness.getAllCustomersSales()

            return res
                .status(201)
                .send(generateFile)
                .end()

        } catch (error: any) {
            res
                .status(error.code || 500)
                .send(error.message || "Internal Error")
                .end()
        }
    }




}

const customerDatabase = new SQLCustomerDatabase();
const customerBusiness = new CustomerBusiness(customerDatabase);
const customerController = new CustomerController(customerBusiness);

export default customerController;