import { editCustomerDTO, newCustomerDTO, resultEditCustomerData, resultNewCustomerData, resultSalesValidation, salesData, salesItens } from "../model/CustomerModel";

export default interface CustomerRepository {
    getSalesByCustomerId(customerId: number): Promise<Array<salesData & salesItens>> | null
    postNewCustomer(newCustomerDTO: newCustomerDTO): Promise<resultNewCustomerData>
    editCustomer(editCustomerrDTO: editCustomerDTO): Promise<resultEditCustomerData>
    isRegisteredCustomerId(customerId: number, getData?: "getData" | "dontGet"): Promise<any>
    getAllCustomersSales(): Promise<any>
    getOperationCompareByCustomerId(customerId: number): Promise<resultSalesValidation[]>
}