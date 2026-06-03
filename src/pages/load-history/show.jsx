import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Descriptions, Tag } from "antd";
import dayjs from "dayjs";

const STATUS_COLORS = {
  PENDING: "orange",
  IN_TRANSIT: "blue",
  DELIVERED: "green",
  CANCELLED: "red",
};

export const LoadHistoryShow = () => {
  const { queryResult } = useShow({ resource: "load-history" });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading} canEdit={false}>
      {record && (
        <Descriptions bordered column={2}>
          <Descriptions.Item label="ID">{record.id}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Tag color={STATUS_COLORS[record.status]}>{record.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Load Number">{record.load?.loadNumber || "—"}</Descriptions.Item>
          <Descriptions.Item label="Route">
            {record.load ? `${record.load.origin} → ${record.load.destination}` : "—"}
          </Descriptions.Item>
          <Descriptions.Item label="Note" span={2}>{record.note || "—"}</Descriptions.Item>
          <Descriptions.Item label="Changed At" span={2}>
            {dayjs(record.changedAt).format("MMMM DD, YYYY HH:mm")}
          </Descriptions.Item>
        </Descriptions>
      )}
    </Show>
  );
};
