import SQLCustomerDatabase from "../data/SQLCustomerDatabase"

describe("Tests for SQL queries", () => {

    test("isRegisteredCustomerId | Return False for invalid ID", async () => {

        const invalidId = 0.0
        const testCustomerDB = new SQLCustomerDatabase()
        const result = await testCustomerDB.isRegisteredCustomerId(invalidId)

        expect(result).toBe(false)

    })


    test("isRegisteredCustomerId | Return False for unregistered ID", async () => {

        const testCustomerDB = new SQLCustomerDatabase()
        const result = await testCustomerDB.isRegisteredCustomerId(991)

        expect(result).toBe(false)

    })


    test("isRegisteredCustomerId | Return True for registered ID", async () => {

        const testCustomerDB = new SQLCustomerDatabase()
        const result = await testCustomerDB.isRegisteredCustomerId(1)

        expect(result).toBe(true)

    })

    test("isRegisteredCustomerId | Return Data for registered ID when requested", async () => {

        const testCustomerDB = new SQLCustomerDatabase()
        const result = await testCustomerDB.isRegisteredCustomerId(1,'getData')

        expect(result.id).toBe(1)
        expect(typeof result).toEqual("object")

    })

    test("getAllCustomersSales | Return report of all customers sales", async () => {

        const realTestCustomerDB = new SQLCustomerDatabase()
        const result = await realTestCustomerDB.getAllCustomersSales()

        expect(result).toBeDefined()
    })


    test("getOperationCompareByCustomerId | Successfully Query for registered customerId", async () => {

        const realTestCustomerDB = new SQLCustomerDatabase()
        const result = await realTestCustomerDB.getOperationCompareByCustomerId(1)
        
        expect(result).toBeDefined()
        expect(result).not.toBeFalsy()
        expect(typeof result).toEqual("object")

    })

})