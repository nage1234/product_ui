import React from "react";
import TableRow from "./TableRow";
import TableEmptyRow from "./TableEmptyRow";

const TableBody = ({ columns, rows, rowKey, emptyMessage }) => (
    <tbody>
        {rows.length === 0 ? (
            <TableEmptyRow colSpan={columns.length} message={emptyMessage} />
        ) : (
            rows.map((row, index) => (
                <TableRow key={row[rowKey] ?? index} columns={columns} row={row} />
            ))
        )}
    </tbody>
);

export default TableBody;
