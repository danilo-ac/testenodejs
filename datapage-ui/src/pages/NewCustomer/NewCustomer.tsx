import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import ErrorField from "../../components/ErrorField/ErrorField";
import Loading from "../../components/Loading/Loading";
import useForm from "../../hooks/useForm";
import { CUSTOMER_KEY } from "../../models/Customer";
import { postNewCustomer } from "../../services/postNewCustomer";
import { Container, FormContainer, InputsContainer, SpanContainer } from "./style";
import InputMask from "react-input-mask"



export default function NewCustomer() {

    const { input, onChangeInput, cleanFields, errors, setErrors, span, setSpan } = useForm({
        [CUSTOMER_KEY.NAME]: '',
        [CUSTOMER_KEY.CPF]: '',
        [CUSTOMER_KEY.PHONE]: ''
    })


    const [isLoading, setIsLoading] = useState(false)
    const [mainError, setMainError] = useState('')

    function isValidBrazilsPhone(phone: any) {
        return phone.split("").filter((item: any) => Number(item)).length >= 10
    }


    function formatPhoneNumber(phone: any) {
        const newFormat = phone.split("")
        newFormat.filter((item: any) => Number(item)).length === 10 && newFormat.pop()
        const hyphenPosition = newFormat[9]
        const numberPosition = newFormat[10]
        newFormat[9] = numberPosition
        newFormat[10] = hyphenPosition

        return newFormat.join("").replace(",", "")
    }

    const inputValidation = (): boolean => {
        let errors: any = {}
        errors[CUSTOMER_KEY.NAME] = !input[CUSTOMER_KEY.NAME] ?
            'Preenchimento obrigatório' : ''
        errors[CUSTOMER_KEY.CPF] = !input[CUSTOMER_KEY.CPF] ?
            'Preenchimento obrigatório' : ""
        errors[CUSTOMER_KEY.PHONE] = input[CUSTOMER_KEY.PHONE] ? isValidBrazilsPhone(input[CUSTOMER_KEY.PHONE]) ?
            '' : 'Telefone deve conter entre\n 10 e 11 digitos com DDD' : 'Preenchimento obrigatório'


        setErrors({
            ...errors
        })

        return Object.values(errors).every(item => item === '')
    }

    async function onClickSubmit(): Promise<any> {

        if (inputValidation()) {
            input[CUSTOMER_KEY.PHONE] = formatPhoneNumber(input[CUSTOMER_KEY.PHONE])
            // console.log(input)
            postNewCustomer(input, setIsLoading, cleanFields, setErrors, setSpan,)
        } else {
            setMainError("Cadastro não enviado para registro\nVerifique o preenchimento correto dos campos")
        }
    }

    return (
        <Container>

            {isLoading && <Loading />}

            <h1>Cadastro Novo Cliente</h1>
            <FormContainer >
                <InputsContainer>
                    <TextField
                        type='text'
                        name={`${[CUSTOMER_KEY.NAME]}`}
                        title='Insira Nome e Sobrenome'
                        value={input[CUSTOMER_KEY.NAME]}
                        placeholder='Nome e sobrenome'
                        onChange={onChangeInput}
                        error={!!errors[CUSTOMER_KEY.NAME]}
                        required={true}
                        margin={"dense"}
                        inputProps={{ 'aria-label': 'text' }}
                        helperText="Nome e sobrenome"
                    />
                    {!!errors[CUSTOMER_KEY.NAME] && <ErrorField errorMsg={errors[CUSTOMER_KEY.NAME]} />}


                    <InputMask
                        mask="(99) 99999-9999"
                        onChange={onChangeInput}
                        value={input[CUSTOMER_KEY.PHONE]}
                    >
                        {() =>
                        (<TextField
                            type='tel'
                            name={`${[CUSTOMER_KEY.PHONE]}`}
                            title='Insira o número de telefone'
                            placeholder='(00) 00000-0000'
                            error={!!errors[CUSTOMER_KEY.PHONE]}
                            required={true}
                            margin={"dense"}
                            inputProps={{ 'aria-label': 'tel' }}
                            helperText="Telefone"
                        />
                        )}
                    </InputMask>


                    {!!errors[CUSTOMER_KEY.PHONE] && <ErrorField errorMsg={errors[CUSTOMER_KEY.PHONE]} />}

                    <TextField
                        type='text'
                        name={`${[CUSTOMER_KEY.CPF]}`}
                        title='Insira o CPF'
                        value={input[CUSTOMER_KEY.CPF]}
                        placeholder='000.000.000-00'
                        onChange={onChangeInput}
                        error={!!errors[CUSTOMER_KEY.CPF]}
                        required={true}
                        margin={"dense"}
                        variant="outlined"
                        helperText="CPF"
                        inputProps={{ 'aria-label': 'cpf' }}

                    />

                    {!!errors[CUSTOMER_KEY.CPF] && <ErrorField errorMsg={errors[CUSTOMER_KEY.CPF]} />}

                    <Button
                        className="send-button"
                        onClick={() => onClickSubmit()}
                        size="large"
                        variant="contained"
                    >Cadastrar
                    </Button>

                </InputsContainer>
                <SpanContainer>
                    {!!span && <p>{span}</p>}
                </SpanContainer>
            </FormContainer>
        </Container >
    )
}