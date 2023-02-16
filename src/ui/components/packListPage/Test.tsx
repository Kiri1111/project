import React from 'react';
import {Pagination, Space, Table, Tag} from 'antd';
import {CardPacksType} from "../../../dal/api/CardsApi";
import {SortComponent} from "./SortComponent";

const { Column, ColumnGroup } = Table;

type DataType ={
    // key: React.Key;
    // firstName: string;
    // age: number;
    // address: string;
    // tags: string[];
    list:CardPacksType[]
}

// const data: DataType[] = [
//     {
//         key: '1',
//         firstName: 'John',
//         lastName: 'Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//         tags: ['nice', 'developer'],
//     }]
//     {
//         key: '2',
//         firstName: 'Jim',
//         lastName: 'Green',
//         age: 42,
//         address: 'London No. 1 Lake Park',
//         tags: ['loser'],
//     },
//     {
//         key: '3',
//         firstName: 'Joe',
//         lastName: 'Black',
//         age: 32,
//         address: 'Sydney No. 1 Lake Park',
//         tags: ['cool', 'teacher'],
//     },
// ];

const Test: React.FC<DataType> = ({list}) => {

    const data=list
const index=list.map(el=>el.updated.slice(0, 10))

    return(

    <Table dataSource={data}>
        <Column title="Name" dataIndex="name" key="lastName" />
        <Column title="Cards" dataIndex="cardsCount" key="age" />
        <Column title="Last Update" dataIndex='updated' key="address" />
        <SortComponent title={'sort'} onChange={()=>{}} sort={''} value={''}/>
        <Column   title="Created by" dataIndex='' key="tags" />
        <Column title="Action" key="action"/>
    </Table>
    );
}



export default Test;

//
//
// import React, { useState } from 'react';
// import { Button, Table } from 'antd';
// import type { ColumnsType } from 'antd/es/table';
//
// interface DataType {
//     key: React.Key;
//     name: string;
//     age: number;
//     address: string;
// }
//
// const columns: ColumnsType<DataType> = [
//     {
//         title: 'Name',
//         dataIndex: 'name',
//     },
//     {
//         title: 'Age',
//         dataIndex: 'age',
//     },
//     {
//         title: 'Address',
//         dataIndex: 'address',
//     },
// ];
//
// const data: DataType[] = [];
// for (let i = 0; i < 46; i++) {
//     data.push({
//         key: i,
//         name: `Edward King ${i}`,
//         age: 32,
//         address: `London, Park Lane no. ${i}`,
//     });
// }
//
// const App: React.FC = () => {
//     const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
//     const [loading, setLoading] = useState(false);
//
//     const start = () => {
//         setLoading(true);
//         // ajax request after empty completing
//         setTimeout(() => {
//             setSelectedRowKeys([]);
//             setLoading(false);
//         }, 1000);
//     };
//
//     const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
//         console.log('selectedRowKeys changed: ', newSelectedRowKeys);
//         setSelectedRowKeys(newSelectedRowKeys);
//     };
//
//     const rowSelection = {
//         selectedRowKeys,
//         onChange: onSelectChange,
//     };
//     const hasSelected = selectedRowKeys.length > 0;
//
//     return (
//         <div>
//             <div style={{ marginBottom: 16 }}>
//                 <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
//                     Reload
//                 </Button>
//                 <span style={{ marginLeft: 8 }}>
//           {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
//         </span>
//             </div>
//             <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
//         </div>
//     );
// };
//
// export default App;
