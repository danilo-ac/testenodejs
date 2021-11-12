import moment from 'moment';
import CustomError from '../error/CustomError';
import { editCustomerDTO, EDIT_CUSTOMER_DTO, FILE_REPORT_COLUMNS, newCustomerDTO, NEW_CUSTOMER_DTO, requestResult, REQUEST_RESULT_KEYS, resultEditCustomerData, resultNewCustomerData, resultReportFileGeneration, resultSalesValidation, RESULT_DATA_ITEM_KEYS, RESULT_DATA_KEYS, RESULT_NEW_CUSTOMER, RESULT_REPORT_FILE_GEN, RESULT_SALES_VALIDATION, salesData, salesItens } from '../model/CustomerModel';
import CustomerRepository from './CustomerRepository';
import xlsx from 'xlsx'
import fs from 'fs'
import path from 'path'
import { TableCell, TDocumentDefinitions, TFontDictionary } from 'pdfmake/interfaces';
import PdfPrinter from 'pdfmake';

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

            const invoices: salesData[] | null = !salesByCustomer ?
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

            const result: requestResult = requestResult.toSuccessfullyOutputModel('Vendas carregadas do cliente', invoices)

            return result

        } catch (error) {

            //to do: error treatment

            throw error
        }

    }


    private isValidCPF(
        input: string
    ): boolean {

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

            const result: requestResult = requestResult
                .toSuccessfullyOutputModel('Cliente inserido com sucesso', newCustomerInfo)

            return result

        } catch (error) {

            //to do: error treatment

            throw error
        }
    }


    protected isValidBodyKeys(
        body: any,
        keysModel: any[]
    ): boolean {
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
                .toSuccessfullyOutputModel('Cliente atualizado com sucesso', editCustomerDTO)

            return result

        } catch (error) {

            //to do: error treatment
            console.log(error)
            throw error
        }

    }


    public async getExcelReportByCustomerId(
        customerId: number
    ): Promise<requestResult> {

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

            const columnsNames = [Object.values(FILE_REPORT_COLUMNS)]

            const workSheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet([])
            xlsx.utils.sheet_add_aoa(workSheet, columnsNames)
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

            const result: requestResult = requestResult
                .toSuccessfullyOutputModel('Ok excel gerado', messageFilePath)

            return result

        } catch (error) {

            //to do: error treatment
            console.log(error)
            throw error
        }
    }


    private async generatePDFTableFile(
        docTitle: string,
        columnsNames: Array<string>,
        rowsValues: Array<Array<any>>
    ) {

        const fileName = "arquivo.pdf"

        const fonts: TFontDictionary = {
            Helvetica: {
                normal: 'Helvetica',
                bold: 'Helvetica-Bold',
                italics: 'Helvetica-Oblique',
                bolditalics: 'Helvetica-BoldOblique'
            }
        }

        const printer = new PdfPrinter(fonts)

        const tableBody: TableCell[][] = []

        const columnsTitle: TableCell[] = []
        for (let item of columnsNames) {
            columnsTitle.push({ text: item, style: 'columnsTitle' })
        }
        tableBody.push(columnsTitle)

        for (let item of rowsValues) {
            tableBody.push(item)
        }


        const docDefinitions: TDocumentDefinitions = {
            defaultStyle: { font: "Helvetica" },
            content: [
                {
                    text: docTitle,
                    fontSize: 14,
                    bold: true,
                    margin: [0, 20, 0, 8]
                }, {
                    table: {
                        headerRows: 1,
                        body: tableBody
                    }
                }],
            styles: {
                columnsTitle: {
                    fontSize: 12,
                    bold: true,
                    fillColor: '#292929',
                    color: '#FFFFFF',
                    margin: 2
                }
            }

        }

        const pdfDoc = printer.createPdfKitDocument(docDefinitions)

        const newPathFile = path.resolve('src', 'assets', 'tmp', `${fileName}`)

        pdfDoc.pipe(fs.createWriteStream(newPathFile))
        pdfDoc.end()

        return newPathFile
    }


    public async getAllCustomersSales(): Promise<requestResult> {

        try {

            const databaseResult = await this.customerDatabase.getAllCustomersSales()

            if (!databaseResult) {
                throw new CustomError(
                    200,
                    'Relatório não gerado',
                    1,
                    'A consulta retornou vazia'
                )
            }


            const rowsValues: string[][] = []

            const columnsNames: string[] = Object.values(FILE_REPORT_COLUMNS)


            for (let item of databaseResult) {
                rowsValues.push(Object.values(item))
            }


            const docTitle = `Teste Node - ${moment(new Date).locale('pt-br').format('DD/MMM/YYYY',)}`


            await this.generatePDFTableFile(docTitle, columnsNames, rowsValues)

            const messageFilePath: resultReportFileGeneration = {
                [RESULT_REPORT_FILE_GEN.URL]: `/arquivos/arquivo.pdf`
            }

            const result: requestResult = requestResult
                .toSuccessfullyOutputModel('Ok pdf gerado ', messageFilePath)

            return result

        } catch (error) {
            //to do: error treatment
            console.log(error)
            throw error
        }
    }


    public async getSalesValidationByCustomerId(
        customerId: number
    ): Promise<requestResult> { // to do: set signuture to requestResult

        //to do: id validation

        try {

            const isRegisteredCustomer = await this.customerDatabase
                .isRegisteredCustomerId(customerId)

            if (!isRegisteredCustomer) {
                throw new CustomError(
                    401,
                    'Cliente não encontrado',
                    1,
                    `Cliente id não encontrado id: ${customerId}`)
                    .mountError()
            }

            const customersOperations: resultSalesValidation[] = await this.customerDatabase
                .getOperationCompareByCustomerId(customerId)

            if (customersOperations.length === 0) {
                throw new CustomError(
                    200,
                    'Validação de compras',
                    0,
                    [])
                    .mountError()
            }

            const salesValidation: resultSalesValidation[] = []

            for (let item of customersOperations) {
                const isSameValue = item[RESULT_SALES_VALIDATION.PAID_VALUE] === item[RESULT_SALES_VALIDATION.TOTAL_PURCHASE_VALUE]
                item[RESULT_SALES_VALIDATION.ERROR] = isSameValue ? 0 : 1
                item[RESULT_SALES_VALIDATION.RESULT] = isSameValue ? 'Validado valores iguais' : 'Valores divergentes'
                salesValidation.push(item)
            }

            const result: requestResult = requestResult
                .toSuccessfullyOutputModel("Validação de compras ", salesValidation)

            return result

        } catch (error: any) {

            //to do: error treatment
            console.log(error)
            throw error

        }
    }
}