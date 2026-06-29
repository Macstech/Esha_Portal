import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Row, Col } from "antd";

export const VehicleTypeCreate = () => {
  const { formProps, saveButtonProps } = useForm({ resource: "vehicle-types" });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
              <Input placeholder="e.g. Tipper, Tanker, Flatbed" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Unit" name="unit">
              <Input placeholder="e.g. tonnes, litres, cubic metres" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Capacity" name="capacity">
              <InputNumber min={0} step={0.1} style={{ width: "100%" }} placeholder="e.g. 10" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Optional description" />
        </Form.Item>
      </Form>
    </Create>
  );
};
