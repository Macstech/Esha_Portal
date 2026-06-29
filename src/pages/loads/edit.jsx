import { Edit, useForm, useSelect } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";
import { Form, Input, InputNumber, Select, DatePicker, Row, Col, Alert, Descriptions, Tag } from "antd";
import { CheckCircleOutlined, TruckOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const STATUS_OPTIONS = ["PENDING", "ASSIGNED", "IN_TRANSIT", "DELIVERED", "CANCELLED"].map((s) => ({
  label: s.replace("_", " "),
  value: s,
}));

const STATUS_COLORS = {
  PENDING: "orange",
  ASSIGNED: "blue",
  IN_TRANSIT: "cyan",
  DELIVERED: "green",
  CANCELLED: "red",
};

export const LoadEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({ resource: "loads" });
  const record = queryResult?.data?.data;
  const { data: identity } = useGetIdentity();
  const role = identity?.role;
  const isSupervisor = role === "SUPERVISOR";
  const isVendor = role === "VENDOR";
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";

  const { selectProps: vehicleSelectProps } = useSelect({
    resource: "vehicles",
    optionLabel: "registrationNumber",
    optionValue: "id",
    defaultValue: record?.vehicleId,
    queryOptions: { enabled: !isVendor },
  });

  const { selectProps: driverSelectProps } = useSelect({
    resource: "drivers",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: record?.driverId,
    queryOptions: { enabled: !isVendor },
  });

  const { selectProps: supervisorSelectProps } = useSelect({
    resource: "supervisors",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: record?.supervisorId,
    queryOptions: { enabled: !isVendor },
  });

  // ── Supervisor view: Accept & Assign ──────────────────────────────────────
  if (isSupervisor) {
    return (
      <Edit saveButtonProps={saveButtonProps} title="Accept & Assign Load">
        <Alert
          type="info"
          showIcon
          icon={<CheckCircleOutlined />}
          message="Accept this load order by assigning a driver and vehicle, then updating the status."
          style={{ marginBottom: 24 }}
        />

        {record && (
          <Descriptions bordered size="small" column={2} style={{ marginBottom: 24 }}>
            <Descriptions.Item label="Load #">{record.loadNumber}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={STATUS_COLORS[record.status]}>{record.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Origin">{record.origin}</Descriptions.Item>
            <Descriptions.Item label="Destination">{record.destination}</Descriptions.Item>
            <Descriptions.Item label="Material">{record.material || "—"}</Descriptions.Item>
            <Descriptions.Item label="Quantity">
              {record.quantity ? `${record.quantity} ${record.unit || ""}`.trim() : "—"}
            </Descriptions.Item>
          </Descriptions>
        )}

        <Form
          {...formProps}
          layout="vertical"
          initialValues={{
            ...formProps.initialValues,
            scheduledAt: record?.scheduledAt ? dayjs(record.scheduledAt) : undefined,
            startedAt: record?.startedAt ? dayjs(record.startedAt) : undefined,
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Driver"
                name="driverId"
                rules={[{ required: true, message: "Assign a driver to accept this load" }]}
              >
                <Select placeholder="Select driver" {...driverSelectProps} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Vehicle"
                name="vehicleId"
                rules={[{ required: true, message: "Assign a vehicle to accept this load" }]}
              >
                <Select placeholder="Select vehicle" {...vehicleSelectProps} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Supervisor" name="supervisorId">
                <Select placeholder="Assign supervisor (optional)" allowClear {...supervisorSelectProps} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Status" name="status">
                <Select
                  options={[
                    { label: "ASSIGNED", value: "ASSIGNED" },
                    { label: "IN TRANSIT", value: "IN_TRANSIT" },
                    { label: "CANCELLED", value: "CANCELLED" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Scheduled At" name="scheduledAt">
                <DatePicker showTime style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Started At" name="startedAt">
                <DatePicker showTime style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Notes" name="notes">
            <Input.TextArea rows={3} placeholder="Assignment notes" />
          </Form.Item>
        </Form>
      </Edit>
    );
  }

  // ── Vendor view: limited edit (material, notes, schedule) ─────────────────
  if (isVendor) {
    return (
      <Edit saveButtonProps={saveButtonProps} title="Edit Load Order">
        <Alert
          type="warning"
          showIcon
          icon={<TruckOutlined />}
          message="You can update the material, quantity, schedule, and notes before assignment."
          style={{ marginBottom: 24 }}
        />

        <Form
          {...formProps}
          layout="vertical"
          initialValues={{
            ...formProps.initialValues,
            scheduledAt: record?.scheduledAt ? dayjs(record.scheduledAt) : undefined,
          }}
        >
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Origin" name="origin" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Destination" name="destination" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Material" name="material">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Quantity" name="quantity">
                <InputNumber min={0} step={0.1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label="Unit" name="unit">
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label="Scheduled At" name="scheduledAt">
                <DatePicker showTime style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Notes" name="notes">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Edit>
    );
  }

  // ── Admin / default: full form ────────────────────────────────────────────
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          ...formProps.initialValues,
          scheduledAt: record?.scheduledAt ? dayjs(record.scheduledAt) : undefined,
          startedAt: record?.startedAt ? dayjs(record.startedAt) : undefined,
          deliveredAt: record?.deliveredAt ? dayjs(record.deliveredAt) : undefined,
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Load Number" name="loadNumber" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Status" name="status">
              <Select options={STATUS_OPTIONS} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Origin" name="origin" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Destination" name="destination" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Vehicle" name="vehicleId">
              <Select placeholder="Select vehicle" allowClear {...vehicleSelectProps} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Driver" name="driverId">
              <Select placeholder="Select driver" allowClear {...driverSelectProps} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Supervisor" name="supervisorId">
              <Select allowClear {...supervisorSelectProps} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Material" name="material">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Quantity" name="quantity">
              <InputNumber min={0} step={0.1} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Unit" name="unit">
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Scheduled At" name="scheduledAt">
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Started At" name="startedAt">
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Delivered At" name="deliveredAt">
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Notes" name="notes">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
