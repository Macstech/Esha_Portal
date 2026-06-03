import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
  DateField,
  FilterDropdown,
} from "@refinedev/antd";
import { Table, Space, Input } from "antd";

export const DriverList = () => {
  const { tableProps } = useTable({
    resource: "drivers",
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
        <Table.Column dataIndex="licenseNumber" title="License Number" />
        <Table.Column dataIndex="phone" title="Phone" />
        <Table.Column
          dataIndex="vehicles"
          title="Assigned Vehicles"
          render={(vehicles) =>
            vehicles?.map((dv) => dv.vehicle?.registrationNumber).join(", ") || "—"
          }
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
