import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Descriptions, Tag, Space } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

export const SupervisorShow = () => {
  const { queryResult } = useShow({ resource: "supervisors" });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      {record && (
        <Descriptions bordered column={2}>
          <Descriptions.Item label="ID">{record.id}</Descriptions.Item>
          <Descriptions.Item label="Name">
            <Text strong>{record.name}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Employee ID">
            <Text code>{record.employeeId}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={record.isActive ? "green" : "red"}>
              {record.isActive ? "Active" : "Inactive"}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Phone">{record.phone || "—"}</Descriptions.Item>
          <Descriptions.Item label="Email">{record.email || "—"}</Descriptions.Item>
          <Descriptions.Item label="Zone">{record.zone || "—"}</Descriptions.Item>
          <Descriptions.Item label="Assignments">
            {record.assignments?.length || 0} assignment(s)
          </Descriptions.Item>
          <Descriptions.Item label="Assigned Drivers" span={2}>
            <Space wrap>
              {record.assignments?.length > 0
                ? record.assignments.map((a) => (
                    <Tag key={a.id} color="blue">{a.driver?.name}</Tag>
                  ))
                : "—"}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Created">
            {dayjs(record.createdAt).format("MMMM DD, YYYY HH:mm")}
          </Descriptions.Item>
          <Descriptions.Item label="Updated">
            {dayjs(record.updatedAt).format("MMMM DD, YYYY HH:mm")}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Show>
  );
};
