import {
  List,
  useTable,
  EditButton,
  DeleteButton,
  DateField,
  FilterDropdown,
} from "@refinedev/antd";
import { Table, Space, Input } from "antd";

export const VehicleTypeList = () => {
  const { tableProps } = useTable({
    resource: "vehicle-types",
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
        <Table.Column dataIndex="description" title="Description" render={(v) => v || "—"} />
        <Table.Column
          dataIndex="capacity"
          title="Capacity"
          render={(v, record) => v ? `${v} ${record.unit || ""}`.trim() : "—"}
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
          width={120}
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
