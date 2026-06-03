import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Descriptions, Tag, Space, Image } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

export const VehicleShow = () => {
  const { queryResult } = useShow({ resource: "vehicles" });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      {record && (
        <Descriptions bordered column={2}>
          <Descriptions.Item label="ID">{record.id}</Descriptions.Item>
          <Descriptions.Item label="Registration Number">
            <Text strong>{record.registrationNumber}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="Make">
            {record.make || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Model">
            {record.model || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Year">
            {record.year || "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Image">
            {record.image ? (
              <Image width={120} src={record.image} />
            ) : (
              "—"
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Assigned Drivers" span={2}>
            <Space>
              {record.drivers?.length > 0
                ? record.drivers.map((dv) => (
                    <Tag key={dv.driverId} color="blue">
                      {dv.driver?.name}
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
