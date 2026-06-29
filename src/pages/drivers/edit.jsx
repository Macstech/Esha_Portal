import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select, Row, Col } from "antd";

export const DriverEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "drivers",
  });

  const { selectProps: vehicleSelectProps } = useSelect({
    resource: "vehicles",
    optionLabel: "registrationNumber",
    optionValue: "id",
    defaultValue: queryResult?.data?.data?.vehicles?.map((dv) => dv.vehicleId),
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
              label="License Number"
              name="licenseNumber"
              rules={[{ required: true, message: "License number is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="File Attachment URL" name="fileAttachment">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Assign Vehicles" name="vehicleIds">
          <Select
            mode="multiple"
            placeholder="Select vehicles"
            {...vehicleSelectProps}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
