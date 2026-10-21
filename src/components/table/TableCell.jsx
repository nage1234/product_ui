import styled from "styled-components";

const TableCell = styled.td`
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    text-align: ${({ $align }) => $align ?? "left"};
`;

export default TableCell;
