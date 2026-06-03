import { Form, Input, Button, Divider, Space, Switch } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export const CompanyForm = () => (
  <>
    <Form.Item label="Company Name" name={["content", "name"]} rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Tagline" name={["content", "tagline"]}>
      <Input />
    </Form.Item>
    <Form.Item label="Description" name={["content", "description"]}>
      <TextArea rows={3} />
    </Form.Item>
    <Space>
      <Form.Item label="Phone (display)" name={["content", "phone"]}>
        <Input style={{ width: 200 }} placeholder="+91 97871 80829" />
      </Form.Item>
      <Form.Item label="Phone (raw, for tel: link)" name={["content", "phoneRaw"]}>
        <Input style={{ width: 200 }} placeholder="+919787180829" />
      </Form.Item>
    </Space>
    <Form.Item label="Email" name={["content", "email"]}>
      <Input type="email" />
    </Form.Item>
    <Divider orientation="left">Address</Divider>
    <Form.Item label="Line 1" name={["content", "address", "line1"]}>
      <Input />
    </Form.Item>
    <Form.Item label="Line 2" name={["content", "address", "line2"]}>
      <Input />
    </Form.Item>
    <Form.Item label="Line 3" name={["content", "address", "line3"]}>
      <Input />
    </Form.Item>
    <Form.Item label="Short address" name={["content", "address", "short"]}>
      <Input />
    </Form.Item>
    <Divider />
    <Form.Item label="Business Hours" name={["content", "hours"]}>
      <Input placeholder="Mon-Sat: 9:00am to 6:00pm" />
    </Form.Item>
    <Form.Item label="Copyright text" name={["content", "copyright"]}>
      <Input />
    </Form.Item>
  </>
);

export const LogoForm = () => (
  <>
    <Form.Item label="Main logo path" name={["content", "main"]} rules={[{ required: true }]}>
      <Input placeholder="/img/logo/logo.svg" />
    </Form.Item>
    <Form.Item label="White logo path" name={["content", "white"]}>
      <Input placeholder="/img/logo/logo-white.svg" />
    </Form.Item>
    <Form.Item label="Favicon path" name={["content", "favicon"]}>
      <Input placeholder="/img/logo/favi.svg" />
    </Form.Item>
  </>
);

export const NavigationForm = () => (
  <Form.List name="content">
    {(fields, { add, remove }) => (
      <>
        <Divider orientation="left">Navigation Links</Divider>
        {fields.map(({ key, name, ...rest }) => (
          <Space key={key} align="start" style={{ display: "flex", marginBottom: 8 }}>
            <Form.Item {...rest} name={[name, "label"]} label="Label">
              <Input style={{ width: 130 }} />
            </Form.Item>
            <Form.Item {...rest} name={[name, "path"]} label="Path">
              <Input style={{ width: 120 }} placeholder="/" />
            </Form.Item>
            <Form.Item {...rest} name={[name, "hash"]} label="Hash (optional)">
              <Input style={{ width: 120 }} placeholder="#about" />
            </Form.Item>
            <MinusCircleOutlined onClick={() => remove(name)} style={{ marginTop: 36, color: "#ff4d4f" }} />
          </Space>
        ))}
        <Button type="dashed" onClick={() => add({ label: "", path: "/", hash: "" })} icon={<PlusOutlined />} block>
          Add Nav Link
        </Button>
      </>
    )}
  </Form.List>
);

export const SocialLinksForm = () => (
  <Form.List name="content">
    {(fields, { add, remove }) => (
      <>
        <Divider orientation="left">Social Links</Divider>
        {fields.map(({ key, name, ...rest }) => (
          <Space key={key} align="start" style={{ display: "flex", marginBottom: 8 }}>
            <Form.Item {...rest} name={[name, "icon"]} label="Icon class">
              <Input style={{ width: 200 }} placeholder="fab fa-facebook-f" />
            </Form.Item>
            <Form.Item {...rest} name={[name, "url"]} label="URL">
              <Input style={{ width: 280 }} placeholder="https://facebook.com/" />
            </Form.Item>
            <MinusCircleOutlined onClick={() => remove(name)} style={{ marginTop: 36, color: "#ff4d4f" }} />
          </Space>
        ))}
        <Button type="dashed" onClick={() => add({ icon: "", url: "" })} icon={<PlusOutlined />} block>
          Add Social Link
        </Button>
      </>
    )}
  </Form.List>
);

