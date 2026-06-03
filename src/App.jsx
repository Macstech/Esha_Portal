import { Refine } from "@refinedev/core";
import { useNotificationProvider } from "@refinedev/antd";
import routerProvider, { DocumentTitleHandler } from "@refinedev/react-router";
import { BrowserRouter } from "react-router";
import { App as AntdApp, ConfigProvider } from "antd";

import "@refinedev/antd/dist/reset.css";

import { dataProvider } from "./providers/dataProvider";
import { authProvider } from "./providers/authProvider";
import { accessControlProvider } from "./providers/accessControlProvider";
import { resources } from "./config/resources";
import { AppRoutes } from "./config/routes";

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
            resources={resources}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <AppRoutes />
            <DocumentTitleHandler />
          </Refine>
        </AntdApp>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
