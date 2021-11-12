import { useState } from "react"

const useForm = (initialState: any) => {

    const [input, setInput] = useState<any>(initialState)
    const [errors, setErrors] = useState<any>({})
    const [span, setSpan] = useState<any>("")

    const onChangeInput = (event: any) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    }

    const cleanFields = () => {
        setInput(initialState);
    }

    return { input, onChangeInput, cleanFields, errors, setErrors, span, setSpan };
}

export default useForm;