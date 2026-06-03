import { useList, useCreate, useUpdate } from "@refinedev/core";
import { useState } from "react";
import {
  Table, Button, Tag, Drawer, Form, Switch, Space,
  Typography, Tooltip, notification, Spin,
} from "antd";
import {
  EditOutlined, PlusOutlined, SyncOutlined, CheckCircleOutlined,
} from "@ant-design/icons";
import { DateField } from "@refinedev/antd";

const { Text } = Typography;

export const SectionEditorPage = ({ page, pageLabel, sections, formMap }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [form] = Form.useForm();
  const [saving, setSaving] = useState(false);

  const { data, isLoading, refetch } = useList({
    resource: "website-content/content",
    filters: [{ field: "page", operator: "eq", value: page }],
    pagination: { pageSize: 100 },
  });

  const { mutate: createRecord } = useCreate();
  const { mutate: updateRecord } = useUpdate();

  const dbRecords = data?.data ?? [];

  const rows = sections.map((s) => ({
    ...s,
    record: dbRecords.find((r) => r.section === s.key) ?? null,
  }));

  const openEdit = (section) => {
    setActiveSection(section);
    const content = section.record?.content ?? section.defaultData ?? {};
    form.setFieldsValue({ content, isActive: section.record?.isActive ?? true });
    setDrawerOpen(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);

      const payload = {
        page,
        section: activeSection.key,
        content: values.content,
        isActive: values.isActive,
      };

      const opts = {
        onSuccess: () => {
          notification.success({ message: `"${activeSection.label}" saved.` });
          setDrawerOpen(false);
          setSaving(false);
          refetch();
        },
        onError: () => setSaving(false),
      };

      if (activeSection.record) {
        updateRecord({ resource: "website-content/content", id: activeSection.record.id, values: payload }, opts);
      } else {
        createRecord({ resource: "website-content/content", values: payload }, opts);
      }
    } catch {
      setSaving(false);
    }
  };

  const SectionForm = activeSection ? formMap[activeSection.key] : null;

  return (
    <div style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <Typography.Title level={4} style={{ margin: 0 }}>
          {pageLabel} — Section Content
        </Typography.Title>
        <Text type="secondary">
          Edit each section individually. Changes are saved to the database and reflected on the website immediately.
        </Text>
      </div>

      <Table dataSource={rows} rowKey="key" loading={isLoading} pagination={false} bordered>
        <Table.Column
          title="Section"
          dataIndex="label"
          render={(label, row) => (
            <div>
              <Text strong>{label}</Text>
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>{row.description}</Text>
            </div>
          )}
        />
        <Table.Column
          title="Status"
          width={160}
          render={(_, row) =>
            row.record ? (
              <Tag icon={<CheckCircleOutlined />} color="success">In Database</Tag>
            ) : (
              <Tag icon={<SyncOutlined />} color="default">Using Static Data</Tag>
            )
          }
        />
        <Table.Column
          title="Active"
          width={90}
          render={(_, row) =>
            row.record ? (
              <Tag color={row.record.isActive ? "green" : "red"}>
                {row.record.isActive ? "Yes" : "No"}
              </Tag>
            ) : <Text type="secondary">—</Text>
          }
        />
        <Table.Column
          title="Last Updated"
          width={160}
          render={(_, row) =>
            row.record ? (
              <DateField value={row.record.updatedAt} format="MMM DD, YYYY HH:mm" />
            ) : <Text type="secondary">—</Text>
          }
        />
        <Table.Column
          title="Action"
          width={120}
          render={(_, row) => (
            <Tooltip title={row.record ? "Edit section" : "Create DB entry for this section"}>
              <Button
                type={row.record ? "default" : "primary"}
                icon={row.record ? <EditOutlined /> : <PlusOutlined />}
                size="small"
                onClick={() => openEdit(row)}
              >
                {row.record ? "Edit" : "Create"}
              </Button>
            </Tooltip>
          )}
        />
      </Table>

      <Drawer
        title={
          activeSection ? (
            <Space>
              <span>{activeSection.label}</span>
              <Tag color="blue">{page}</Tag>
              <Tag color="purple">{activeSection?.key}</Tag>
            </Space>
          ) : null
        }
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={640}
        extra={
          <Space>
            <Button onClick={() => setDrawerOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={handleSave} loading={saving}>Save</Button>
          </Space>
        }
        destroyOnClose
      >
        <Spin spinning={saving}>
          <Form form={form} layout="vertical">
            {SectionForm && <SectionForm />}
            <div style={{ marginTop: 16, borderTop: "1px solid #f0f0f0", paddingTop: 16 }}>
              <Form.Item label="Active on website" name="isActive" valuePropName="checked">
                <Switch />
              </Form.Item>
            </div>
          </Form>
        </Spin>
      </Drawer>
    </div>
  );
};
