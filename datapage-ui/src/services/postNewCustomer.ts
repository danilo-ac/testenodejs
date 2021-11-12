import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "../constants/baseURL";
import { Customer, CUSTOMER_KEY, RESPONSE_KEY, SuccessfullyRegister } from "../models/Customer";



export const postNewCustomer = async (
    body: Customer,
    setIsLoading: Function,
    cleanFields: Function,
    setErrors: Function,
    setSpan: Function
): Promise<any> => {

    const config: AxiosRequestConfig = {
        method: 'post',
        url: BASE_URL + `/cliente`,
        headers: {},
        data: body,
    }

    try {
        setIsLoading(true)

        const result: SuccessfullyRegister = await axios(config)
            .then((res: AxiosResponse) => res.data)

        if (result[RESPONSE_KEY.ERROR] === 0) {
            cleanFields()
            setIsLoading(false)
            window.alert(result[RESPONSE_KEY.MESSAGE])
            setSpan(`último cadastro realizado:\n ${result[RESPONSE_KEY.DATA][CUSTOMER_KEY.NAME]}, id: ${result[RESPONSE_KEY.DATA][CUSTOMER_KEY.ID]}`)
        }

    } catch (error: any) {
        // console.log(error.response.data[RESPONSE_KEY.MESSAGE])
        // setIsLoading(false)
        if (error.response.data[RESPONSE_KEY.MESSAGE] === "CPF não enviado corretamente") {
            const cpfError = { [CUSTOMER_KEY.CPF]: "CPF não enviado corretamente" }
            setErrors({ ...cpfError })
            setIsLoading(false)
        } else {
            setSpan({ error: error.response.data[RESPONSE_KEY.MESSAGE] })
            setIsLoading(false)
        }
    }
}