import { List, useTable, EditButton, DeleteButton, DateField } from "@refinedev/antd";
import { Table, Space, Tag, Input, Select } from "antd";
import { FilterDropdown } from "@refinedev/antd";

export const ContentList = () => {
  const { tableProps } = useTable({
    resource: "website-content/content",
    sorters: { initial: [{ field: "updatedAt", order: "desc" }] },
    syncWithLocation: true,
  });

  return (
    <List title="Website Content">
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" width={60} sorter />
        <Table.Column
          dataIndex="page"
          title="Page"
          width={130}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Filter page..." />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="section"
          title="Section"
          width={160}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Filter section..." />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="content"
          title="Content Preview"
          ellipsis
          render={(value) => {
            if (!value) return "—";
            const text =
              typeof value === "object" ? JSON.stringify(value) : String(value);
            return text.length > 80 ? text.slice(0, 80) + "…" : text;
          }}
        />
        <Table.Column
          dataIndex="isActive"
          title="Status"
          width={100}
          render={(v) => (
            <Tag color={v ? "green" : "default"}>{v ? "Active" : "Inactive"}</Tag>
          )}
        />
        <Table.Column
          dataIndex="updatedAt"
          title="Last Updated"
          width={150}
          sorter
          render={(v) => <DateField value={v} format="MMM DD, YYYY" />}
        />
        <Table.Column
          title="Actions"
          width={100}
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
