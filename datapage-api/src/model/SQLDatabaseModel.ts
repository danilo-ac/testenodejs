export enum SQL_TABLES {
    CUSTOMER = 'clientes',
    SALES = 'vendas',
    SOLD_ITEMS = 'vendas_itens'
}

export enum SQL_TABLE_CUSTOMER {
    ID = SQL_TABLES.CUSTOMER + '.id',
    NAME = SQL_TABLES.CUSTOMER + '.nome',
    PHONE = SQL_TABLES.CUSTOMER + '.telefone',
    CPF = SQL_TABLES.CUSTOMER + '.cpf',
    REGISTERED_AT = SQL_TABLES.CUSTOMER + '.data_cadastro',
    MODIFY_AT = SQL_TABLES.CUSTOMER + '.data_alteracao'
}

export enum SQL_TABLE_SALES {
    ID = SQL_TABLES.SALES + '.id',
    CUSTOMER_ID = SQL_TABLES.SALES + '.cliente_id',
    INVOICE_CODE = SQL_TABLES.SALES + '.codigo_nota_fiscal',
    PURCHASE_DATE = SQL_TABLES.SALES + '.data_cadastro',
    UPDATED_AT = SQL_TABLES.SALES + '.data_atualizado',
    VALUE_PAID = SQL_TABLES.SALES + '.valor_pago',
}

export enum SQL_TABLE_SOLD_ITEMS {
    ID = SQL_TABLES.SOLD_ITEMS + '.id',
    SALE_ID = SQL_TABLES.SOLD_ITEMS + '.venda_id',
    NAME = SQL_TABLES.SOLD_ITEMS + '.nome',
    UNITY_VALUE = SQL_TABLES.SOLD_ITEMS + '.valor',
    QUANTITY = SQL_TABLES.SOLD_ITEMS + '.quantidade'
}