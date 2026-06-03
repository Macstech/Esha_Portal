import { Form, Input, Button, Divider, Space } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export const BreadcrumbForm = () => (
  <>
    <Form.Item label="Page Title" name={["content", "title"]} rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Background Image path" name={["content", "image"]}>
      <Input placeholder="/img/bg/breadcrumb-bg.webp" />
    </Form.Item>
    <Form.Item label="Thumb Image path" name={["content", "thumb"]}>
      <Input placeholder="/img/thumbs/truck1.svg" />
    </Form.Item>
  </>
);

export const InfoCardsForm = () => (
  <Form.List name={["content"]}>
    {(fields, { add, remove }) => (
      <>
        <Divider orientation="left">Info Cards</Divider>
        {fields.map(({ key, name, ...rest }) => (
          <div key={key} style={{ border: "1px solid #f0f0f0", borderRadius: 8, padding: 16, marginBottom: 12 }}>
            <Space style={{ justifyContent: "space-between", width: "100%" }}>
              <strong>Card #{name + 1}</strong>
              <MinusCircleOutlined onClick={() => remove(name)} style={{ color: "#ff4d4f" }} />
            </Space>
            <Form.Item {...rest} name={[name, "icon"]} label="Icon class">
              <Input placeholder="fa-light fa-location-dot" />
            </Form.Item>
            <Form.Item {...rest} name={[name, "title"]} label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item {...rest} name={[name, "content"]} label="Content (HTML allowed)">
              <TextArea rows={3} />
            </Form.Item>
          </div>
        ))}
        <Button type="dashed" onClick={() => add({})} icon={<PlusOutlined />} block>
          Add Info Card
        </Button>
      </>
    )}
  </Form.List>
);

export const ContactFormSection = () => (
  <>
    <Form.Item label="Form Title" name={["content", "title"]} rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Form Subtitle" name={["content", "subtitle"]}>
      <TextArea rows={2} />
    </Form.Item>
    <Divider orientation="left">Service Options</Divider>
    <Form.List name={["content", "services"]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...rest }) => (
            <Space key={key} align="start" style={{ display: "flex", marginBottom: 8 }}>
              <Form.Item {...rest} name={[name, "value"]} label="Value">
                <Input style={{ width: 130 }} />
              </Form.Item>
              <Form.Item {...rest} name={[name, "label"]} label="Label">
                <Input style={{ width: 280 }} />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} style={{ marginTop: 36, color: "#ff4d4f" }} />
            </Space>
          ))}
          <Button type="dashed" onClick={() => add({})} icon={<PlusOutlined />} block>
            Add Service Option
          </Button>
        </>
      )}
    </Form.List>
  </>
);

export const MapForm = () => (
  <Form.Item
    label="Google Maps Embed URL"
    name={["content", "embedUrl"]}
    rules={[{ required: true }]}
    help="Paste the full embed URL from Google Maps → Share → Embed a map"
  >
    <TextArea rows={4} />
  </Form.Item>
);

export const WhyContactForm = () => (
  <>
    <Form.Item label="Subtitle" name={["content", "subtitle"]}>
      <Input />
    </Form.Item>
    <Form.Item label="Title" name={["content", "title"]} rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Divider orientation="left">Cards</Divider>
    <Form.List name={["content", "cards"]}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...rest }) => (
            <Space key={key} align="start" style={{ display: "flex", marginBottom: 8 }}>
              <div>
                <Form.Item {...rest} name={[name, "icon"]} label="Icon">
                  <Input placeholder="fa-light fa-badge-check" />
                </Form.Item>
                <Form.Item {...rest} name={[name, "title"]} label="Title" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item {...rest} name={[name, "description"]} label="Description">
                  <TextArea rows={2} />
                </Form.Item>
              </div>
              <MinusCircleOutlined onClick={() => remove(name)} style={{ marginTop: 36, color: "#ff4d4f" }} />
            </Space>
          ))}
          <Button type="dashed" onClick={() => add({})} icon={<PlusOutlined />} block>
            Add Card
          </Button>
        </>
      )}
    </Form.List>
  </>
);

export const CONTACT_FORM_MAP = {
  breadcrumb: BreadcrumbForm,
  infoCards: InfoCardsForm,
  form: ContactFormSection,
  map: MapForm,
  whyContact: WhyContactForm,
};

export const CONTACT_SECTIONS = [
  { key: "breadcrumb", label: "Page Header", description: "Breadcrumb title and background image" },
  { key: "infoCards", label: "Info Cards", description: "Location, phone, and email cards" },
  { key: "form", label: "Contact Form", description: "Form title, subtitle and service options" },
  { key: "map", label: "Google Map", description: "Embedded map URL" },
  { key: "whyContact", label: "Why Contact Us", description: "Section title and feature cards" },
];
