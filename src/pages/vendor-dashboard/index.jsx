import { useList, useUpdate, useGetIdentity } from "@refinedev/core";
import {
  Card, Col, Row, Statistic, Table, Tag, Typography, Button, Space,
  Modal, Descriptions, Timeline, Upload, message, Avatar, Badge,
  Tooltip, Select, Divider, Empty,
} from "antd";
import {
  TruckOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  UploadOutlined,
  UserOutlined,
  BellOutlined,
  CarOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useState, useMemo } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import axiosInstance from "../../utils/axios";

dayjs.extend(relativeTime);

const { Title, Text } = Typography;

const STATUS_COLORS = {
  PENDING:    "orange",
  IN_TRANSIT: "blue",
  DELIVERED:  "green",
  CANCELLED:  "red",
};

const STATUS_ICONS = {
  PENDING:    <ClockCircleOutlined />,
  IN_TRANSIT: <TruckOutlined />,
  DELIVERED:  <CheckCircleOutlined />,
  CANCELLED:  <CloseCircleOutlined />,
};

// ─── Detail Modal ─────────────────────────────────────────────────────────────
const LoadDetailModal = ({ load, open, onClose }) => {
  if (!load) return null;
  return (
    <Modal
      title={
        <Space>
          <TruckOutlined />
          Load #{load.loadNumber}
          <Tag color={STATUS_COLORS[load.status]}>{load.status}</Tag>
        </Space>
      }
      open={open}
      onCancel={onClose}
      footer={<Button onClick={onClose}>Close</Button>}
      width={700}
    >
      <Descriptions bordered column={2} size="small" style={{ marginBottom: 20 }}>
        <Descriptions.Item label="Load Number">{load.loadNumber}</Descriptions.Item>
        <Descriptions.Item label="Material">{load.material || "—"}</Descriptions.Item>
        <Descriptions.Item label={<><EnvironmentOutlined /> Origin</>}>{load.origin}</Descriptions.Item>
        <Descriptions.Item label={<><EnvironmentOutlined /> Destination</>}>{load.destination}</Descriptions.Item>
        <Descriptions.Item label="Quantity">
          {load.quantity ? `${load.quantity} ${load.unit || ""}`.trim() : "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Vehicle">
          {load.vehicle?.registrationNumber || "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Driver">{load.driver?.name || "—"}</Descriptions.Item>
        <Descriptions.Item label="Supervisor">{load.supervisor?.name || "—"}</Descriptions.Item>
        <Descriptions.Item label={<><CalendarOutlined /> Scheduled</>}>
          {load.scheduledAt ? dayjs(load.scheduledAt).format("MMM DD, YYYY HH:mm") : "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Started">
          {load.startedAt ? dayjs(load.startedAt).format("MMM DD, YYYY HH:mm") : "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Delivered">
          {load.deliveredAt ? dayjs(load.deliveredAt).format("MMM DD, YYYY HH:mm") : "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Notes" span={2}>{load.notes || "—"}</Descriptions.Item>
      </Descriptions>

      {load.history?.length > 0 && (
        <>
          <Text strong style={{ display: "block", marginBottom: 12 }}>Status History</Text>
          <Timeline
            items={load.history.map((h) => ({
              color: STATUS_COLORS[h.status],
              dot: STATUS_ICONS[h.status],
              children: (
                <Space direction="vertical" size={0}>
                  <Space>
                    <Tag color={STATUS_COLORS[h.status]}>{h.status}</Tag>
                    {h.note && <Text type="secondary">{h.note}</Text>}
                  </Space>
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {dayjs(h.changedAt).format("MMM DD, YYYY HH:mm")}
                  </Text>
                </Space>
              ),
            }))}
          />
        </>
      )}
    </Modal>
  );
};

// ─── Upload Docs Modal ────────────────────────────────────────────────────────
const UploadDocsModal = ({ load, open, onClose }) => {
  const [uploading, setUploading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const handleUpload = async () => {
    if (!fileList.length) return;
    setUploading(true);
    const formData = new FormData();
    fileList.forEach((f) => formData.append("file", f.originFileObj));
    try {
      await axiosInstance.post("/media", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("Documents uploaded successfully");
      setFileList([]);
      onClose();
    } catch {
      message.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal
      title={`Upload Documents — Load #${load?.loadNumber || ""}`}
      open={open}
      onCancel={() => { setFileList([]); onClose(); }}
      onOk={handleUpload}
      okText="Upload"
      okButtonProps={{ loading: uploading, disabled: !fileList.length }}
      confirmLoading={uploading}
    >
      <Upload.Dragger
        multiple
        fileList={fileList}
        beforeUpload={() => false}
        onChange={({ fileList: list }) => setFileList(list)}
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
      >
        <p className="ant-upload-drag-icon"><UploadOutlined /></p>
        <p className="ant-upload-text">Click or drag files here to upload</p>
        <p className="ant-upload-hint">Supports PDF, images, Word documents (max 5 MB each)</p>
      </Upload.Dragger>
    </Modal>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
export const VendorDashboard = () => {
  const { data: identity } = useGetIdentity();
  const { mutate: updateLoad, isLoading: updating } = useUpdate();

  const [detailLoad, setDetailLoad]     = useState(null);
  const [uploadLoad, setUploadLoad]     = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);

  // Fetch loads — vendors see all loads assigned to their vehicles/drivers
  const { data: loadsData, isLoading, refetch } = useList({
    resource: "loads",
    pagination: { pageSize: 100 },
    sorters: [{ field: "createdAt", order: "desc" }],
  });

  const allLoads = loadsData?.data || [];

  // Compute stats
  const stats = useMemo(() => ({
    total:     allLoads.length,
    pending:   allLoads.filter((l) => l.status === "PENDING").length,
    inTransit: allLoads.filter((l) => l.status === "IN_TRANSIT").length,
    delivered: allLoads.filter((l) => l.status === "DELIVERED").length,
    cancelled: allLoads.filter((l) => l.status === "CANCELLED").length,
  }), [allLoads]);

  // Filtered loads for table
  const tableData = useMemo(
    () => statusFilter ? allLoads.filter((l) => l.status === statusFilter) : allLoads,
    [allLoads, statusFilter]
  );

  // Recent activity (last 5 status changes from today)
  const recentActivity = useMemo(
    () => allLoads
      .filter((l) => dayjs(l.updatedAt).isAfter(dayjs().subtract(7, "day")))
      .slice(0, 6),
    [allLoads]
  );

  const changeStatus = (record, newStatus, note) => {
    updateLoad(
      {
        resource: "loads",
        id: record.id,
        values: { status: newStatus, notes: record.notes },
      },
      {
        onSuccess: () => {
          message.success(`Load #${record.loadNumber} → ${newStatus}`);
          refetch();
        },
        onError: () => message.error("Failed to update status"),
      }
    );
  };

  const columns = [
    {
      title: "Load #",
      dataIndex: "loadNumber",
      key: "loadNumber",
      render: (v, record) => (
        <Button type="link" style={{ padding: 0 }} onClick={() => setDetailLoad(record)}>
          {v}
        </Button>
      ),
    },
    {
      title: "Route",
      key: "route",
      render: (_, r) => (
        <Space direction="vertical" size={0}>
          <Text style={{ fontSize: 12 }}><EnvironmentOutlined style={{ color: "#52c41a" }} /> {r.origin}</Text>
          <Text style={{ fontSize: 12 }}><EnvironmentOutlined style={{ color: "#f5222d" }} /> {r.destination}</Text>
        </Space>
      ),
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
      render: (v) => v ? <><CarOutlined /> {v}</> : "—",
    },
    {
      title: "Scheduled",
      dataIndex: "scheduledAt",
      key: "scheduledAt",
      render: (v) => v ? dayjs(v).format("MMM DD, YY") : "—",
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
      title: "Actions",
      key: "actions",
      width: 200,
      render: (_, record) => (
        <Space size={4} wrap>
          {record.status === "PENDING" && (
            <>
              <Tooltip title="Accept — start this load">
                <Button
                  size="small"
                  type="primary"
                  onClick={() => changeStatus(record, "IN_TRANSIT", "Accepted by vendor")}
                  loading={updating}
                >
                  Accept
                </Button>
              </Tooltip>
              <Tooltip title="Reject this load">
                <Button
                  size="small"
                  danger
                  onClick={() => changeStatus(record, "CANCELLED", "Rejected by vendor")}
                  loading={updating}
                >
                  Reject
                </Button>
              </Tooltip>
            </>
          )}
          {record.status === "IN_TRANSIT" && (
            <Tooltip title="Mark as delivered">
              <Button
                size="small"
                type="primary"
                style={{ background: "#52c41a", borderColor: "#52c41a" }}
                onClick={() => changeStatus(record, "DELIVERED", "Delivered by vendor")}
                loading={updating}
              >
                Mark Delivered
              </Button>
            </Tooltip>
          )}
          <Tooltip title="View details">
            <Button size="small" icon={<EyeOutlined />} onClick={() => setDetailLoad(record)} />
          </Tooltip>
          <Tooltip title="Upload documents">
            <Button size="small" icon={<UploadOutlined />} onClick={() => setUploadLoad(record)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const user = identity || {};

  return (
    <div style={{ padding: "0 4px" }}>
      <Title level={3} style={{ marginBottom: 24 }}>
        Vendor Dashboard
      </Title>

      <Row gutter={[16, 16]}>
        {/* ── Left column: stats + loads ── */}
        <Col xs={24} xl={17}>

          {/* Stat Cards */}
          <Row gutter={[12, 12]} style={{ marginBottom: 20 }}>
            {[
              { label: "Total Loads",  value: stats.total,     color: "#1890ff", icon: <TruckOutlined />,        filter: null },
              { label: "Pending",      value: stats.pending,   color: "#fa8c16", icon: <ClockCircleOutlined />,  filter: "PENDING" },
              { label: "In Transit",   value: stats.inTransit, color: "#1890ff", icon: <TruckOutlined />,        filter: "IN_TRANSIT" },
              { label: "Delivered",    value: stats.delivered, color: "#52c41a", icon: <CheckCircleOutlined />,  filter: "DELIVERED" },
              { label: "Cancelled",    value: stats.cancelled, color: "#ff4d4f", icon: <CloseCircleOutlined />, filter: "CANCELLED" },
            ].map((s) => (
              <Col xs={12} sm={8} md={6} lg={4} key={s.label} style={{ flex: 1, minWidth: 120 }}>
                <Card
                  hoverable
                  bordered={false}
                  style={{
                    cursor: "pointer",
                    borderBottom: statusFilter === s.filter ? `3px solid ${s.color}` : "3px solid transparent",
                    transition: "border .2s",
                  }}
                  onClick={() => setStatusFilter(statusFilter === s.filter ? null : s.filter)}
                >
                  <Statistic
                    title={s.label}
                    value={s.value}
                    prefix={<span style={{ color: s.color }}>{s.icon}</span>}
                    valueStyle={{ color: s.color, fontSize: 22 }}
                  />
                </Card>
              </Col>
            ))}
          </Row>

          {/* Loads Table */}
          <Card
            bordered={false}
            title={
              <Space>
                <TruckOutlined />
                My Loads
                {statusFilter && (
                  <Tag
                    color={STATUS_COLORS[statusFilter]}
                    closable
                    onClose={() => setStatusFilter(null)}
                  >
                    {statusFilter}
                  </Tag>
                )}
              </Space>
            }
            extra={
              <Select
                placeholder="Filter by status"
                allowClear
                style={{ width: 160 }}
                value={statusFilter}
                onChange={setStatusFilter}
                options={["PENDING","IN_TRANSIT","DELIVERED","CANCELLED"].map((s) => ({
                  label: <Tag color={STATUS_COLORS[s]}>{s}</Tag>,
                  value: s,
                }))}
              />
            }
          >
            <Table
              rowKey="id"
              columns={columns}
              dataSource={tableData}
              loading={isLoading}
              size="small"
              pagination={{ pageSize: 8, showSizeChanger: false }}
              scroll={{ x: 700 }}
              locale={{ emptyText: <Empty description="No loads found" /> }}
            />
          </Card>
        </Col>

        {/* ── Right column: profile + activity ── */}
        <Col xs={24} xl={7}>

          {/* Profile Card */}
          <Card
            bordered={false}
            style={{ marginBottom: 16, textAlign: "center" }}
            title={<Space><UserOutlined /> My Profile</Space>}
          >
            <Avatar
              size={72}
              src={user.avatar}
              icon={<UserOutlined />}
              style={{ marginBottom: 12, background: "#1890ff" }}
            />
            <Title level={4} style={{ margin: "0 0 4px" }}>{user.name || "Vendor"}</Title>
            <Text type="secondary" style={{ fontSize: 13 }}>
              {(() => {
                try {
                  return JSON.parse(localStorage.getItem("user") || "{}").email;
                } catch { return ""; }
              })()}
            </Text>
            <Divider style={{ margin: "12px 0" }} />
            <Row gutter={8} justify="center">
              {[
                { label: "Pending",   value: stats.pending,   color: "#fa8c16" },
                { label: "Active",    value: stats.inTransit, color: "#1890ff" },
                { label: "Done",      value: stats.delivered, color: "#52c41a" },
              ].map((s) => (
                <Col key={s.label} span={8}>
                  <Text strong style={{ fontSize: 20, color: s.color, display: "block" }}>
                    {s.value}
                  </Text>
                  <Text type="secondary" style={{ fontSize: 11 }}>{s.label}</Text>
                </Col>
              ))}
            </Row>
          </Card>

          {/* Recent Activity */}
          <Card
            bordered={false}
            title={
              <Space>
                <Badge count={recentActivity.length} size="small">
                  <BellOutlined />
                </Badge>
                Recent Activity
              </Space>
            }
          >
            {recentActivity.length === 0 ? (
              <Empty description="No recent activity" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <Timeline
                style={{ marginTop: 8 }}
                items={recentActivity.map((load) => ({
                  color: STATUS_COLORS[load.status],
                  dot: STATUS_ICONS[load.status],
                  children: (
                    <Space direction="vertical" size={0}>
                      <Space wrap>
                        <Text strong style={{ fontSize: 13 }}>#{load.loadNumber}</Text>
                        <Tag color={STATUS_COLORS[load.status]} style={{ fontSize: 11 }}>
                          {load.status}
                        </Tag>
                      </Space>
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        {load.origin} → {load.destination}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 11 }}>
                        {dayjs(load.updatedAt).fromNow()}
                      </Text>
                    </Space>
                  ),
                }))}
              />
            )}
          </Card>
        </Col>
      </Row>

      {/* Modals */}
      <LoadDetailModal
        load={detailLoad}
        open={!!detailLoad}
        onClose={() => setDetailLoad(null)}
      />
      <UploadDocsModal
        load={uploadLoad}
        open={!!uploadLoad}
        onClose={() => setUploadLoad(null)}
      />
    </div>
  );
};

export default VendorDashboard;
