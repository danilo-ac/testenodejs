import moment from 'moment';
import CustomError from '../error/CustomError';
import { newCustomerDTO, NEW_CUSTOMER_DTO, requestResult, resultNewCustomerData, RESULT_DATA_ITEM_KEYS, RESULT_DATA_KEYS, RESULT_NEW_CUSTOMER, salesData, salesItens } from '../model/CustomerModel';
import CustomerRepository from './CustomerRepository';

export default class CustomerBusiness {

    constructor(
        private customerDatabase: CustomerRepository
    ) { }


    public async getSalesByCustomerId(customerId: number): Promise<requestResult> {

        //to do: input parameter validation 

        try {

            const salesByCustomer: Array<salesData & salesItens> | null = await this.customerDatabase
                .getSalesByCustomerId(customerId)

            if (!salesByCustomer) {
                throw new CustomError(401, 'Cliente não encontrado', 1, null).mountError()
            }

            const invoices: Array<salesData | null> = !salesByCustomer ?
                [] :
                [...new Set(
                    salesByCustomer?.map((item: salesData & salesItens) => {
                        return item[`${RESULT_DATA_KEYS.INVOICE_CODE}`]
                    })
                )]
                    .sort()
                    .map((invoiceCode: number) => {

                        const invoiceItems: Array<salesItens> = []

                        let invoiceTotalValue: number = 0

                        const invoiceData: salesData & salesItens | any = salesByCustomer?.find((item: salesData & salesItens) => {
                            return item[RESULT_DATA_KEYS.INVOICE_CODE] === invoiceCode
                        })

                        salesByCustomer?.forEach((item: salesData & salesItens): void => {
                            if (item[RESULT_DATA_KEYS.INVOICE_CODE] === invoiceCode) {
                                invoiceItems.push({
                                    [RESULT_DATA_ITEM_KEYS.NAME]: item[RESULT_DATA_ITEM_KEYS.NAME],
                                    [RESULT_DATA_ITEM_KEYS.VALUE]: item[RESULT_DATA_ITEM_KEYS.VALUE],
                                    [RESULT_DATA_ITEM_KEYS.QUANTITY]: item[RESULT_DATA_ITEM_KEYS.QUANTITY]
                                })
                                invoiceTotalValue += item[RESULT_DATA_ITEM_KEYS.VALUE]
                            }
                        });

                        const mountData: salesData = {
                            [RESULT_DATA_KEYS.JSON]: "Local Mysql",
                            [RESULT_DATA_KEYS.NAME]: invoiceData[RESULT_DATA_KEYS.NAME],
                            [RESULT_DATA_KEYS.PHONE]: invoiceData[RESULT_DATA_KEYS.PHONE],
                            [RESULT_DATA_KEYS.PURCHASE_DATE]: invoiceData ? invoiceData[RESULT_DATA_KEYS.PURCHASE_DATE] : 0,
                            [RESULT_DATA_KEYS.INVOICE_CODE]: invoiceData ? invoiceData[RESULT_DATA_KEYS.INVOICE_CODE] : 0,
                            [RESULT_DATA_KEYS.TOTAL_PURCHASE_VALUE]: invoiceTotalValue,
                            [RESULT_DATA_KEYS.PURCHASED_ITEMS]: invoiceItems
                        }

                        return mountData
                    })

            const result: requestResult = requestResult.toSuccessfullyOutput(invoices)

            return result

        } catch (error) {

            //to do: error treatment

            throw error
        }

    }


    private isValidCPF(input: string) {

        const regex = /[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/;

        return regex.test(input);

    }

    public async postNewCustomer(newCustomerDTO: newCustomerDTO): Promise<requestResult> {

        try {

            if (!Object.keys(newCustomerDTO)) {
                throw new CustomError(
                    400,
                    "Informações ausentes",
                    1,
                    `Necessário informar '${NEW_CUSTOMER_DTO.NAME}', '${NEW_CUSTOMER_DTO.PHONE}' e '${NEW_CUSTOMER_DTO.CPF}'`)
                    .mountError()
            }

            if (!this.isValidCPF(newCustomerDTO[NEW_CUSTOMER_DTO.CPF])) {
                throw new CustomError(
                    406,
                    'CPF não enviado corretamente',
                    1,
                    'CPF não enviado corretamente')
                    .mountError()
            }

            //to do: advanced DTO validation / http status 406

            newCustomerDTO[NEW_CUSTOMER_DTO.CREATE_AT] = moment(new Date()).format("YYYY-MM-DD HH:mm:ss.SSSSSS")

            const newCustomerRegister = await this.customerDatabase.postNewCustomer(newCustomerDTO)

            const newUserInfo: resultNewCustomerData = {
                [RESULT_NEW_CUSTOMER.ID]: Number(newCustomerRegister),
                [RESULT_NEW_CUSTOMER.NAME]: newCustomerDTO[NEW_CUSTOMER_DTO.NAME]
            }

            const result: requestResult = requestResult.toSuccessfullyNewCustomerRes(newUserInfo)

            return result

        } catch (error) {

            //to do: error treatment

            throw error
        }
    }


}