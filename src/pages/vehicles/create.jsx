import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Row, Col } from "antd";

export const VehicleCreate = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "vehicles",
  });

  const { selectProps: driverSelectProps } = useSelect({
    resource: "drivers",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Registration Number"
              name="registrationNumber"
              rules={[{ required: true, message: "Registration number is required" }]}
            >
              <Input placeholder="Enter registration number" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Make" name="make">
              <Input placeholder="e.g. Toyota, Ford" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Model" name="model">
              <Input placeholder="e.g. Camry, F-150" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Year" name="year">
              <InputNumber
                min={1900}
                max={new Date().getFullYear() + 1}
                placeholder="e.g. 2024"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Image URL" name="image">
              <Input placeholder="https://example.com/vehicle.jpg" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Assign Drivers" name="driverIds">
          <Select
            mode="multiple"
            placeholder="Select drivers"
            {...driverSelectProps}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
