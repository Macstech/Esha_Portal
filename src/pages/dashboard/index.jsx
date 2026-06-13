import { useCustom } from "@refinedev/core";
import { Card, Col, Row, Statistic, Table, Tag, Typography, Spin } from "antd";
import {
  FileTextOutlined,
  FolderOutlined,
  PictureOutlined,
  UserOutlined,
  CheckCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

const { Title } = Typography;

export const DashboardPage = () => {
  const { data, isLoading } = useCustom({
    url: "/dashboard/stats",
    method: "get",
  });

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
        <Spin size="large" />
      </div>
    );
  }

  const stats = data?.data;

  const statCards = [
    {
      title: "Total Posts",
      value: stats?.totals?.posts || 0,
      icon: <FileTextOutlined />,
      color: "#1890ff",
    },
    {
      title: "Published",
      value: stats?.totals?.published || 0,
      icon: <CheckCircleOutlined />,
      color: "#52c41a",
    },
    {
      title: "Drafts",
      value: stats?.totals?.drafts || 0,
      icon: <EditOutlined />,
      color: "#faad14",
    },
    {
      title: "Categories",
      value: stats?.totals?.categories || 0,
      icon: <FolderOutlined />,
      color: "#722ed1",
    },
    {
      title: "Media Files",
      value: stats?.totals?.media || 0,
      icon: <PictureOutlined />,
      color: "#eb2f96",
    },
    {
      title: "Users",
      value: stats?.totals?.users || 0,
      icon: <UserOutlined />,
      color: "#13c2c2",
    },
  ];

  const recentPostColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
    },
    {
      title: "Author",
      dataIndex: ["author", "name"],
      key: "author",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colorMap = {
          PUBLISHED: "green",
          DRAFT: "orange",
          ARCHIVED: "default",
        };
        return <Tag color={colorMap[status]}>{status}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => dayjs(date).format("MMM DD, YYYY"),
    },
  ];

  const topAuthorColumns = [
    {
      title: "Author",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        const colorMap = {
          ADMIN: "red",
          VENDOR: "blue",
          DRIVER: "purple",
          SUPERVISOR: "green",
        };
        return <Tag color={colorMap[role]}>{role.replace("_", " ")}</Tag>;
      },
    },
    {
      title: "Posts",
      dataIndex: ["_count", "posts"],
      key: "posts",
    },
  ];

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>
        Dashboard
      </Title>

      {/* Stat Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {statCards.map((stat) => (
          <Col xs={24} sm={12} md={8} lg={4} key={stat.title}>
            <Card bordered={false} hoverable>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={
                  <span style={{ color: stat.color }}>{stat.icon}</span>
                }
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card title="Posts Over Time" bordered={false}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats?.postsByMonth || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickFormatter={(val) => dayjs(val).format("MMM YY")}
                />
                <YAxis allowDecimals={false} />
                <Tooltip
                  labelFormatter={(val) => dayjs(val).format("MMMM YYYY")}
                />
                <Bar dataKey="count" fill="#1890ff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Top Authors" bordered={false}>
            <Table
              dataSource={stats?.topAuthors || []}
              columns={topAuthorColumns}
              pagination={false}
              rowKey="id"
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Posts */}
      <Card title="Recent Posts" bordered={false}>
        <Table
          dataSource={stats?.recentPosts || []}
          columns={recentPostColumns}
          pagination={false}
          rowKey="id"
          size="small"
        />
      </Card>
    </div>
  );
};
