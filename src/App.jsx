import { Refine, Authenticated } from "@refinedev/core";
import { ThemedLayoutV2, ThemedSiderV2, ThemedTitleV2, useNotificationProvider, ErrorComponent } from "@refinedev/antd";
import routerProvider, { NavigateToResource, DocumentTitleHandler } from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router";
import { App as AntdApp, ConfigProvider } from "antd";
import {
  DashboardOutlined,
  FileTextOutlined,
  FolderOutlined,
  PictureOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "@refinedev/antd/dist/reset.css";

import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { accessControlProvider } from "./providers/accessControlProvider";

import { DashboardPage } from "./pages/dashboard";
import { LoginPage } from "./pages/login";
import { PostList, PostCreate, PostEdit, PostShow } from "./pages/posts";
import { CategoryList, CategoryCreate, CategoryEdit } from "./pages/categories";
import { MediaList } from "./pages/media";
import { UserList, UserCreate, UserEdit } from "./pages/users";

const App = () => {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#1890ff",
            borderRadius: 6,
          },
        }}
      >
        <AntdApp>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider}
            authProvider={authProvider}
            accessControlProvider={accessControlProvider}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "dashboard",
                list: "/",
                meta: {
                  label: "Dashboard",
                  icon: <DashboardOutlined />,
                },
              },
              {
                name: "posts",
                list: "/posts",
                create: "/posts/create",
                edit: "/posts/edit/:id",
                show: "/posts/show/:id",
                meta: {
                  icon: <FileTextOutlined />,
                  canDelete: true,
                },
              },
              {
                name: "categories",
                list: "/categories",
                create: "/categories/create",
                edit: "/categories/edit/:id",
                meta: {
                  icon: <FolderOutlined />,
                  canDelete: true,
                },
              },
              {
                name: "media",
                list: "/media",
                meta: {
                  icon: <PictureOutlined />,
                  canDelete: true,
                },
              },
              {
                name: "users",
                list: "/users",
                create: "/users/create",
                edit: "/users/edit/:id",
                meta: {
                  icon: <UserOutlined />,
                  canDelete: true,
                },
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<Navigate to="/login" replace />}
                  >
                    <ThemedLayoutV2
                      Title={({ collapsed }) => (
                        <ThemedTitleV2
                          collapsed={collapsed}
                          text="ContentHub"
                          icon={<DashboardOutlined style={{ color: "#1890ff" }} />}
                        />
                      )}
                    >
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route index element={<DashboardPage />} />
                <Route path="/posts">
                  <Route index element={<PostList />} />
                  <Route path="create" element={<PostCreate />} />
                  <Route path="edit/:id" element={<PostEdit />} />
                  <Route path="show/:id" element={<PostShow />} />
                </Route>
                <Route path="/categories">
                  <Route index element={<CategoryList />} />
                  <Route path="create" element={<CategoryCreate />} />
                  <Route path="edit/:id" element={<CategoryEdit />} />
                </Route>
                <Route path="/media">
                  <Route index element={<MediaList />} />
                </Route>
                <Route path="/users">
                  <Route index element={<UserList />} />
                  <Route path="create" element={<UserCreate />} />
                  <Route path="edit/:id" element={<UserEdit />} />
                </Route>
                <Route path="*" element={<ErrorComponent />} />
              </Route>
              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<LoginPage />} />
              </Route>
            </Routes>
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
