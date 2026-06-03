import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag, Image } from "antd";

export const SlideList = () => {
  const { tableProps } = useTable({
    resource: "website-content/slides",
    sorters: { initial: [{ field: "order", order: "asc" }] },
    syncWithLocation: true,
  });

  return (
    <List title="Hero Slides">
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="order" title="Order" width={70} sorter />
        <Table.Column
          dataIndex="background"
          title="Background"
          width={100}
          render={(src) =>
            src ? (
              <Image src={src} width={60} height={40} style={{ objectFit: "cover", borderRadius: 4 }} />
            ) : (
              "—"
            )
          }
        />
        <Table.Column dataIndex="subtitle" title="Subtitle" width={150} ellipsis />
        <Table.Column dataIndex="title" title="Title" ellipsis />
        <Table.Column dataIndex="buttonText" title="Button" width={120} />
        <Table.Column
          dataIndex="isActive"
          title="Status"
          width={100}
          render={(v) => (
            <Tag color={v ? "green" : "default"}>{v ? "Active" : "Inactive"}</Tag>
          )}
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
