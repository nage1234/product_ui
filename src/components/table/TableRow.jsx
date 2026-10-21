import React from "react";
import styled from "styled-components";
import TableCell from "./TableCell";

// alternate row colours, with a hover highlight
const StyledRow = styled.tr`
    background: ${({ theme }) => theme.colors.rowBg};

    &:nth-child(even) {
        background: ${({ theme }) => theme.colors.rowAltBg};
    }

    &:hover {
        background: ${({ theme }) => theme.colors.rowHoverBg};
    }
`;

const TableRow = ({ columns, row }) => (
    <StyledRow>
        {columns.map((column) => (
            <TableCell key={column.id}>
                {/* a column can supply its own render(), otherwise show the raw value */}
                {column.render ? column.render(row) : row[column.id]}
            </TableCell>
        ))}
    </StyledRow>
);

export default TableRow;
