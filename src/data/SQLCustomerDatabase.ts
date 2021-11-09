import CustomerRepository from '../business/CustomerRepository';
import CustomError from '../error/CustomError';
import { editCustomerDTO, EDIT_CUSTOMER_DTO, newCustomerDTO, RESULT_DATA_ITEM_KEYS, RESULT_DATA_KEYS, salesData, salesItens } from '../model/CustomerModel';
import { SQL_TABLES, SQL_TABLE_CUSTOMER, SQL_TABLE_SALES, SQL_TABLE_SOLD_ITEMS } from '../model/SQLDatabaseModel';
import { SQLBaseDatabase } from './SQLBaseDatabase';

export default class SQLCustomerDatabase extends SQLBaseDatabase implements CustomerRepository {

    public async isRegisteredCustomerId(
        customerId: number,
        getData: "getData"|"dontGet" = "dontGet"
    ): Promise<any> {

        if(getData === "getData"){
            try {
                const customerInfo = await this.getConnection()
                    .from(SQL_TABLES.CUSTOMER)
                    .where(`${SQL_TABLE_CUSTOMER.ID}`, customerId)
                    .first()
    
                if (!customerInfo) {
                    return false
                } else {
                    return customerInfo
                }
    
            } catch (error) {
                console.log(error)
                throw new CustomError(500, "Internal Error", 1, "Something went wrong").mountError()
            }
        }

        try {
            const checkCustomer = await this.getConnection()
                .from(SQL_TABLES.CUSTOMER)
                .where(`${SQL_TABLE_CUSTOMER.ID}`, customerId)
                .first()

            if (!checkCustomer) {
                return false
            } else {
                return true
            }

        } catch (error) {
            console.log(error)
            throw new CustomError(500, "Internal Error", 1, "Something went wrong").mountError()
        }
    }


    public async getSalesByCustomerId(
        customerId: number
    ): Promise<any> {

        try {

            const checkCustomer = await this.getConnection()
                .from(SQL_TABLES.CUSTOMER)
                .where(`${SQL_TABLE_CUSTOMER.ID}`, customerId)
                .first()

            if (!checkCustomer) {
                return null
            }

            const query = await this.getConnection()
                .from(SQL_TABLES.CUSTOMER)
                .where(`${SQL_TABLE_CUSTOMER.ID}`, customerId)
                .select({
                    [RESULT_DATA_KEYS.NAME]: SQL_TABLE_CUSTOMER.NAME,
                    [RESULT_DATA_KEYS.PHONE]: SQL_TABLE_CUSTOMER.PHONE,
                    [RESULT_DATA_KEYS.PURCHASE_DATE]: SQL_TABLE_SALES.PURCHASE_DATE,
                    [RESULT_DATA_KEYS.INVOICE_CODE]: SQL_TABLE_SALES.INVOICE_CODE,
                    [RESULT_DATA_ITEM_KEYS.NAME]: SQL_TABLE_SOLD_ITEMS.NAME,
                    [RESULT_DATA_ITEM_KEYS.VALUE]: SQL_TABLE_SOLD_ITEMS.UNITY_VALUE,
                    [RESULT_DATA_ITEM_KEYS.QUANTITY]: SQL_TABLE_SOLD_ITEMS.QUANTITY
                })
                .join(
                    SQL_TABLES.SALES,
                    `${SQL_TABLE_SALES.CUSTOMER_ID}`,
                    `${SQL_TABLE_CUSTOMER.ID}`
                )
                .join(
                    SQL_TABLES.SOLD_ITEMS,
                    `${SQL_TABLE_SOLD_ITEMS.SALE_ID}`,
                    `${SQL_TABLE_SALES.ID}`
                )

            return query

        } catch (error) {
            console.log(error)
            throw new CustomError(500, "Internal Error", 1, "Something went wrong").mountError()
        }

    }


    public async postNewCustomer(
        newCustomerDTO: newCustomerDTO
    ): Promise<any> {

        try {

            const query = await this.getConnection()
                .from(SQL_TABLES.CUSTOMER)
                .insert(newCustomerDTO)

            return query

        } catch (error) {
            console.log(error)
            throw new CustomError(500, "Internal Error", 1, "Something went wrong").mountError()
        }

    }


    public async editCustomer(
        editCustomerDTO: editCustomerDTO
    ): Promise<any> {

        try {
            const query = await this.getConnection()
                .table(SQL_TABLES.CUSTOMER)
                .where(`${SQL_TABLE_CUSTOMER.ID}`, editCustomerDTO[EDIT_CUSTOMER_DTO.ID])
                .update({
                    [SQL_TABLE_CUSTOMER.NAME]: editCustomerDTO[EDIT_CUSTOMER_DTO.NAME],
                    [SQL_TABLE_CUSTOMER.CPF]: editCustomerDTO[EDIT_CUSTOMER_DTO.CPF],
                    [SQL_TABLE_CUSTOMER.PHONE]: editCustomerDTO[EDIT_CUSTOMER_DTO.PHONE],
                    [SQL_TABLE_CUSTOMER.MODIFY_AT]: editCustomerDTO[EDIT_CUSTOMER_DTO.MODIFY_AT]
                })

            return query

        } catch (error) {
            console.log(error)
            throw new CustomError(500, "Internal Error", 1, "Something went wrong").mountError()
        }
    }

}