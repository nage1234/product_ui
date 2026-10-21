import React from "react";
import styled from "styled-components";
import TableHeader from "./table/TableHeader";
import TableBody from "./table/TableBody";

// the wrapper rounds the corners and scrolls sideways if the columns don't fit
const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radius};
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

// Pure, stateless table: columns = [{ id, label, render? }], products = array of row objects
const Table = ({ columns = [], products = [], rowKey = "productId", emptyMessage = "No products found" }) => (
    <TableWrapper>
        <StyledTable>
            <TableHeader columns={columns} />
            <TableBody columns={columns} rows={products} rowKey={rowKey} emptyMessage={emptyMessage} />
        </StyledTable>
    </TableWrapper>
);

export default Table;
