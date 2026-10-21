import styled from "styled-components";

const TableHeaderCell = styled.th`
    padding: ${({ theme }) => theme.spacing.md};
    text-align: left;
    font-weight: 600;
    background: ${({ theme }) => theme.colors.headerBg};
    color: ${({ theme }) => theme.colors.headerText};
`;

export default TableHeaderCell;
