import styled, { keyframes, css } from 'styled-components'; 

type SubmitButtonType = {
    loading: number;
}

export const Container = styled.div`
    max-width: 750px;
    margin: 100px auto;
    background-color: #FFF;
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 0 20px rgba(0,0,0, .2);

    h1 {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        svg {
            margin-right: 10px;
        }
    }
`;

export const Form = styled.div`
    display: flex;

    input {
        flex: 1;
        border: 1px solid #CCC;
        border-radius: 10px;
        height: 35px;
        padding: 0 10px;
    }
`;

// create animation of button
const animate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`;

export const SubmitButton = styled.button<{ disabled: boolean }>`
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    border-radius: 5px;
    margin-left: 5px;
    background-color: #007bff;

    &:hover {
        background-color: #0062cc;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: .5;
    }

    ${props => props.disabled && 
        css`
            svg {
                animation: ${animate} 2s linear infinite;
            }
        `
    }
`;

export const List = styled.ul`
    list-style: none;
    margin-top: 15px;
`;

export const Item = styled.li`
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    & + li {
        border-top: 1px solid #CCC;
    }

    svg {
        cursor: pointer;
    }

    span {
        svg {
            margin-right: 15px;
        }
    }
`;