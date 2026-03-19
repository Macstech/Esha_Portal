import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
  TagField,
  DateField,
  FilterDropdown,
} from "@refinedev/antd";
import { Table, Space, Tag, Input, Select } from "antd";

export const PostList = () => {
  const { tableProps, searchFormProps } = useTable({
    resource: "posts",
    sorters: { initial: [{ field: "createdAt", order: "desc" }] },
    syncWithLocation: true,
  });

  const statusColorMap = {
    PUBLISHED: "green",
    DRAFT: "orange",
    ARCHIVED: "default",
  };

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" width={60} sorter />
        <Table.Column
          dataIndex="title"
          title="Title"
          ellipsis
          sorter
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search title..." />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex={["author", "name"]}
          title="Author"
          width={150}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          width={120}
          render={(status) => (
            <Tag color={statusColorMap[status]}>{status}</Tag>
          )}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 140 }}
                placeholder="Filter status"
                options={[
                  { label: "Published", value: "PUBLISHED" },
                  { label: "Draft", value: "DRAFT" },
                  { label: "Archived", value: "ARCHIVED" },
                ]}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="categories"
          title="Categories"
          render={(categories) =>
            categories?.map((cat) => (
              <TagField key={cat.id} value={cat.name} color="blue" />
            ))
          }
        />
        <Table.Column
          dataIndex="viewCount"
          title="Views"
          width={80}
          sorter
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
