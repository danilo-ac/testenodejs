export enum REQUEST_RESULT_KEYS {
    MESSAGE = 'mensagem',
    ERROR = 'erro',
    DATA = 'dados'
}

export class requestResult {

    public [REQUEST_RESULT_KEYS.MESSAGE]: string
    public [REQUEST_RESULT_KEYS.ERROR]: number
    public [REQUEST_RESULT_KEYS.DATA]: Array<salesData | null> | resultNewCustomerData | resultEditCustomerData | resultReportFileGeneration

    private static toSuccessfullyOutputModel(message: string, data: any) {
        return {
            [REQUEST_RESULT_KEYS.MESSAGE]: message,
            [REQUEST_RESULT_KEYS.ERROR]: 0,
            [REQUEST_RESULT_KEYS.DATA]: data
        }
    }

    static toSuccessfullyOutput(data: (salesData | null)[]) {
        return this.toSuccessfullyOutputModel('Vendas carregadas do cliente', data)
    }

    static toSuccessfullyNewCustomerRes(data: resultNewCustomerData) {
        return this.toSuccessfullyOutputModel('Cliente inserido com sucesso', data)
    }

    static toSuccessfullyEditCustomerRes(data: resultEditCustomerData) {
        return this.toSuccessfullyOutputModel('Cliente atualizado com sucesso', data)
    }

    static toSuccessfullyFileGenerate(data: resultReportFileGeneration) {
        return this.toSuccessfullyOutputModel('Ok excel gerado ', data)
    }
}

//salesByCustomer
export enum RESULT_DATA_KEYS {
    JSON = 'AtributoJSON',
    NAME = 'cliente_nome',
    PHONE = 'cliente_telefone',
    PURCHASE_DATE = 'data_compra',
    INVOICE_CODE = 'codigo_nota_fiscal',
    TOTAL_PURCHASE_VALUE = 'valor_total',
    PURCHASED_ITEMS = 'itens',
}

export interface salesData {
    [RESULT_DATA_KEYS.JSON]: string,
    [RESULT_DATA_KEYS.NAME]: string,
    [RESULT_DATA_KEYS.PHONE]: string,
    [RESULT_DATA_KEYS.PURCHASE_DATE]: number,
    [RESULT_DATA_KEYS.INVOICE_CODE]: number,
    [RESULT_DATA_KEYS.TOTAL_PURCHASE_VALUE]: number,
    [RESULT_DATA_KEYS.PURCHASED_ITEMS]: Array<salesItens>
}

export enum RESULT_DATA_ITEM_KEYS {
    NAME = 'nome',
    VALUE = 'valor',
    QUANTITY = 'quantidade'
}

export interface salesItens {
    [RESULT_DATA_ITEM_KEYS.NAME]: string,
    [RESULT_DATA_ITEM_KEYS.VALUE]: number,
    [RESULT_DATA_ITEM_KEYS.QUANTITY]: number
}

//newCustomer
export enum NEW_CUSTOMER_DTO {
    NAME = 'nome',
    PHONE = 'telefone',
    CPF = 'cpf',
    CREATE_AT = 'data_cadastro',
}

export interface newCustomerDTO {
    [NEW_CUSTOMER_DTO.NAME]: string,
    [NEW_CUSTOMER_DTO.PHONE]: string,
    [NEW_CUSTOMER_DTO.CPF]: string,
    [NEW_CUSTOMER_DTO.CREATE_AT]?: string
}

export enum RESULT_NEW_CUSTOMER {
    NAME = 'nome',
    ID = 'id'
}

export interface resultNewCustomerData {
    [RESULT_NEW_CUSTOMER.NAME]: string,
    [RESULT_NEW_CUSTOMER.ID]: number
}


//editCustomer
export enum EDIT_CUSTOMER_DTO {
    ID = 'id',
    NAME = 'nome',
    PHONE = 'telefone',
    CPF = 'cpf',
    MODIFY_AT = 'data_alteração',
}

export interface editCustomerDTO {
    [EDIT_CUSTOMER_DTO.ID]: number,
    [EDIT_CUSTOMER_DTO.NAME]?: string,
    [EDIT_CUSTOMER_DTO.PHONE]?: string,
    [EDIT_CUSTOMER_DTO.CPF]: string,
    [EDIT_CUSTOMER_DTO.MODIFY_AT]?: string
}

export enum RESULT_EDIT_CUSTOMER {
    NAME = 'nome',
    ID = 'id',
    CPF = 'cpf',
    PHONE = 'telefone',
}

export interface resultEditCustomerData {
    [RESULT_EDIT_CUSTOMER.ID]: number
    [RESULT_EDIT_CUSTOMER.NAME]?: string,
    [RESULT_EDIT_CUSTOMER.CPF]?: string,
    [RESULT_EDIT_CUSTOMER.PHONE]?: string
}

export enum CUSTOMER_URI_PARAMS {
    ID = 'cliente'
}

//Report File Generation
export enum CUSTOMER_URI_QUERIES {
    GENERATE_REPORT = 'formato'
}

export enum CUSTOMER_FILES_TYPE {
    EXCEL = 'excel',
    PDF = 'pdf'
}

export enum EXCEL_REPORT_COLUMNS {
    NAME = 'Cliente Nome',
    INVOICE_CODE = 'Codigo Nota fiscal',
    PURCHASE_DATE = 'Data Venda',
    TOTAL_PURCHASE_VALUE = 'Valor Total'
}

export enum RESULT_REPORT_FILE_GEN {
    URL = 'url'
}

export interface resultReportFileGeneration {
    [RESULT_REPORT_FILE_GEN.URL]: string
}