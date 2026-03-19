import {
  List,
  useTable,
  EditButton,
  DeleteButton,
  DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const CategoryList = () => {
  const { tableProps } = useTable({
    resource: "categories",
    sorters: { initial: [{ field: "name", order: "asc" }] },
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" width={60} />
        <Table.Column dataIndex="name" title="Name" sorter />
        <Table.Column dataIndex="slug" title="Slug" />
        <Table.Column dataIndex="description" title="Description" ellipsis />
        <Table.Column
          dataIndex={["_count", "posts"]}
          title="Posts"
          width={80}
        />
        <Table.Column
          dataIndex="createdAt"
          title="Created"
          width={130}
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
