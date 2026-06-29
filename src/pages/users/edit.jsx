import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Row, Col } from "antd";

export const UserEdit = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "users",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
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
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="New Password"
              name="password"
              help="Leave blank to keep current password"
            >
              <Input.Password placeholder="Leave blank to keep current" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Role" name="role">
              <Select
                options={[
                  { label: "Admin", value: "ADMIN" },
                  { label: "Vendor", value: "VENDOR" },
                  { label: "Driver", value: "DRIVER" },
                  { label: "Supervisor", value: "SUPERVISOR" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
