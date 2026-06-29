import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Select, DatePicker, Input, Row, Col } from "antd";

export const SupervisorAssignmentCreate = () => {
  const { formProps, saveButtonProps } = useForm({ resource: "supervisor-assignments" });

  const { selectProps: supervisorSelectProps } = useSelect({
    resource: "supervisors",
    optionLabel: "name",
    optionValue: "id",
  });

  const { selectProps: driverSelectProps } = useSelect({
    resource: "drivers",
    optionLabel: "name",
    optionValue: "id",
  });

  const { selectProps: vehicleSelectProps } = useSelect({
    resource: "vehicles",
    optionLabel: "registrationNumber",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Supervisor" name="supervisorId" rules={[{ required: true, message: "Supervisor is required" }]}>
              <Select placeholder="Select supervisor" {...supervisorSelectProps} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Driver" name="driverId" rules={[{ required: true, message: "Driver is required" }]}>
              <Select placeholder="Select driver" {...driverSelectProps} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Vehicle" name="vehicleId">
              <Select placeholder="Select vehicle (optional)" allowClear {...vehicleSelectProps} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Start Date" name="startDate" rules={[{ required: true, message: "Start date is required" }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="End Date" name="endDate">
              <DatePicker style={{ width: "100%" }} placeholder="Leave empty if ongoing" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Notes" name="notes">
          <Input.TextArea rows={3} placeholder="Optional notes" />
        </Form.Item>
      </Form>
    </Create>
  );
};
