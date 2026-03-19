import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

const { TextArea } = Input;

export const CategoryEdit = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "categories",
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Category name is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={3} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
