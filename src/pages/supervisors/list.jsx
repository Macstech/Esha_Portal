import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
  DateField,
  FilterDropdown,
} from "@refinedev/antd";
import { Table, Space, Input, Tag } from "antd";

export const SupervisorList = () => {
  const { tableProps } = useTable({
    resource: "supervisors",
    sorters: { initial: [{ field: "createdAt", order: "desc" }] },
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" width={60} sorter />
        <Table.Column
          dataIndex="name"
          title="Name"
          sorter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search name..." />
            </FilterDropdown>
          )}
        />
        <Table.Column dataIndex="employeeId" title="Employee ID" />
        <Table.Column dataIndex="phone" title="Phone" render={(v) => v || "—"} />
        <Table.Column dataIndex="email" title="Email" render={(v) => v || "—"} />
        <Table.Column dataIndex="zone" title="Zone" render={(v) => v || "—"} />
        <Table.Column
          dataIndex="isActive"
          title="Status"
          render={(v) => <Tag color={v ? "green" : "red"}>{v ? "Active" : "Inactive"}</Tag>}
        />
        <Table.Column
          dataIndex="createdAt"
          title="Created"
          width={130}
          sorter
          render={(value) => <DateField value={value} format="MMM DD, YYYY" />}
        />
        <Table.Column
          title="Actions"
          width={150}
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
