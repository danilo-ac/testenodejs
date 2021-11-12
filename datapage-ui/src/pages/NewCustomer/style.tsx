import styled from 'styled-components'
import { COLORS } from '../../constants/colors'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 100vh !important;
    background: linear-gradient(${COLORS.GRAY_1}, ${COLORS.GRAY_2});
    h1{
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;        font-variant: small-caps;
        margin: 0 0 1% 0;
        font-weight: 200;
        text-shadow: 1px -2px 2px gray;
    }
    .send-button{
        margin-top: 4%;
    }
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80vw;
    max-width: 50vmax;
    min-width: fit-content;
    min-height: fit-content;
    background-color: #ffffff7c;
    border-radius: 10px;
    box-shadow: 1px 2px 5px ${COLORS.GRAY_1};
    overflow: hidden;
`

export const InputsContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: fit-content;
    min-height: fit-content;
    margin: 2% 0;
`

export const SpanContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 0.6%;
    background-color: ${COLORS.GRAY_2};
    p{
        font-size: small;
        margin: 0 0 0 2%;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;    }    
`