const LinkListField = ({ name, label }) => (
  <Form.List name={["content", name]}>
    {(fields, { add, remove }) => (
      <>
        <Divider orientation="left">{label}</Divider>
        {fields.map(({ key, fname, ...rest }) => (
          <Space key={key} align="start" style={{ display: "flex", marginBottom: 8 }}>
            <Form.Item {...rest} name={[fname ?? key, "label"]} label="Label">
              <Input style={{ width: 200 }} />
            </Form.Item>
            <Form.Item {...rest} name={[fname ?? key, "path"]} label="Path">
              <Input style={{ width: 150 }} />
            </Form.Item>
            <Form.Item {...rest} name={[fname ?? key, "hash"]} label="Hash">
              <Input style={{ width: 100 }} placeholder="#about" />
            </Form.Item>
            <MinusCircleOutlined onClick={() => remove(fname ?? key)} style={{ marginTop: 36, color: "#ff4d4f" }} />
          </Space>
        ))}
        <Button type="dashed" onClick={() => add({ label: "", path: "/", hash: "" })} icon={<PlusOutlined />} block>
          Add Link
        </Button>
      </>
    )}
  </Form.List>
);

export const FooterForm = () => (
  <>
    <LinkListField name="quickLinks" label="Quick Links" />
    <LinkListField name="serviceLinks" label="Service Links" />
    <LinkListField name="bottomLinks" label="Bottom Links (Terms / Privacy)" />
  </>
);

export const ContactInfoBarForm = () => (
  <Form.List name="content">
    {(fields, { add, remove }) => (
      <>
        <Divider orientation="left">Contact Bar Items</Divider>
        {fields.map(({ key, name, ...rest }) => (
          <div key={key} style={{ border: "1px solid #f0f0f0", borderRadius: 8, padding: 16, marginBottom: 12 }}>
            <Space style={{ justifyContent: "space-between", width: "100%" }}>
              <strong>Item #{name + 1}</strong>
              <MinusCircleOutlined onClick={() => remove(name)} style={{ color: "#ff4d4f" }} />
            </Space>
            <Form.Item {...rest} name={[name, "icon"]} label="Icon class">
              <Input placeholder="fa-solid fa-paper-plane" />
            </Form.Item>
            <Form.Item {...rest} name={[name, "title"]} label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item {...rest} name={[name, "subtitle"]} label="Subtitle">
              <Input />
            </Form.Item>
            <Form.Item {...rest} name={[name, "href"]} label="Link (href)">
              <Input placeholder="mailto:... or tel:..." />
            </Form.Item>
            <Form.Item {...rest} name={[name, "active"]} label="Highlighted" valuePropName="checked">
              <Switch />
            </Form.Item>
          </div>
        ))}
        <Button type="dashed" onClick={() => add({})} icon={<PlusOutlined />} block>
          Add Item
        </Button>
      </>
    )}
  </Form.List>
);

export const SITE_FORM_MAP = {
  company: CompanyForm,
  logo: LogoForm,
  navigation: NavigationForm,
  socialLinks: SocialLinksForm,
  footer: FooterForm,
  contactInfoBar: ContactInfoBarForm,
};

export const SITE_SECTIONS = [
  { key: "company", label: "Company Info", description: "Name, tagline, phone, email, address, hours" },
  { key: "logo", label: "Logo & Favicon", description: "Logo image paths for light/dark and favicon" },
  { key: "navigation", label: "Navigation Links", description: "Header menu links" },
  { key: "socialLinks", label: "Social Links", description: "Facebook, Twitter, Instagram, LinkedIn" },
  { key: "footer", label: "Footer Links", description: "Quick links, service links and bottom links" },
  { key: "contactInfoBar", label: "Contact Info Bar", description: "Email, phone, and address bar shown on pages" },
];
