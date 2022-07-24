import ButtonComponent from '../components/button/Button';
import FormDrawer from '../components/drawer/FormDrawer';
import TableComponent from '../components/Table/Table';
import { Space, Button } from 'antd';
import { useState, useEffect } from 'react';



const ListPage = () => {

    const [visible, setVisible] = useState(false);
    const [studentData, setStudentData] = useState([]);
    const [selectedData, setSelectedData] = useState(null);
    const [editedDataIndex, setEditedDataIndex] = useState();

    // const [form] = Form.useForm();


    useEffect(() => {
        let studentDetails = localStorage.getItem("studentData");
        if (studentDetails?.length) {
            setStudentData(JSON.parse(studentDetails));
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("studentData", JSON.stringify(studentData));
    }, [studentData]);

    const showDrawer = () => {
        setSelectedData(prev => prev = null)
        setVisible(true);
    };

    const onClose = () => {
        setSelectedData(prev => prev = null)
        setVisible(false);
    };

    const onChange = (value) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    const FormHandler = (values) => {
        if (selectedData !== null && Object.keys(selectedData).length) {
            let updatedData = [...studentData]
            updatedData[editedDataIndex] = {
                id: selectedData.id,
                name: values.name,
                address: values.address,
                email: values.email,
                phoneNo: values.phoneNo,
                gender: values.gender
            }
            setStudentData(updatedData);

        } else {
            let temp = [...studentData];
            const student = {
                id: Date.now(),
                name: values.name,
                address: values.address,
                email: values.email,
                phoneNo: values.phoneNo,
                gender: values.gender
            }
            temp.push(student);
            setStudentData(temp);
        }
        setVisible(false);
    }

    const deleteStudentData = (row) => {
        let tempStudentDetail = [...studentData];
        const studentIndex = tempStudentDetail.findIndex(elem => elem.id === row.id);
        tempStudentDetail.splice(studentIndex, 1);
        setStudentData(tempStudentDetail);
    }

    const editStudentData = (row) => {
        let newDataIndex = studentData.findIndex(value => value.id === row.id)
        setEditedDataIndex(newDataIndex);
        setSelectedData(row);
        setVisible(true);
    }

    const studentDataColumn = [
        {
            key: "1",
            title: "ID",
            dataIndex: 'id'
        },
        {
            key: "2",
            title: "Name",
            dataIndex: 'name',
        },
        {
            key: "3",
            title: "Address",
            dataIndex: 'address'
        },
        {
            key: "4",
            title: "Email",
            dataIndex: 'email'
        },
        {
            key: "5",
            title: "Phone Number",
            dataIndex: 'phoneNo',

        },
        {
            key: "6",
            title: "Gender",
            dataIndex: 'gender',
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <Button type='primary'
                        onClick={() => editStudentData(record)}
                    >Edit</Button>
                    <Button
                        onClick={() => deleteStudentData(record)}
                    >Delete</Button>
                </Space>
            ),
        },
    ];


    return (
        <>
            <ButtonComponent addButtonHandler={showDrawer}
                buttonName="Add"
                type="primary"
            />
            <TableComponent
                columnName={studentDataColumn}
                tableDataSource={studentData}
            />
            {visible &&
                <FormDrawer
                    viewDrawer={visible}
                    closeDrawer={() => onClose()}
                    selectedData={selectedData}
                    onChangeGenderDropdown={onChange}
                    onSearchGenderDropdown={onSearch}
                    onFinishFormDetails={FormHandler}
                />
            }
        </>
    );

}

export default ListPage;