import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: ${({ theme }) => theme.font};
        color: ${({ theme }) => theme.colors.text};
        background: ${({ theme }) => theme.colors.pageBg};
    }
`;

export default GlobalStyle;
