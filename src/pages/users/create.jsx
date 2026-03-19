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
        <Form.Item label="Role" name="role" initialValue="VIEWER">
          <Select
            options={[
              { label: "Super Admin", value: "SUPER_ADMIN" },
              { label: "Editor", value: "EDITOR" },
              { label: "Viewer", value: "VIEWER" },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
