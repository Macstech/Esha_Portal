import {
  DashboardOutlined,
  UserOutlined,
  CarOutlined,
  IdcardOutlined,
  GlobalOutlined,
  PlaySquareOutlined,
  HomeOutlined,
  PhoneOutlined,
  ProjectOutlined,
  SettingOutlined,
  TeamOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  AuditOutlined,
  SafetyCertificateOutlined,
  FileDoneOutlined,
  TruckOutlined,
  DotChartOutlined,
  LineChartOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";

export const resources = [
  // 1. Dashboard
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: "Dashboard",
      icon: <DashboardOutlined />,
    },
  },

  // 2. Vendor Management
  {
    name: "vendors",
    meta: {
      label: "Vendor Management",
      icon: <UserOutlined />,
    },
  },
  {
    name: "users",
    list: "/users",
    create: "/users/create",
    edit: "/users/edit/:id",
    meta: {
      label: "Vendors",
      icon: <UserOutlined />,
      parent: "vendors",
      canDelete: true,
    },
  },
  {
    name: "drivers",
    list: "/drivers",
    create: "/drivers/create",
    edit: "/drivers/edit/:id",
    show: "/drivers/show/:id",
    meta: {
      label: "Drivers",
      icon: <IdcardOutlined />,
      parent: "vendors",
      canDelete: true,
    },
  },

  // 3. Supervisor Management
  {
    name: "supervisor-management",
    meta: {
      label: "Supervisor Management",
      icon: <TeamOutlined />,
    },
  },
  {
    name: "supervisors",
    list: "/supervisors",
    create: "/supervisors/create",
    edit: "/supervisors/edit/:id",
    show: "/supervisors/show/:id",
    meta: {
      label: "Supervisors",
      icon: <SafetyCertificateOutlined />,
      parent: "supervisor-management",
      canDelete: true,
    },
  },
  {
    name: "supervisor-assignments",
    list: "/supervisor-assignments",
    create: "/supervisor-assignments/create",
    edit: "/supervisor-assignments/edit/:id",
    meta: {
      label: "Assignments",
      icon: <AuditOutlined />,
      parent: "supervisor-management",
      canDelete: true,
    },
  },

  // 4. Vehicle Setup
  {
    name: "vehicle-setup",
    meta: {
      label: "Vehicle Setup",
      icon: <CarOutlined />,
    },
  },
  {
    name: "vehicles",
    list: "/vehicles",
    create: "/vehicles/create",
    edit: "/vehicles/edit/:id",
    show: "/vehicles/show/:id",
    meta: {
      label: "Vehicles",
      icon: <TruckOutlined />,
      parent: "vehicle-setup",
      canDelete: true,
    },
  },
  {
    name: "vehicle-types",
    list: "/vehicle-types",
    create: "/vehicle-types/create",
    edit: "/vehicle-types/edit/:id",
    meta: {
      label: "Vehicle Types",
      icon: <AppstoreOutlined />,
      parent: "vehicle-setup",
      canDelete: true,
    },
  },

  // 5. Load Monitoring
  {
    name: "load-monitoring",
    meta: {
      label: "Load Monitoring",
      icon: <DotChartOutlined />,
    },
  },
  {
    name: "loads",
    list: "/loads",
    create: "/loads/create",
    edit: "/loads/edit/:id",
    show: "/loads/show/:id",
    meta: {
      label: "Active Loads",
      icon: <TruckOutlined />,
      parent: "load-monitoring",
      canDelete: true,
    },
  },
  {
    name: "load-history",
    list: "/load-history",
    show: "/load-history/show/:id",
    meta: {
      label: "Load History",
      icon: <FileDoneOutlined />,
      parent: "load-monitoring",
    },
  },

  // 6. Reports
  {
    name: "reports",
    meta: {
      label: "Reports",
      icon: <BarChartOutlined />,
    },
  },
  {
    name: "reports-summary",
    list: "/reports/summary",
    meta: {
      label: "Summary Report",
      icon: <LineChartOutlined />,
      parent: "reports",
    },
  },
  {
    name: "reports-drivers",
    list: "/reports/drivers",
    meta: {
      label: "Driver Report",
      icon: <IdcardOutlined />,
      parent: "reports",
    },
  },
  {
    name: "reports-vehicles",
    list: "/reports/vehicles",
    meta: {
      label: "Vehicle Report",
      icon: <CarOutlined />,
      parent: "reports",
    },
  },
  {
    name: "reports-loads",
    list: "/reports/loads",
    meta: {
      label: "Load Report",
      icon: <FileSearchOutlined />,
      parent: "reports",
    },
  },

  // 7. Website
  {
    name: "website",
    meta: {
      label: "Website",
      icon: <GlobalOutlined />,
    },
  },
  {
    name: "site-home",
    list: "/website/home",
    meta: {
      label: "Home Page",
      icon: <HomeOutlined />,
      parent: "website",
    },
  },
  {
    name: "site-contact",
    list: "/website/contact",
    meta: {
      label: "Contact Page",
      icon: <PhoneOutlined />,
      parent: "website",
    },
  },
  {
    name: "site-projects",
    list: "/website/projects",
    meta: {
      label: "Projects Page",
      icon: <ProjectOutlined />,
      parent: "website",
    },
  },
  {
    name: "site-slides",
    list: "/website/slides",
    create: "/website/slides/create",
    edit: "/website/slides/edit/:id",
    meta: {
      label: "Hero Slides",
      icon: <PlaySquareOutlined />,
      parent: "website",
      canDelete: true,
    },
  },
  {
    name: "site-settings",
    list: "/website/site",
    meta: {
      label: "Site Settings",
      icon: <SettingOutlined />,
      parent: "website",
    },
  },
];
