import { useCustom } from "@refinedev/core";
import { Card, Col, Row, Statistic, Table, Tag, Typography } from "antd";
import {
  TruckOutlined,
  UserOutlined,
  TeamOutlined,
  CarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title } = Typography;

const STATUS_COLORS = {
  PENDING: "orange",
  IN_TRANSIT: "blue",
  DELIVERED: "green",
  CANCELLED: "red",
};

export const SummaryReport = () => {
  const { data, isLoading } = useCustom({
    url: "/api/reports/summary",
    method: "get",
  });

  const summary = data?.data;

  const columns = [
    { title: "Load #", dataIndex: "loadNumber", key: "loadNumber" },
    { title: "Vehicle", dataIndex: ["vehicle", "registrationNumber"], key: "vehicle" },
    { title: "Driver", dataIndex: ["driver", "name"], key: "driver" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (v) => <Tag color={STATUS_COLORS[v]}>{v}</Tag>,
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (v) => dayjs(v).format("MMM DD, YYYY"),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ marginBottom: 24 }}>Summary Report</Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card loading={isLoading}>
            <Statistic title="Total Loads" value={summary?.totalLoads ?? 0} prefix={<TruckOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card loading={isLoading}>
            <Statistic title="Total Drivers" value={summary?.totalDrivers ?? 0} prefix={<UserOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card loading={isLoading}>
            <Statistic title="Total Vehicles" value={summary?.totalVehicles ?? 0} prefix={<CarOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card loading={isLoading}>
            <Statistic title="Active Supervisors" value={summary?.totalSupervisors ?? 0} prefix={<TeamOutlined />} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card title="Loads by Status" loading={isLoading}>
            {summary?.loadsByStatus?.map((s) => (
              <div key={s.status} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <Tag color={STATUS_COLORS[s.status]}>{s.status}</Tag>
                <strong>{s.count}</strong>
              </div>
            ))}
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Card title="Recent Loads" loading={isLoading}>
            <Table
              dataSource={summary?.recentLoads}
              columns={columns}
              rowKey="id"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
