import React from "react";
import styled from "styled-components";
import TableCell from "./TableCell";

const EmptyCell = styled(TableCell)`
    padding: ${({ theme }) => theme.spacing.lg};
    color: ${({ theme }) => theme.colors.mutedText};
`;

const TableEmptyRow = ({ colSpan, message }) => (
    <tr>
        <EmptyCell colSpan={colSpan} $align="center">
            {message}
        </EmptyCell>
    </tr>
);

export default TableEmptyRow;
