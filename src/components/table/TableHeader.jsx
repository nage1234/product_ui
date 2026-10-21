import React from "react";
import TableHeaderCell from "./TableHeaderCell";

const TableHeader = ({ columns }) => (
    <thead>
        <tr>
            {columns.map((column) => (
                <TableHeaderCell key={column.id}>{column.label}</TableHeaderCell>
            ))}
        </tr>
    </thead>
);

export default TableHeader;
