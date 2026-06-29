import { Create, useForm, useSelect } from "@refinedev/antd";
import { useGetIdentity } from "@refinedev/core";
import { Form, Input, InputNumber, Select, DatePicker, Row, Col, Alert } from "antd";
import { TruckOutlined } from "@ant-design/icons";

const STATUS_OPTIONS = ["PENDING", "ASSIGNED", "IN_TRANSIT", "DELIVERED", "CANCELLED"].map((s) => ({
  label: s.replace("_", " "),
  value: s,
}));

export const LoadCreate = () => {
  const { formProps, saveButtonProps } = useForm({ resource: "loads" });
  const { data: identity } = useGetIdentity();
  const role = identity?.role;
  const isVendor = role === "VENDOR";
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";

  const { selectProps: vehicleSelectProps } = useSelect({
    resource: "vehicles",
    optionLabel: "registrationNumber",
    optionValue: "id",
    queryOptions: { enabled: !isVendor },
  });

  const { selectProps: driverSelectProps } = useSelect({
    resource: "drivers",
    optionLabel: "name",
    optionValue: "id",
    queryOptions: { enabled: !isVendor },
  });

  const { selectProps: supervisorSelectProps } = useSelect({
    resource: "supervisors",
    optionLabel: "name",
    optionValue: "id",
    queryOptions: { enabled: isAdmin },
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      {isVendor && (
        <Alert
          type="info"
          showIcon
          icon={<TruckOutlined />}
          message="Create Load Order"
          description="Submit your load request. A supervisor will review and assign a driver and vehicle."
          style={{ marginBottom: 24 }}
        />
      )}

      <Form {...formProps} layout="vertical">
        {/* ── Core details (all roles) ── */}
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Load Number"
              name="loadNumber"
              rules={[{ required: true, message: "Load number is required" }]}
            >
              <Input placeholder="e.g. LD-2024-001" />
            </Form.Item>
          </Col>
          {isAdmin && (
            <Col xs={24} md={12}>
              <Form.Item label="Status" name="status" initialValue="PENDING">
                <Select options={STATUS_OPTIONS} />
              </Form.Item>
            </Col>
          )}
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Origin"
              name="origin"
              rules={[{ required: true, message: "Origin is required" }]}
            >
              <Input placeholder="Enter origin location" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Destination"
              name="destination"
              rules={[{ required: true, message: "Destination is required" }]}
            >
              <Input placeholder="Enter destination location" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Material" name="material">
              <Input placeholder="e.g. Sand, Coal, Waste" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Quantity" name="quantity">
              <InputNumber min={0} step={0.1} style={{ width: "100%" }} placeholder="e.g. 10" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Unit" name="unit">
              <Input placeholder="e.g. tonnes, litres" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Scheduled At" name="scheduledAt">
              <DatePicker showTime style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        {/* ── Assignment fields (Admin only) ── */}
        {isAdmin && (
          <>
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Vehicle" name="vehicleId">
                  <Select placeholder="Select vehicle (optional)" allowClear {...vehicleSelectProps} />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item label="Driver" name="driverId">
                  <Select placeholder="Select driver (optional)" allowClear {...driverSelectProps} />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item label="Supervisor" name="supervisorId">
                  <Select placeholder="Select supervisor (optional)" allowClear {...supervisorSelectProps} />
                </Form.Item>
              </Col>
            </Row>
          </>
        )}

        <Form.Item label="Notes" name="notes">
          <Input.TextArea rows={3} placeholder="Optional notes" />
        </Form.Item>
      </Form>
    </Create>
  );
};
