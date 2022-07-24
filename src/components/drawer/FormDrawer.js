import { Button, Drawer, Form, Input, Select, Space } from "antd";
import { useEffect } from "react";

const { Option } = Select;

export default function FormDrawer({ viewDrawer, closeDrawer, onChangeGenderDropdown, onSearchGenderDropdown, onFinishFormDetails, selectedData }) {
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectedData && Object.keys(selectedData).length) {
            form.setFieldsValue({
                name: selectedData?.name,
                address: selectedData?.address,
                email: selectedData?.email,
                phoneNo: selectedData?.phoneNo,
                gender: selectedData?.gender

            })
        }
    }, [viewDrawer])

    return (
        <>
            <Drawer
                title="Student Details"
                width={500}
                onClose={closeDrawer}
                visible={viewDrawer}
                bodyStyle={{
                    paddingBottom: 80,
                }}>
                <Form form={form} onFinish={onFinishFormDetails} >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your name',
                            }
                        ]}
                    >
                        <Input placeholder="Student Name" />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your Address',
                            }
                        ]}
                    >
                        <Input placeholder="Student Address" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email ID"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email id',
                            }
                        ]}
                    >
                        <Input type='email' placeholder="Student Email ID" />
                    </Form.Item>
                    <Form.Item
                        name="phoneNo"
                        label="Phone No"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your phone number',
                            }
                        ]}
                    >
                        <Input type='number' placeholder="Student Phone Number" />
                    </Form.Item>
                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'click any one and select your gender',
                            }
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Select your Gender"
                            onChange={onChangeGenderDropdown}
                            onSearch={onSearchGenderDropdown}
                        >
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                            <Option value="Others">Others</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button onClick={closeDrawer}>Cancel</Button>
                            <Button type="primary"
                                htmlType="submit"
                                reset
                            >Submit </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}