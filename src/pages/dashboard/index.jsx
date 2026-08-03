import { useCustom } from "@refinedev/core";
import {
  Card, Col, Row, Statistic, Table, Tag, Typography, Spin, Progress,
} from "antd";
import {
  TruckOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  TeamOutlined,
  CarOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const STATUS_COLORS = {
  PENDING:    "#fa8c16",
  IN_TRANSIT: "#1890ff",
  DELIVERED:  "#52c41a",
  CANCELLED:  "#ff4d4f",
};

const STATUS_ICONS = {
  PENDING:    <ClockCircleOutlined />,
  IN_TRANSIT: <TruckOutlined />,
  DELIVERED:  <CheckCircleOutlined />,
  CANCELLED:  <CloseCircleOutlined />,
};

export const DashboardPage = () => {
  const { data, isLoading } = useCustom({
    url: "/reports/summary",
    method: "get",
  });

  const { data: driversData } = useCustom({
    url: "/reports/drivers",
    method: "get",
  });

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
        <Spin size="large" />
      </div>
    );
  }

  const stats   = data?.data  || {};
  const drivers = driversData?.data || [];

  const loadsByStatus = stats.loadsByStatus || [];

  const getStatusCount = (status) => {
    const entry = loadsByStatus.find((s) => s.status === status);
    return entry?.count ?? entry?._count?.id ?? 0;
  };

  const deliveryRate = stats.totalLoads
    ? Math.round((getStatusCount("DELIVERED") / stats.totalLoads) * 100)
    : 0;

  const pieData = loadsByStatus.map((s) => ({
    name: s.status,
    value: s.count ?? s._count?.id ?? 0,
    color: STATUS_COLORS[s.status],
  }));

  const topDrivers = [...drivers]
    .sort((a, b) => (b._count?.loads ?? 0) - (a._count?.loads ?? 0))
    .slice(0, 5);

  const recentLoads = stats.recentLoads || [];

  const recentColumns = [
    {
      title: "Load #",
      dataIndex: "loadNumber",
      key: "loadNumber",
      render: (v) => <Text strong>{v}</Text>,
    },
    {
      title: "Driver",
      dataIndex: ["driver", "name"],
      key: "driver",
      render: (v) => v || "—",
    },
    {
      title: "Vehicle",
      dataIndex: ["vehicle", "registrationNumber"],
      key: "vehicle",
      render: (v) => v || "—",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (v) => (
        <Tag icon={STATUS_ICONS[v]} color={STATUS_COLORS[v]}>{v}</Tag>
      ),
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (v) => dayjs(v).format("MMM DD, YYYY"),
    },
  ];

  const driverColumns = [
    { title: "Driver", dataIndex: "name", key: "name" },
    {
      title: "Total Loads",
      dataIndex: ["_count", "loads"],
      key: "loads",
      render: (v) => (
        <Progress
          percent={Math.min(100, ((v || 0) / Math.max(topDrivers[0]?._count?.loads || 1, 1)) * 100)}
          size="small"
          format={() => v || 0}
          strokeColor="#1890ff"
        />
      ),
    },
    {
      title: "Delivered",
      key: "delivered",
      render: (_, r) => {
        const done = (r.loads || []).filter((l) => l.status === "DELIVERED").length;
        return <Tag color="green">{done}</Tag>;
      },
    },
  ];

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>
        Operational Dashboard
      </Title>

      {/* KPI Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { title: "Total Loads",    value: stats.totalLoads    ?? 0, icon: <TruckOutlined />,             color: "#1890ff" },
          { title: "Active Drivers", value: stats.totalDrivers  ?? 0, icon: <TeamOutlined />,              color: "#722ed1" },
          { title: "Vehicles",       value: stats.totalVehicles ?? 0, icon: <CarOutlined />,               color: "#13c2c2" },
          { title: "Supervisors",    value: stats.totalSupervisors ?? 0, icon: <SafetyCertificateOutlined />, color: "#fa8c16" },
          { title: "Delivery Rate",  value: `${deliveryRate}%`,        icon: <CheckCircleOutlined />,       color: "#52c41a" },
        ].map((card) => (
          <Col xs={24} sm={12} md={8} lg={6} xl={4} key={card.title} style={{ flex: 1, minWidth: 140 }}>
            <Card bordered={false} hoverable>
              <Statistic
                title={card.title}
                value={card.value}
                prefix={<span style={{ color: card.color }}>{card.icon}</span>}
                valueStyle={{ color: card.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {/* Pie */}
        <Col xs={24} lg={8}>
          <Card title="Load Status Breakdown" bordered={false} style={{ height: "100%" }}>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85}>
                    {pieData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ textAlign: "center", padding: 40, color: "#999" }}>No load data yet</div>
            )}
          </Card>
        </Col>

        {/* Per-status mini cards */}
        <Col xs={24} lg={4}>
          <Row gutter={[0, 12]}>
            {["PENDING", "IN_TRANSIT", "DELIVERED", "CANCELLED"].map((s) => (
              <Col span={24} key={s}>
                <Card bordered={false} size="small">
                  <Statistic
                    title={s.replace("_", " ")}
                    value={getStatusCount(s)}
                    prefix={<span style={{ color: STATUS_COLORS[s] }}>{STATUS_ICONS[s]}</span>}
                    valueStyle={{ color: STATUS_COLORS[s], fontSize: 20 }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        {/* Drivers bar */}
        <Col xs={24} lg={12}>
          <Card title="Top Drivers by Load Count" bordered={false} style={{ height: "100%" }}>
            {topDrivers.length > 0 ? (
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={topDrivers} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis type="category" dataKey="name" width={90} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="_count.loads" name="Loads" fill="#1890ff" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ textAlign: "center", padding: 40, color: "#999" }}>No driver data yet</div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Recent Loads */}
      <Card title="Recent Loads" bordered={false} style={{ marginBottom: 16 }}>
        <Table
          dataSource={recentLoads}
          columns={recentColumns}
          pagination={false}
          rowKey="id"
          size="small"
          locale={{ emptyText: "No loads yet" }}
        />
      </Card>

      {/* Driver Performance */}
      {topDrivers.length > 0 && (
        <Card title="Driver Performance" bordered={false}>
          <Table
            dataSource={topDrivers}
            columns={driverColumns}
            pagination={false}
            rowKey="id"
            size="small"
          />
        </Card>
      )}
    </div>
  );
};
