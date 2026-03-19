import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Tag, Descriptions, Divider, Space } from "antd";
import dayjs from "dayjs";

const { Title, Text } = Typography;

export const PostShow = () => {
  const { queryResult } = useShow({ resource: "posts" });
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const statusColorMap = {
    PUBLISHED: "green",
    DRAFT: "orange",
    ARCHIVED: "default",
  };

  return (
    <Show isLoading={isLoading}>
      {record && (
        <>
          <Descriptions bordered column={2}>
            <Descriptions.Item label="Title" span={2}>
              <Text strong>{record.title}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Slug">
              <Text code>{record.slug}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={statusColorMap[record.status]}>{record.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Author">
              {record.author?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Views">
              {record.viewCount}
            </Descriptions.Item>
            <Descriptions.Item label="Categories" span={2}>
              <Space>
                {record.categories?.map((cat) => (
                  <Tag key={cat.id} color="blue">
                    {cat.name}
                  </Tag>
                ))}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Tags" span={2}>
              <Space>
                {record.tags?.map((tag) => (
                  <Tag key={tag.id}>{tag.name}</Tag>
                ))}
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Created">
              {dayjs(record.createdAt).format("MMMM DD, YYYY HH:mm")}
            </Descriptions.Item>
            <Descriptions.Item label="Updated">
              {dayjs(record.updatedAt).format("MMMM DD, YYYY HH:mm")}
            </Descriptions.Item>
            {record.excerpt && (
              <Descriptions.Item label="Excerpt" span={2}>
                {record.excerpt}
              </Descriptions.Item>
            )}
          </Descriptions>

          <Divider orientation="left">Content</Divider>
          <div
            style={{
              padding: "16px",
              background: "#fafafa",
              borderRadius: 8,
              minHeight: 200,
            }}
            dangerouslySetInnerHTML={{ __html: record.content }}
          />
        </>
      )}
    </Show>
  );
};
