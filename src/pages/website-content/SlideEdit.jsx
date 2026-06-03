import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Switch, Row, Col } from "antd";

export const SlideEdit = () => {
  const { formProps, saveButtonProps } = useForm({
    resource: "website-content/slides",
  });

  return (
    <Edit saveButtonProps={saveButtonProps} title="Edit Hero Slide">
      <Form {...formProps} layout="vertical">
        <Row gutter={16}>
          <Col span={20}>
            <Form.Item label="Background Image URL" name="background">
              <Input placeholder="https://... or /img/bg/hero-bg-1.webp" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="Order" name="order">
              <InputNumber style={{ width: "100%" }} min={0} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Subtitle" name="subtitle">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Text / Description" name="text">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Button Text" name="buttonText">
              <Input placeholder="e.g. Learn More" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Button Link" name="buttonLink">
              <Input placeholder="/about or https://..." />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Badge Title" name="badgeTitle">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Badge Subtitle" name="badgeSubtitle">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Active" name="isActive" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </Edit>
  );
};
