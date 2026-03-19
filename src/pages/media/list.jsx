import { List, useTable, DeleteButton, DateField } from "@refinedev/antd";
import { useApiUrl } from "@refinedev/core";
import { Table, Space, Image, Tag, Button, Upload, message, Card, Row, Col } from "antd";
import { UploadOutlined, FileImageOutlined, FilePdfOutlined, FileOutlined } from "@ant-design/icons";
import { useState } from "react";

const getFileIcon = (mimeType) => {
  if (mimeType?.startsWith("image/")) return <FileImageOutlined style={{ color: "#1890ff" }} />;
  if (mimeType === "application/pdf") return <FilePdfOutlined style={{ color: "#ff4d4f" }} />;
  return <FileOutlined />;
};

const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
};

export const MediaList = () => {
  const { tableProps, tableQueryResult } = useTable({
    resource: "media",
    sorters: { initial: [{ field: "createdAt", order: "desc" }] },
    syncWithLocation: true,
  });

  const uploadProps = {
    name: "file",
    action: "/api/media",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} uploaded successfully`);
        tableQueryResult.refetch();
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} upload failed`);
      }
    },
  };

  return (
    <List
      headerButtons={
        <Upload {...uploadProps} showUploadList={false}>
          <Button type="primary" icon={<UploadOutlined />}>
            Upload File
          </Button>
        </Upload>
      }
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column
          title="Preview"
          width={80}
          render={(_, record) =>
            record.mimeType?.startsWith("image/") ? (
              <Image
                src={record.url}
                width={50}
                height={50}
                style={{ objectFit: "cover", borderRadius: 4 }}
                fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/+F/PQAJpAN4kMbgvQAAAABJRU5ErkJggg=="
              />
            ) : (
              <div style={{ fontSize: 24, textAlign: "center" }}>
                {getFileIcon(record.mimeType)}
              </div>
            )
          }
        />
        <Table.Column dataIndex="originalName" title="File Name" ellipsis />
        <Table.Column
          dataIndex="mimeType"
          title="Type"
          width={120}
          render={(type) => <Tag>{type?.split("/")[1]?.toUpperCase()}</Tag>}
        />
        <Table.Column
          dataIndex="size"
          title="Size"
          width={100}
          render={(size) => formatFileSize(size)}
        />
        <Table.Column
          dataIndex="createdAt"
          title="Uploaded"
          width={130}
          render={(value) => <DateField value={value} format="MMM DD, YYYY" />}
        />
        <Table.Column
          title="Actions"
          width={80}
          render={(_, record) => (
            <DeleteButton hideText size="small" recordItemId={record.id} />
          )}
        />
      </Table>
    </List>
  );
};
