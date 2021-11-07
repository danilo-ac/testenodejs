import { Request, Response } from "express";
import CustomerBusiness from "../business/CustomerBusiness";
import SQLCustomerDatabase from "../data/SQLCustomerDatabase";
import CustomError from "../error/CustomError";
import { newCustomerDTO, NEW_CUSTOMER_DTO } from "../model/CustomerModel";


export class CustomerController {

    constructor(
        private customerBusiness: CustomerBusiness
    ) { }


    public async getSalesByCustomerId(
        req: Request, res: Response
    ): Promise<any> {

        //to do: input params validation 

        try {

            const salesByCustomerId = await customerBusiness
                .getSalesByCustomerId(Number(req.params.customerId))

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

}

const customerDatabase = new SQLCustomerDatabase();
const customerBusiness = new CustomerBusiness(customerDatabase);
const customerController = new CustomerController(customerBusiness);

export default customerController;