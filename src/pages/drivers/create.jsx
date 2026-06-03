import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const DriverCreate = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "drivers",
  });

  const { selectProps: vehicleSelectProps } = useSelect({
    resource: "vehicles",
    optionLabel: "registrationNumber",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Enter driver name" />
        </Form.Item>

        <Form.Item
          label="License Number"
          name="licenseNumber"
          rules={[{ required: true, message: "License number is required" }]}
        >
          <Input placeholder="Enter license number" />
        </Form.Item>

        <Form.Item label="Phone" name="phone">
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item label="File Attachment URL" name="fileAttachment">
          <Input placeholder="https://example.com/file.pdf" />
        </Form.Item>

        <Form.Item label="Assign Vehicles" name="vehicleIds">
          <Select
            mode="multiple"
            placeholder="Select vehicles"
            {...vehicleSelectProps}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
