import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

const { TextArea } = Input;

export const CategoryCreate = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "categories",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Category name is required" }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={3} placeholder="Optional description" />
        </Form.Item>
      </Form>
    </Create>
  );
};
