import { Form, Input, InputNumber, Button, Divider, Space } from "antd";
import { BreadcrumbForm } from "./ContactForms";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export const ProjectsHeaderForm = () => (
  <>
    <Form.Item label="Subtitle" name={["content", "subtitle"]}>
      <Input />
    </Form.Item>
    <Form.Item label="Title" name={["content", "title"]} rules={[{ required: true }]}>
      <Input />
    </Form.Item>
  </>
);

export const ProjectsListForm = () => (
  <Form.List name="content">
    {(fields, { add, remove }) => (
      <>
        <Divider orientation="left">Projects</Divider>
        {fields.map(({ key, name, ...rest }) => (
          <div key={key} style={{ border: "1px solid #f0f0f0", borderRadius: 8, padding: 16, marginBottom: 12 }}>
            <Space style={{ justifyContent: "space-between", width: "100%" }}>
              <strong>Project #{name + 1}</strong>
              <MinusCircleOutlined onClick={() => remove(name)} style={{ color: "#ff4d4f" }} />
            </Space>
            <Space>
              <Form.Item {...rest} name={[name, "tag"]} label="Tag">
                <Input style={{ width: 150 }} placeholder="Municipal" />
              </Form.Item>
            </Space>
            <Form.Item {...rest} name={[name, "title"]} label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item {...rest} name={[name, "image"]} label="Image path">
              <Input placeholder="/img/thumbs/thumb-70.webp" />
            </Form.Item>
            <Form.Item {...rest} name={[name, "description"]} label="Description">
              <TextArea rows={3} />
            </Form.Item>
          </div>
        ))}
        <Button type="dashed" onClick={() => add({})} icon={<PlusOutlined />} block>
          Add Project
        </Button>
      </>
    )}
  </Form.List>
);

export const TeamForm = () => (
  <>
    <Form.Item label="Subtitle" name={["content", "subtitle"]}>
      <Input />
    </Form.Item>
    <Form.Item label="Title" name={["content", "title"]} rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Team Image path" name={["content", "image"]}>
      <Input placeholder="/img/bg/team.svg" />
    </Form.Item>
  </>
);

export const StatsForm = () => (
  <Form.List name="content">
    {(fields, { add, remove }) => (
      <>
        <Divider orientation="left">Stats</Divider>
        {fields.map(({ key, name, ...rest }) => (
          <Space key={key} align="start" style={{ display: "flex", marginBottom: 8 }}>
            <Form.Item {...rest} name={[name, "icon"]} label="Icon">
              <Input style={{ width: 200 }} placeholder="fa-light fa-check-circle" />
            </Form.Item>
            <Form.Item {...rest} name={[name, "label"]} label="Label">
              <Input style={{ width: 200 }} />
            </Form.Item>
            <Form.Item {...rest} name={[name, "value"]} label="Value">
              <InputNumber style={{ width: 100 }} min={0} />
            </Form.Item>
            <MinusCircleOutlined onClick={() => remove(name)} style={{ marginTop: 36, color: "#ff4d4f" }} />
          </Space>
        ))}
        <Button type="dashed" onClick={() => add({})} icon={<PlusOutlined />} block>
          Add Stat
        </Button>
      </>
    )}
  </Form.List>
);

export const CtaForm = () => (
  <>
    <Form.Item label="Subtitle" name={["content", "subtitle"]}>
      <Input />
    </Form.Item>
    <Form.Item label="Title" name={["content", "title"]} rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Description" name={["content", "description"]}>
      <TextArea rows={3} />
    </Form.Item>
    <Space>
      <Form.Item label="Button Text" name={["content", "buttonText"]}>
        <Input style={{ width: 180 }} />
      </Form.Item>
      <Form.Item label="Button Link" name={["content", "buttonLink"]}>
        <Input style={{ width: 220 }} placeholder="/contact" />
      </Form.Item>
    </Space>
  </>
);

export const PROJECTS_FORM_MAP = {
  breadcrumb: BreadcrumbForm,
  header: ProjectsHeaderForm,
  projects: ProjectsListForm,
  team: TeamForm,
  stats: StatsForm,
  cta: CtaForm,
};

export const PROJECTS_SECTIONS = [
  { key: "breadcrumb", label: "Page Header", description: "Breadcrumb title and background image" },
  { key: "header", label: "Section Header", description: "Projects section subtitle and title" },
  { key: "projects", label: "Projects List", description: "All project cards shown in the grid" },
  { key: "team", label: "Team Section", description: "Team subtitle, title and image" },
  { key: "stats", label: "Stats / Counters", description: "Numbers shown below the team section" },
  { key: "cta", label: "Call to Action", description: "Bottom CTA section with button" },
];
