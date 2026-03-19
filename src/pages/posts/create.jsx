import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

const { TextArea } = Input;

export const PostCreate = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "posts",
  });

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>

        <Form.Item
          label="Excerpt"
          name="excerpt"
        >
          <TextArea rows={2} placeholder="Short summary of the post" />
        </Form.Item>

        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: "Content is required" }]}
        >
          <TextArea rows={12} placeholder="Write your content here (HTML supported)..." />
        </Form.Item>

        <Form.Item label="Status" name="status" initialValue="DRAFT">
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
          <Input placeholder="https://example.com/image.jpg" />
        </Form.Item>
      </Form>
    </Create>
  );
};
