import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Descriptions, Tag, Timeline } from "antd";
import dayjs from "dayjs";

const { Text } = Typography;

const STATUS_COLORS = {
  PENDING: "orange",
  IN_TRANSIT: "blue",
  DELIVERED: "green",
  CANCELLED: "red",
};

export const LoadShow = () => {
  const { queryResult } = useShow({ resource: "loads" });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      {record && (
        <>
          <Descriptions bordered column={2} style={{ marginBottom: 24 }}>
            <Descriptions.Item label="ID">{record.id}</Descriptions.Item>
            <Descriptions.Item label="Load Number">
              <Text strong>{record.loadNumber}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={STATUS_COLORS[record.status]}>{record.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Material">{record.material || "—"}</Descriptions.Item>
            <Descriptions.Item label="Origin">{record.origin}</Descriptions.Item>
            <Descriptions.Item label="Destination">{record.destination}</Descriptions.Item>
            <Descriptions.Item label="Quantity">
              {record.quantity ? `${record.quantity} ${record.unit || ""}`.trim() : "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Vehicle">
              {record.vehicle?.registrationNumber || "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Driver">{record.driver?.name || "—"}</Descriptions.Item>
            <Descriptions.Item label="Supervisor">{record.supervisor?.name || "—"}</Descriptions.Item>
            <Descriptions.Item label="Scheduled">
              {record.scheduledAt ? dayjs(record.scheduledAt).format("MMM DD, YYYY HH:mm") : "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Started">
              {record.startedAt ? dayjs(record.startedAt).format("MMM DD, YYYY HH:mm") : "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Delivered">
              {record.deliveredAt ? dayjs(record.deliveredAt).format("MMM DD, YYYY HH:mm") : "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Notes" span={2}>{record.notes || "—"}</Descriptions.Item>
            <Descriptions.Item label="Created">
              {dayjs(record.createdAt).format("MMMM DD, YYYY HH:mm")}
            </Descriptions.Item>
            <Descriptions.Item label="Updated">
              {dayjs(record.updatedAt).format("MMMM DD, YYYY HH:mm")}
            </Descriptions.Item>
          </Descriptions>

          {record.history?.length > 0 && (
            <>
              <Text strong style={{ fontSize: 16, display: "block", marginBottom: 12 }}>
                Status History
              </Text>
              <Timeline
                items={record.history.map((h) => ({
                  color: STATUS_COLORS[h.status],
                  children: (
                    <>
                      <Tag color={STATUS_COLORS[h.status]}>{h.status}</Tag>
                      {h.note && <Text type="secondary" style={{ marginLeft: 8 }}>{h.note}</Text>}
                      <br />
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {dayjs(h.changedAt).format("MMM DD, YYYY HH:mm")}
                      </Text>
                    </>
                  ),
                }))}
              />
            </>
          )}
        </>
      )}
    </Show>
  );
};
