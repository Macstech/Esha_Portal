import {
  List,
  useTable,
  EditButton,
  DeleteButton,
  DateField,
} from "@refinedev/antd";
import { Table, Space, Tag, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const UserList = () => {
  const { tableProps } = useTable({
    resource: "users",
    sorters: { initial: [{ field: "createdAt", order: "desc" }] },
    syncWithLocation: true,
  });

  const roleColorMap = {
    SUPER_ADMIN: "red",
    EDITOR: "blue",
    VIEWER: "default",
  };

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          title="User"
          render={(_, record) => (
            <Space>
              <Avatar
                src={record.avatar}
                icon={<UserOutlined />}
                style={{ backgroundColor: "#1890ff" }}
              />
              <span>{record.name}</span>
            </Space>
          )}
        />
        <Table.Column dataIndex="email" title="Email" />
        <Table.Column
          dataIndex="role"
          title="Role"
          width={130}
          render={(role) => (
            <Tag color={roleColorMap[role]}>{role.replace("_", " ")}</Tag>
          )}
        />
        <Table.Column
          dataIndex={["_count", "posts"]}
          title="Posts"
          width={80}
        />
        <Table.Column
          dataIndex="createdAt"
          title="Joined"
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
