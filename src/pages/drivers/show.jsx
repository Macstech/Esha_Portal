import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Descriptions, Tag, Space } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

export const DriverShow = () => {
  const { queryResult } = useShow({ resource: "drivers" });
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
          <Descriptions.Item label="License Number">
            <Text code>{record.licenseNumber}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {record.phone || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="File Attachment" span={2}>
            {record.fileAttachment ? (
              <a href={record.fileAttachment} target="_blank" rel="noreferrer">
                {record.fileAttachment}
              </a>
            ) : (
              "—"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Assigned Vehicles" span={2}>
            <Space>
              {record.vehicles?.length > 0
                ? record.vehicles.map((dv) => (
                    <Tag key={dv.vehicleId} color="blue">
                      {dv.vehicle?.registrationNumber}
                    </Tag>
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
