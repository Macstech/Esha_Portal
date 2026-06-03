import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, DatePicker } from "antd";

export const LoadCreate = () => {
  const { formProps, saveButtonProps } = useForm({ resource: "loads" });

  const { selectProps: vehicleSelectProps } = useSelect({
    resource: "vehicles",
    optionLabel: "registrationNumber",
    optionValue: "id",
  });

  const { selectProps: driverSelectProps } = useSelect({
    resource: "drivers",
    optionLabel: "name",
    optionValue: "id",
  });

  const { selectProps: supervisorSelectProps } = useSelect({
    resource: "supervisors",
    optionLabel: "name",
    optionValue: "id",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Load Number" name="loadNumber" rules={[{ required: true, message: "Load number is required" }]}>
          <Input placeholder="e.g. LD-2024-001" />
        </Form.Item>
        <Form.Item label="Origin" name="origin" rules={[{ required: true, message: "Origin is required" }]}>
          <Input placeholder="Enter origin location" />
        </Form.Item>
        <Form.Item label="Destination" name="destination" rules={[{ required: true, message: "Destination is required" }]}>
          <Input placeholder="Enter destination location" />
        </Form.Item>
        <Form.Item label="Vehicle" name="vehicleId" rules={[{ required: true, message: "Vehicle is required" }]}>
          <Select placeholder="Select vehicle" {...vehicleSelectProps} />
        </Form.Item>
        <Form.Item label="Driver" name="driverId" rules={[{ required: true, message: "Driver is required" }]}>
          <Select placeholder="Select driver" {...driverSelectProps} />
        </Form.Item>
        <Form.Item label="Supervisor" name="supervisorId">
          <Select placeholder="Select supervisor (optional)" allowClear {...supervisorSelectProps} />
        </Form.Item>
        <Form.Item label="Material" name="material">
          <Input placeholder="e.g. Sand, Coal, Waste" />
        </Form.Item>
        <Form.Item label="Quantity" name="quantity">
          <InputNumber min={0} step={0.1} style={{ width: "100%" }} placeholder="e.g. 10" />
        </Form.Item>
        <Form.Item label="Unit" name="unit">
          <Input placeholder="e.g. tonnes, litres" />
        </Form.Item>
        <Form.Item label="Status" name="status" initialValue="PENDING">
          <Select
            options={["PENDING", "IN_TRANSIT", "DELIVERED", "CANCELLED"].map((s) => ({ label: s, value: s }))}
          />
        </Form.Item>
        <Form.Item label="Scheduled At" name="scheduledAt">
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Notes" name="notes">
          <Input.TextArea rows={3} placeholder="Optional notes" />
        </Form.Item>
      </Form>
    </Create>
  );
};
