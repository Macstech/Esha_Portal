import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Select, DatePicker, Input, Row, Col } from "antd";
import dayjs from "dayjs";

export const SupervisorAssignmentEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({ resource: "supervisor-assignments" });
  const record = queryResult?.data?.data;

  const { selectProps: supervisorSelectProps } = useSelect({
    resource: "supervisors",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: record?.supervisorId,
  });

  const { selectProps: driverSelectProps } = useSelect({
    resource: "drivers",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: record?.driverId,
  });

  const { selectProps: vehicleSelectProps } = useSelect({
    resource: "vehicles",
    optionLabel: "registrationNumber",
    optionValue: "id",
    defaultValue: record?.vehicleId,
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form
        {...formProps}
        layout="vertical"
        initialValues={{
          ...formProps.initialValues,
          startDate: record?.startDate ? dayjs(record.startDate) : undefined,
          endDate: record?.endDate ? dayjs(record.endDate) : undefined,
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Supervisor" name="supervisorId" rules={[{ required: true, message: "Supervisor is required" }]}>
              <Select {...supervisorSelectProps} />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Driver" name="driverId" rules={[{ required: true, message: "Driver is required" }]}>
              <Select {...driverSelectProps} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item label="Vehicle" name="vehicleId">
              <Select allowClear {...vehicleSelectProps} />
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
              <DatePicker style={{ width: "100%" }} />
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
