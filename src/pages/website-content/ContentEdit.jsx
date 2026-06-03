import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Switch, Alert } from "antd";

export const ContentEdit = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "website-content/content",
  });

  return (
    <Edit saveButtonProps={saveButtonProps} title="Edit Website Content">
      <Alert
        message="Content is stored as JSON. Use valid JSON for structured data, or plain text for simple strings."
        type="info"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Page"
          name="page"
          rules={[{ required: true, message: "Page is required" }]}
        >
          <Input placeholder="e.g. home, about, contact" />
        </Form.Item>

        <Form.Item
          label="Section"
          name="section"
          rules={[{ required: true, message: "Section is required" }]}
        >
          <Input placeholder="e.g. hero, about, services" />
        </Form.Item>

        <Form.Item
          label="Content (JSON or plain text)"
          name="content"
          rules={[
            { required: true, message: "Content is required" },
            {
              validator: (_, value) => {
                if (!value) return Promise.resolve();
                try {
                  JSON.parse(value);
                  return Promise.resolve();
                } catch {
                  // Allow plain strings too
                  return Promise.resolve();
                }
              },
            },
          ]}
          getValueProps={(value) => ({
            value:
              value && typeof value === "object"
                ? JSON.stringify(value, null, 2)
                : value,
          })}
        >
          <Input.TextArea rows={14} style={{ fontFamily: "monospace" }} />
        </Form.Item>

        <Form.Item label="Active" name="isActive" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
};
