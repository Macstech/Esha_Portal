import {
  List,
  useTable,
  EditButton,
  DeleteButton,
  DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const SupervisorAssignmentList = () => {
  const { tableProps } = useTable({
    resource: "supervisor-assignments",
    sorters: { initial: [{ field: "createdAt", order: "desc" }] },
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" width={60} sorter />
        <Table.Column
          dataIndex="supervisor"
          title="Supervisor"
          render={(s) => s?.name || "—"}
        />
        <Table.Column
          dataIndex="driver"
          title="Driver"
          render={(d) => d?.name || "—"}
        />
        <Table.Column
          dataIndex="vehicle"
          title="Vehicle"
          render={(v) => v?.registrationNumber || "—"}
        />
        <Table.Column
          dataIndex="startDate"
          title="Start Date"
          render={(value) => <DateField value={value} format="MMM DD, YYYY" />}
        />
        <Table.Column
          dataIndex="endDate"
          title="End Date"
          render={(value) => value ? <DateField value={value} format="MMM DD, YYYY" /> : "Ongoing"}
        />
        <Table.Column dataIndex="notes" title="Notes" render={(v) => v || "—"} />
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
