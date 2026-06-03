import { Edit, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, DatePicker } from "antd";
import dayjs from "dayjs";

export const LoadEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm({ resource: "loads" });
  const record = queryResult?.data?.data;

  const { selectProps: vehicleSelectProps } = useSelect({
    resource: "vehicles",
    optionLabel: "registrationNumber",
    optionValue: "id",
    defaultValue: record?.vehicleId,
  });

  const { selectProps: driverSelectProps } = useSelect({
    resource: "drivers",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: record?.driverId,
  });

  const { selectProps: supervisorSelectProps } = useSelect({
    resource: "supervisors",
    optionLabel: "name",
    optionValue: "id",
    defaultValue: record?.supervisorId,
  });

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
        <Form.Item label="Load Number" name="loadNumber" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Origin" name="origin" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Destination" name="destination" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Vehicle" name="vehicleId" rules={[{ required: true }]}>
          <Select {...vehicleSelectProps} />
        </Form.Item>
        <Form.Item label="Driver" name="driverId" rules={[{ required: true }]}>
          <Select {...driverSelectProps} />
        </Form.Item>
        <Form.Item label="Supervisor" name="supervisorId">
          <Select allowClear {...supervisorSelectProps} />
        </Form.Item>
        <Form.Item label="Material" name="material">
          <Input />
        </Form.Item>
        <Form.Item label="Quantity" name="quantity">
          <InputNumber min={0} step={0.1} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Unit" name="unit">
          <Input />
        </Form.Item>
        <Form.Item label="Status" name="status">
          <Select
            options={["PENDING", "IN_TRANSIT", "DELIVERED", "CANCELLED"].map((s) => ({ label: s, value: s }))}
          />
        </Form.Item>
        <Form.Item label="Scheduled At" name="scheduledAt">
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Started At" name="startedAt">
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Delivered At" name="deliveredAt">
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Notes" name="notes">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
