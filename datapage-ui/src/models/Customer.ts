export enum CUSTOMER_KEY {
    NAME = "nome",
    PHONE = 'telefone',
    CPF = 'cpf',
    ID = 'id'
}

export interface Customer {
    [CUSTOMER_KEY.NAME]: string,
    [CUSTOMER_KEY.PHONE]: string,
    [CUSTOMER_KEY.CPF]: string,
    [CUSTOMER_KEY.ID]?: number
}


export enum RESPONSE_KEY {
    MESSAGE = 'mensagem',
    ERROR = 'erro',
    DATA = 'dados'
}

export interface RegisteredCustomer{
    [CUSTOMER_KEY.ID]: number,
    [CUSTOMER_KEY.NAME]: string
}

export interface SuccessfullyRegister {
    [RESPONSE_KEY.MESSAGE]: string
    [RESPONSE_KEY.ERROR]: number
    [RESPONSE_KEY.DATA]: RegisteredCustomer
}