import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
  DateField,
  FilterDropdown,
} from "@refinedev/antd";
import { Table, Space, Image, Input } from "antd";

export const VehicleList = () => {
  const { tableProps } = useTable({
    resource: "vehicles",
    sorters: { initial: [{ field: "createdAt", order: "desc" }] },
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" width={60} sorter />
        <Table.Column
          dataIndex="image"
          title="Image"
          width={80}
          render={(value) =>
            value ? (
              <Image width={50} height={50} src={value} style={{ objectFit: "cover", borderRadius: 4 }} />
            ) : (
              "—"
            )
          }
        />
        <Table.Column
          dataIndex="registrationNumber"
          title="Registration No."
          sorter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search registration..." />
            </FilterDropdown>
          )}
        />
        <Table.Column dataIndex="make" title="Make" sorter />
        <Table.Column dataIndex="model" title="Model" sorter />
        <Table.Column dataIndex="year" title="Year" width={80} sorter />
        <Table.Column
          dataIndex="drivers"
          title="Assigned Drivers"
          render={(drivers) =>
            drivers?.map((dv) => dv.driver?.name).join(", ") || "—"
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
