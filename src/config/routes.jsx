import { Authenticated } from "@refinedev/core";
import { ThemedLayoutV2, ThemedTitleV2, ThemedSiderV2, ErrorComponent } from "@refinedev/antd";
import { NavigateToResource } from "@refinedev/react-router";
import { Routes, Route, Outlet, Navigate } from "react-router";
import { DashboardOutlined } from "@ant-design/icons";
import { ConfigProvider, theme } from "antd";

const SIDEBAR_BG = "#004844";

const CustomSider = (props) => (
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
      token: {
        colorBgContainer: SIDEBAR_BG,
        colorBgElevated: SIDEBAR_BG,
        colorPrimary: "#52c9c0",
      },
      components: {
        Menu: {
          darkItemBg: SIDEBAR_BG,
          darkSubMenuItemBg: "#003633",
          darkItemSelectedBg: "#006b65",
          itemSelectedBg: "#006b65",
          itemSelectedColor: "#ffffff",
          colorText: "rgba(255,255,255,0.85)",
        },
        Layout: {
          siderBg: SIDEBAR_BG,
          triggerBg: "#003633",
        },
      },
    }}
  >
    <ThemedSiderV2 {...props} />
  </ConfigProvider>
);

import { DashboardPage } from "../pages/dashboard";
import { LoginPage } from "../pages/login";
import { PostList, PostCreate, PostEdit, PostShow } from "../pages/posts";
import { CategoryList, CategoryCreate, CategoryEdit } from "../pages/categories";
import { MediaList } from "../pages/media";
import { UserList, UserCreate, UserEdit } from "../pages/users";
import { DriverList, DriverCreate, DriverEdit, DriverShow } from "../pages/drivers";
import { VehicleList, VehicleCreate, VehicleEdit, VehicleShow } from "../pages/vehicles";
import { SupervisorList, SupervisorCreate, SupervisorEdit, SupervisorShow } from "../pages/supervisors";
import { SupervisorAssignmentList, SupervisorAssignmentCreate, SupervisorAssignmentEdit } from "../pages/supervisor-assignments";
import { VehicleTypeList, VehicleTypeCreate, VehicleTypeEdit } from "../pages/vehicle-types";
import { LoadList, LoadCreate, LoadEdit, LoadShow } from "../pages/loads";
import { LoadHistoryList, LoadHistoryShow } from "../pages/load-history";
import { SummaryReport, DriversReport, VehiclesReport, LoadsReport } from "../pages/reports";
import { VendorDashboard } from "../pages/vendor-dashboard";
import { SupervisorDashboard } from "../pages/supervisor-dashboard";
import {
  ContentList,
  ContentCreate,
  ContentEdit,
  SlideList,
  SlideCreate,
  SlideEdit,
  HomeSectionsPage,
  ContactSectionsPage,
  ProjectsSectionsPage,
  SiteSettingsPage,
} from "../pages/website-content";

export const AppRoutes = () => (
  <Routes>
    {/* Authenticated routes */}
    <Route
      element={
        <Authenticated
          key="authenticated-routes"
          fallback={<Navigate to="/login" replace />}
        >
          <ThemedLayoutV2
            Sider={CustomSider}
            Title={({ collapsed }) => (
              <ThemedTitleV2
                collapsed={collapsed}
                text="ContentHub"
                icon={<DashboardOutlined style={{ color: "#52c9c0" }} />}
              />
            )}
          >
            <Outlet />
          </ThemedLayoutV2>
        </Authenticated>
      }
    >
      <Route index element={<DashboardPage />} />
      <Route path="/vendor-dashboard" element={<VendorDashboard />} />
      <Route path="/supervisor-dashboard" element={<SupervisorDashboard />} />

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

      <Route path="/drivers">
        <Route index element={<DriverList />} />
        <Route path="create" element={<DriverCreate />} />
        <Route path="edit/:id" element={<DriverEdit />} />
        <Route path="show/:id" element={<DriverShow />} />
      </Route>

      <Route path="/vehicles">
        <Route index element={<VehicleList />} />
        <Route path="create" element={<VehicleCreate />} />
        <Route path="edit/:id" element={<VehicleEdit />} />
        <Route path="show/:id" element={<VehicleShow />} />
      </Route>

      {/* Supervisor Management */}
      <Route path="/supervisors">
        <Route index element={<SupervisorList />} />
        <Route path="create" element={<SupervisorCreate />} />
        <Route path="edit/:id" element={<SupervisorEdit />} />
        <Route path="show/:id" element={<SupervisorShow />} />
      </Route>

      <Route path="/supervisor-assignments">
        <Route index element={<SupervisorAssignmentList />} />
        <Route path="create" element={<SupervisorAssignmentCreate />} />
        <Route path="edit/:id" element={<SupervisorAssignmentEdit />} />
      </Route>

      {/* Vehicle Setup */}
      <Route path="/vehicle-types">
        <Route index element={<VehicleTypeList />} />
        <Route path="create" element={<VehicleTypeCreate />} />
        <Route path="edit/:id" element={<VehicleTypeEdit />} />
      </Route>

      {/* Load Monitoring */}
      <Route path="/loads">
        <Route index element={<LoadList />} />
        <Route path="create" element={<LoadCreate />} />
        <Route path="edit/:id" element={<LoadEdit />} />
        <Route path="show/:id" element={<LoadShow />} />
      </Route>

      <Route path="/load-history">
        <Route index element={<LoadHistoryList />} />
        <Route path="show/:id" element={<LoadHistoryShow />} />
      </Route>

      {/* Reports */}
      <Route path="/reports/summary" element={<SummaryReport />} />
      <Route path="/reports/drivers" element={<DriversReport />} />
      <Route path="/reports/vehicles" element={<VehiclesReport />} />
      <Route path="/reports/loads" element={<LoadsReport />} />

      <Route path="/website/home" element={<HomeSectionsPage />} />

      <Route path="/website/contact" element={<ContactSectionsPage />} />
      <Route path="/website/projects" element={<ProjectsSectionsPage />} />
      <Route path="/website/site" element={<SiteSettingsPage />} />

      <Route path="/website/content">
        <Route index element={<ContentList />} />
        <Route path="create" element={<ContentCreate />} />
        <Route path="edit/:id" element={<ContentEdit />} />
      </Route>

      <Route path="/website/slides">
        <Route index element={<SlideList />} />
        <Route path="create" element={<SlideCreate />} />
        <Route path="edit/:id" element={<SlideEdit />} />
      </Route>

      <Route path="*" element={<ErrorComponent />} />
    </Route>

    {/* Public routes */}
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
);
