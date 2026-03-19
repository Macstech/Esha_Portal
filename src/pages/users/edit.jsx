import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const UserEdit = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "users",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="password"
          help="Leave blank to keep current password"
        >
          <Input.Password placeholder="Leave blank to keep current" />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Select
            options={[
              { label: "Super Admin", value: "SUPER_ADMIN" },
              { label: "Editor", value: "EDITOR" },
              { label: "Viewer", value: "VIEWER" },
            ]}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
