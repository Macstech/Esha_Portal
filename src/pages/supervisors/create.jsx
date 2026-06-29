import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Switch, Row, Col } from "antd";

export const SupervisorCreate = () => {
  const { formProps, saveButtonProps } = useForm({ resource: "supervisors" });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
              <Input placeholder="Enter supervisor name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Employee ID" name="employeeId" rules={[{ required: true, message: "Employee ID is required" }]}>
              <Input placeholder="Enter employee ID" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Phone" name="phone">
              <Input placeholder="Enter phone number" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Email" name="email" rules={[{ type: "email", message: "Enter a valid email" }]}>
              <Input placeholder="Enter email address" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Zone" name="zone">
              <Input placeholder="Enter zone (e.g. North, South)" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Active" name="isActive" valuePropName="checked" initialValue={true}>
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Create>
  );
};
