import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const UserCreate = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "users",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Full name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input placeholder="user@example.com" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Password is required" },
            { min: 6, message: "Minimum 6 characters" },
          ]}
        >
          <Input.Password placeholder="Minimum 6 characters" />
        </Form.Item>
        <Form.Item label="Role" name="role" initialValue="VENDOR">
          <Select
            options={[
              { label: "Admin", value: "ADMIN" },
              { label: "Vendor", value: "VENDOR" },
              { label: "Driver", value: "DRIVER" },
              { label: "Supervisor", value: "SUPERVISOR" },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
