import { requestResult, REQUEST_RESULT_KEYS } from '../model/CustomerModel'

export default class CustomError extends Error {
    constructor(
        public httpStatusCode: number,
        public message: string,
        public quantityError: number,
        public data: any
    ) {
        super(message)
    }


    public mountError() {
        const errorBody: requestResult = {
            [REQUEST_RESULT_KEYS.MESSAGE]: this.message,
            [REQUEST_RESULT_KEYS.ERROR]: this.quantityError,
            [REQUEST_RESULT_KEYS.DATA]: this.data
        }
        return {
            code: this.httpStatusCode,
            message: errorBody
        }
    }
}