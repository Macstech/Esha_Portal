import { List, useTable, ShowButton, DateField } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";

const STATUS_COLORS = {
  PENDING: "orange",
  IN_TRANSIT: "blue",
  DELIVERED: "green",
  CANCELLED: "red",
};

export const LoadHistoryList = () => {
  const { tableProps } = useTable({
    resource: "load-history",
    sorters: { initial: [{ field: "changedAt", order: "desc" }] },
    syncWithLocation: true,
  });

  return (
    <List canCreate={false}>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" width={60} />
        <Table.Column
          dataIndex="load"
          title="Load #"
          render={(l) => l?.loadNumber || "—"}
        />
        <Table.Column
          dataIndex="load"
          title="Route"
          render={(l) => l ? `${l.origin} → ${l.destination}` : "—"}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(v) => <Tag color={STATUS_COLORS[v]}>{v}</Tag>}
        />
        <Table.Column dataIndex="note" title="Note" render={(v) => v || "—"} />
        <Table.Column
          dataIndex="changedAt"
          title="Changed At"
          sorter
          render={(value) => <DateField value={value} format="MMM DD, YYYY HH:mm" />}
        />
        <Table.Column
          title="Actions"
          width={80}
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
