import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber } from "antd";

export const VehicleTypeCreate = () => {
  const { formProps, saveButtonProps } = useForm({ resource: "vehicle-types" });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
          <Input placeholder="e.g. Tipper, Tanker, Flatbed" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Optional description" />
        </Form.Item>
        <Form.Item label="Capacity" name="capacity">
          <InputNumber min={0} step={0.1} style={{ width: "100%" }} placeholder="e.g. 10" />
        </Form.Item>
        <Form.Item label="Unit" name="unit">
          <Input placeholder="e.g. tonnes, litres, cubic metres" />
        </Form.Item>
      </Form>
    </Create>
  );
};
