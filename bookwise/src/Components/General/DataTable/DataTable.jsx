import '../../../css/General/DataTable/DataTable.css'
function DataTable({ columns, data, onRowClick, columnWidths }) {

    return (
        <div
            className="data-table"
            style={{
                "--table-columns": columnWidths || `repeat(${columns.length}, minmax(0, 1fr))`
            }}
        >
            <div className="data-table-header">
                {columns.map((column) => (
                    <div key={column.key}>
                        {column.label}
                    </div>
                ))}
            </div>

            {data.map((item) => (
                <div
                    className="data-table-row"
                    key={item.id}
                    onClick={() => onRowClick && onRowClick(item)}
                >
                    {columns.map((column) => (
                        <div key={column.key}>
                            {column.render
                                ? column.render(item)
                                : item[column.key]
                            }
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default DataTable;