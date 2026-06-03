import { useCustom } from "@refinedev/core";
import { Table, Tag, Typography } from "antd";

const { Title } = Typography;

export const VehiclesReport = () => {
  const { data, isLoading } = useCustom({
    url: "/api/reports/vehicles",
    method: "get",
  });

  const vehicles = data?.data ?? [];

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 60 },
    { title: "Reg. Number", dataIndex: "registrationNumber", key: "registrationNumber" },
    { title: "Make", dataIndex: "make", key: "make", render: (v) => v || "—" },
    { title: "Model", dataIndex: "model", key: "model", render: (v) => v || "—" },
    { title: "Year", dataIndex: "year", key: "year", render: (v) => v || "—" },
    {
      title: "Type",
      dataIndex: "vehicleType",
      key: "vehicleType",
      render: (t) => t?.name || "—",
    },
    {
      title: "Assigned Drivers",
      dataIndex: "drivers",
      key: "drivers",
      render: (drivers) =>
        drivers?.length > 0
          ? drivers.map((dv) => (
              <Tag key={dv.driverId} color="blue">{dv.driver?.name}</Tag>
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
      <Title level={3} style={{ marginBottom: 24 }}>Vehicle Report</Title>
      <Table
        dataSource={vehicles}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 20 }}
      />
    </div>
  );
};
