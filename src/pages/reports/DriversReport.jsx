import { useCustom } from "@refinedev/core";
import { Table, Tag, Typography } from "antd";

const { Title } = Typography;

export const DriversReport = () => {
  const { data, isLoading } = useCustom({
    url: "/api/reports/drivers",
    method: "get",
  });

  const drivers = data?.data ?? [];

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 60 },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "License #", dataIndex: "licenseNumber", key: "licenseNumber" },
    { title: "Phone", dataIndex: "phone", key: "phone", render: (v) => v || "—" },
    {
      title: "Assigned Vehicles",
      dataIndex: "vehicles",
      key: "vehicles",
      render: (vehicles) =>
        vehicles?.length > 0
          ? vehicles.map((dv) => (
              <Tag key={dv.vehicleId} color="blue">{dv.vehicle?.registrationNumber}</Tag>
            ))
          : "—",
    },
    {
      title: "Total Loads",
      dataIndex: "_count",
      key: "loads",
      render: (c) => c?.loads ?? 0,
      sorter: (a, b) => (a._count?.loads ?? 0) - (b._count?.loads ?? 0),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ marginBottom: 24 }}>Driver Report</Title>
      <Table
        dataSource={drivers}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 20 }}
      />
    </div>
  );
};
