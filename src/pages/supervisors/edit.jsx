import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Switch } from "antd";

export const SupervisorEdit = () => {
  const { formProps, saveButtonProps } = useForm({ resource: "supervisors" });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Employee ID" name="employeeId" rules={[{ required: true, message: "Employee ID is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Phone" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ type: "email", message: "Enter a valid email" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Zone" name="zone">
          <Input />
        </Form.Item>
        <Form.Item label="Active" name="isActive" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
};
