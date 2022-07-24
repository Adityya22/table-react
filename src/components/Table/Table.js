import { Table } from "antd";
import '../Table/Table.css';

const TableComponent = ({ columnName, tableDataSource }) => {

    return (
        <div className="table">
            <Table
                columns={columnName}
                dataSource={tableDataSource}
            />
        </div>
    );
}

export default TableComponent;