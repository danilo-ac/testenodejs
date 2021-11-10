import moment from 'moment';
import CustomError from '../error/CustomError';
import { editCustomerDTO, EDIT_CUSTOMER_DTO, EXCEL_REPORT_COLUMNS, newCustomerDTO, NEW_CUSTOMER_DTO, requestResult, REQUEST_RESULT_KEYS, resultEditCustomerData, resultNewCustomerData, resultReportFileGeneration, RESULT_DATA_ITEM_KEYS, RESULT_DATA_KEYS, RESULT_NEW_CUSTOMER, RESULT_REPORT_FILE_GEN, salesData, salesItens } from '../model/CustomerModel';
import CustomerRepository from './CustomerRepository';
import xlsx from 'xlsx'
import fs from 'fs'
import path from 'path'

export default class CustomerBusiness {

    constructor(
        private customerDatabase: CustomerRepository
    ) { }


    public async getSalesByCustomerId(
        customerId: number
    ): Promise<requestResult> {

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

    public async postNewCustomer(
        newCustomerDTO: newCustomerDTO
    ): Promise<requestResult> {

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

            const newCustomerInfo: resultNewCustomerData = {
                [RESULT_NEW_CUSTOMER.ID]: Number(newCustomerRegister),
                [RESULT_NEW_CUSTOMER.NAME]: newCustomerDTO[NEW_CUSTOMER_DTO.NAME]
            }

            const result: requestResult = requestResult.toSuccessfullyNewCustomerRes(newCustomerInfo)

            return result

        } catch (error) {

            //to do: error treatment

            throw error
        }
    }

    protected isValidBodyKeys(body: any, keysModel: any[]) {
        return Object.keys(body).every((item: any) => {
            return keysModel.includes(item)
        })
    }

    public async editCustomer(
        editCustomerDTO: editCustomerDTO
    ): Promise<requestResult> {

        try {

            if (!editCustomerDTO[EDIT_CUSTOMER_DTO.ID] ||
                !editCustomerDTO[EDIT_CUSTOMER_DTO.ID].toString().trim() ||
                isNaN(editCustomerDTO[EDIT_CUSTOMER_DTO.ID])
            ) {
                throw new CustomError(
                    400,
                    "Informações ausentes",
                    1,
                    `Necessário informar '${EDIT_CUSTOMER_DTO.ID}'`)
                    .mountError()
            }

            if (!Object.keys(editCustomerDTO).length) {
                throw new CustomError(
                    400,
                    "Informações ausentes",
                    1,
                    `Necessário informar qual campo de edição`)
                    .mountError()
            }

            if (!this.isValidBodyKeys(editCustomerDTO, Object.values(EDIT_CUSTOMER_DTO))) {
                throw new CustomError(
                    406,
                    'Campo inválido',
                    1,
                    'Algum campo requisitado para edição é inválido ou não autorizado'
                ).mountError()
            }

            if (!this.isValidCPF(editCustomerDTO[EDIT_CUSTOMER_DTO.CPF])) {
                throw new CustomError(
                    406,
                    'CPF não enviado corretamente',
                    1,
                    'CPF não enviado corretamente')
                    .mountError()
            }

            const isRegisteredCustomer = await this.customerDatabase
                .isRegisteredCustomerId(editCustomerDTO[EDIT_CUSTOMER_DTO.ID], "getData")

            if (!isRegisteredCustomer) {
                throw new CustomError(
                    401,
                    'Cliente não encontrado',
                    1,
                    `Cliente não encontrado id: ${editCustomerDTO[EDIT_CUSTOMER_DTO.ID]}`)
                    .mountError()

                /* in next lines, I decided that to change some information, the CPF must also match, but this cannot be changed by itself*/

            } else if (
                isRegisteredCustomer[EDIT_CUSTOMER_DTO.CPF] !== editCustomerDTO[EDIT_CUSTOMER_DTO.CPF]
            ) {
                throw new CustomError(
                    406,
                    'CPF inválido',
                    1,
                    `CPF informado não corresponde ao registrado`)
                    .mountError()
            }

            editCustomerDTO[EDIT_CUSTOMER_DTO.MODIFY_AT] = moment(new Date())
                .format("YYYY-MM-DD HH:mm:ss.SSSSSS")

            const editCustomerInfo = await this.customerDatabase
                .editCustomer(editCustomerDTO)

            delete editCustomerDTO[EDIT_CUSTOMER_DTO.MODIFY_AT]

            const newCustomerInfo: resultEditCustomerData = editCustomerDTO
            delete newCustomerInfo[EDIT_CUSTOMER_DTO.CPF]

            const result = requestResult
                .toSuccessfullyEditCustomerRes(editCustomerDTO)

            return result

        } catch (error) {

            //to do: error treatment
            console.log(error)
            throw error
        }

    }


    public async getExcelReportByCustomerId(customerId: number): Promise<requestResult> {

        try {

            const isRegisteredCustomer = this.customerDatabase.isRegisteredCustomerId(customerId)

            if (!isRegisteredCustomer) {
                throw new CustomError(401, 'Cliente não encontrado', 1, null).mountError()
            }

            const fullSalesReport: requestResult = await this.getSalesByCustomerId(customerId)

            if (!fullSalesReport[REQUEST_RESULT_KEYS.DATA]) {
                throw new CustomError(
                    200,
                    'Sem histórico para geração do relatório',
                    1,
                    "O cliente não possui histórico para a geração do relatório")
                    .mountError()
            }

            const remodeledData = (fullSalesReport[REQUEST_RESULT_KEYS.DATA] as salesData[])
                .map((item: salesData) => {
                    return {
                        [RESULT_DATA_KEYS.NAME]: item[RESULT_DATA_KEYS.NAME],
                        [RESULT_DATA_KEYS.INVOICE_CODE]: item[RESULT_DATA_KEYS.INVOICE_CODE],
                        [RESULT_DATA_KEYS.PURCHASE_DATE]: item[RESULT_DATA_KEYS.PURCHASE_DATE],
                        [RESULT_DATA_KEYS.TOTAL_PURCHASE_VALUE]: item[RESULT_DATA_KEYS.TOTAL_PURCHASE_VALUE]
                    }
                })

            const columnNames = [Object.values(EXCEL_REPORT_COLUMNS)]

            const workSheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet([])
            xlsx.utils.sheet_add_aoa(workSheet, columnNames)
            xlsx.utils.sheet_add_json(workSheet, remodeledData, { origin: 'A2', skipHeader: true })

            const workBook: xlsx.WorkBook = xlsx.utils.book_new()
            xlsx.utils.book_append_sheet(workBook, workSheet, `${moment(new Date()).format("YYYY-MM-DD")}`)

            const fileName = `arquivo.xlsx`
            const excelFile = xlsx.write(workBook, { type: 'buffer', bookType: 'xlsx', bookSST: false });
            const newPathFile = path.resolve('src', 'assets', 'tmp', `${fileName}`)

            fs.writeFileSync(newPathFile, excelFile);

            const messageFilePath: resultReportFileGeneration = {
                [RESULT_REPORT_FILE_GEN.URL]: `/arquivos/${fileName}`
            }

            const result: requestResult = requestResult.toSuccessfullyFileGenerate(messageFilePath)

            return result

        } catch (error) {

            //to do: error treatment
            console.log(error)
            throw error
        }
    }
}