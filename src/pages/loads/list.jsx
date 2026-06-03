import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
  DateField,
  FilterDropdown,
} from "@refinedev/antd";
import { Table, Space, Tag, Input, Select } from "antd";

const STATUS_COLORS = {
  PENDING: "orange",
  IN_TRANSIT: "blue",
  DELIVERED: "green",
  CANCELLED: "red",
};

export const LoadList = () => {
  const { tableProps } = useTable({
    resource: "loads",
    sorters: { initial: [{ field: "createdAt", order: "desc" }] },
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" width={60} sorter />
        <Table.Column
          dataIndex="loadNumber"
          title="Load #"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search load number..." />
            </FilterDropdown>
          )}
        />
        <Table.Column dataIndex="origin" title="Origin" render={(v) => v || "—"} />
        <Table.Column dataIndex="destination" title="Destination" render={(v) => v || "—"} />
        <Table.Column
          dataIndex="vehicle"
          title="Vehicle"
          render={(v) => v?.registrationNumber || "—"}
        />
        <Table.Column
          dataIndex="driver"
          title="Driver"
          render={(d) => d?.name || "—"}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ width: 160 }}
                placeholder="Filter status"
                options={["PENDING", "IN_TRANSIT", "DELIVERED", "CANCELLED"].map((s) => ({ label: s, value: s }))}
              />
            </FilterDropdown>
          )}
          render={(v) => <Tag color={STATUS_COLORS[v]}>{v}</Tag>}
        />
        <Table.Column
          dataIndex="scheduledAt"
          title="Scheduled"
          render={(v) => v ? <DateField value={v} format="MMM DD, YYYY" /> : "—"}
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
