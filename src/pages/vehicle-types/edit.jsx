import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber } from "antd";

export const VehicleTypeEdit = () => {
  const { formProps, saveButtonProps } = useForm({ resource: "vehicle-types" });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="Capacity" name="capacity">
          <InputNumber min={0} step={0.1} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Unit" name="unit">
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
