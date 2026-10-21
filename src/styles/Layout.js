import styled from "styled-components";
import { Link } from "react-router-dom";

// centred column, 70% of the viewport wide, shared by the listing and details pages
export const Page = styled.main`
    width: 70vw;
    margin: ${({ theme }) => theme.spacing.xl} auto;
`;

// sits above the table and keeps a clear gap between the language select and the content below
export const Toolbar = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const StyledLink = styled(Link)`
    color: ${({ theme }) => theme.colors.link};
    text-decoration: none;
    font-weight: 500;

    &:hover,
    &:focus-visible {
        text-decoration: underline;
    }
`;
