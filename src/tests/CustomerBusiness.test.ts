import CustomerBusiness from "../business/CustomerBusiness"
import SQLCustomerDatabase from "../data/SQLCustomerDatabase"
import { REQUEST_RESULT_KEYS } from "../model/CustomerModel"

describe("Tests for Excel File Gen", () => {

    test("Success to generate excel File", async () => {

        const validID = 1
        const realCustomerDatabase = new SQLCustomerDatabase()
        const testCustomerBusiness = new CustomerBusiness(realCustomerDatabase)

        const result = await testCustomerBusiness.getExcelReportByCustomerId(validID)

        expect(result).toEqual({ "dados": { "url": "/arquivos/arquivo.xlsx" }, "erro": 0, "mensagem": "Ok excel gerado " })

    })

    test("Error for unregistered customer Id", async () => {

        expect.assertions(1)

        const validID = 0.0
        const realCustomerDatabase = new SQLCustomerDatabase()
        const testCustomerBusiness = new CustomerBusiness(realCustomerDatabase)

        try {
            const result = await testCustomerBusiness.getExcelReportByCustomerId(validID)
        } catch (error: any) {
            expect(error.message[REQUEST_RESULT_KEYS.MESSAGE]).toEqual('Cliente não encontrado')
        }

    })

})