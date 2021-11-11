import SQLCustomerDatabase from "../data/SQLCustomerDatabase"

describe("Tests for SQL queries", () => {

    test("Return False for invalid ID", async () => {

        const invalidId = 0.0
        const testCustomerDB = new SQLCustomerDatabase()
        const result = await testCustomerDB.isRegisteredCustomerId(invalidId)

        expect(result).toBe(false)

    })


    test("Return False for unregistered ID", async () => {

        const testCustomerDB = new SQLCustomerDatabase()
        const result = await testCustomerDB.isRegisteredCustomerId(991)

        expect(result).toBe(false)

    })


    test("Return True for registered ID", async () => {

        const testCustomerDB = new SQLCustomerDatabase()
        const result = await testCustomerDB.isRegisteredCustomerId(1)

        expect(result.id).toBe(true)

    })

    test("Return report of all customer sales", async () => {

        const realTestCustomerDB = new SQLCustomerDatabase()
        const result = await realTestCustomerDB.getAllCustomersSales()

        expect(result).toBeDefined()
    })

})