import styled from 'styled-components'; 
import { Link } from 'react-router-dom';

export const Container = styled.div`
    height: 100vh;
    max-width: 750px;
    margin: 0 auto;
    padding: 20px 0;
`;

export const Owner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
    border-radius: 10px;
    background-color: #FFF;
    box-shadow: 0 0 20px rgba(0,0,0, .2);

    img {
        width: 200px;
    }

    h1 {
        margin: 10px;
        font-size: 35px;
    }

    p {
        font-size: 14px;
        max-width: 500px;
        line-height: 20px;
        text-align: center;
    }
`;

export const BackButton = styled(Link)`
    align-self: flex-start;
    border: 0;
    background-color: transparent;
`;

export const IssuesList = styled.ul`
    background-color: #FFF;
    margin-top: 10px;
    border-radius: 10px;
    padding: 10px;

    select {
        border: 0;
        border-radius: 10px;
        padding: 5px;
        font-size: 15px;
        cursor: pointer;
        background-color: #222;
        color: #FFF;
    }
    
    li {
        display: flex;
        align-items: center;
        padding: 20px 0;

        img {
            width: 40px;
            border-radius: 50%;
            margin-right: 15px;
        }

        & + li {
            border-top: 1px solid #CCC;
        }
    }
`;

export const Issue = styled.div`
    strong {
        a {
            text-decoration: none;
            margin-right: 5px;
            line-height: 20px;
        }
    }

    span {
        font-size: 12px;
        padding: 2px 5px;
        margin: 0 5px;
        border-radius: 5px;
        color: #FFF;
        background-color: #000;
    }

    p {
        margin-top: 5px;
        font-size: 16px;
    }
`;

export const SwitchButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    padding-bottom: 5px;

    button {
        border: 0;
        padding: 5px 10px;
        border-radius: 5px;
        background-color: #007bff;
        color: #FFF;

        &:hover {
            background-color: #0062cc;
        }

        &:disabled {
            cursor: not-allowed;
            opacity: .2;
        }
    }
`;