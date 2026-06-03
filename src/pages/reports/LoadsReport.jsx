import { useCustom } from "@refinedev/core";
import { Table, Tag, Typography, Space, Select, DatePicker, Button } from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const { Title } = Typography;
const { RangePicker } = DatePicker;

const STATUS_COLORS = {
  PENDING: "orange",
  IN_TRANSIT: "blue",
  DELIVERED: "green",
  CANCELLED: "red",
};

export const LoadsReport = () => {
  const [status, setStatus] = useState(undefined);
  const [dateRange, setDateRange] = useState(null);

  const queryParams = {};
  if (status) queryParams.status = status;
  if (dateRange?.[0]) queryParams.from = dateRange[0].toISOString();
  if (dateRange?.[1]) queryParams.to = dateRange[1].toISOString();

  const { data, isLoading, refetch } = useCustom({
    url: "/api/reports/loads",
    method: "get",
    config: { query: queryParams },
  });

  const loads = data?.data ?? [];

  const columns = [
    { title: "Load #", dataIndex: "loadNumber", key: "loadNumber" },
    { title: "Origin", dataIndex: "origin", key: "origin" },
    { title: "Destination", dataIndex: "destination", key: "destination" },
    { title: "Vehicle", dataIndex: ["vehicle", "registrationNumber"], key: "vehicle", render: (v) => v || "—" },
    { title: "Driver", dataIndex: ["driver", "name"], key: "driver", render: (v) => v || "—" },
    { title: "Supervisor", dataIndex: ["supervisor", "name"], key: "supervisor", render: (v) => v || "—" },
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
      <Title level={3} style={{ marginBottom: 24 }}>Load Report</Title>

      <Space style={{ marginBottom: 16 }} wrap>
        <Select
          placeholder="Filter by status"
          allowClear
          style={{ width: 180 }}
          value={status}
          onChange={setStatus}
          options={["PENDING", "IN_TRANSIT", "DELIVERED", "CANCELLED"].map((s) => ({ label: s, value: s }))}
        />
        <RangePicker value={dateRange} onChange={setDateRange} />
        <Button type="primary" onClick={refetch}>Apply</Button>
        <Button onClick={() => { setStatus(undefined); setDateRange(null); }}>Clear</Button>
      </Space>

      <Table
        dataSource={loads}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 20 }}
      />
    </div>
  );
};
