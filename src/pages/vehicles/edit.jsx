import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Row, Col } from "antd";

export const VehicleEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "vehicles",
  });

  const { selectProps: driverSelectProps } = useSelect({
    resource: "drivers",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: queryResult?.data?.data?.drivers?.map((dv) => dv.driverId),
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Registration Number"
              name="registrationNumber"
              rules={[{ required: true, message: "Registration number is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Make" name="make">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Model" name="model">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Year" name="year">
              <InputNumber
                min={1900}
                max={new Date().getFullYear() + 1}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Image URL" name="image">
              <Input />
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
    </Edit>
  );
};
