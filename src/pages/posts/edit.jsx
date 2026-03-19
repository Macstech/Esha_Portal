import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

const { TextArea } = Input;

export const PostEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({
    resource: "posts",
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: queryResult?.data?.data?.categories?.map((c) => c.id),
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Excerpt" name="excerpt">
          <TextArea rows={2} />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Content is required" }]}
        >
          <TextArea rows={12} />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select
            options={[
              { label: "Draft", value: "DRAFT" },
              { label: "Published", value: "PUBLISHED" },
              { label: "Archived", value: "ARCHIVED" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Categories" name="categoryIds">
          <Select
            mode="multiple"
            placeholder="Select categories"
            {...categorySelectProps}
          />
        </Form.Item>

        <Form.Item label="Cover Image URL" name="coverImage">
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
