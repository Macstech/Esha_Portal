/**
 * Access Control Provider for Refine.
 * Maps user roles to resource-level permissions.
 */

const ALL_CRUD = ["list", "show", "create", "edit", "delete"];
const READ_ONLY = ["list", "show"];
const LIST_ONLY = ["list"];
const EDITOR_CRUD = ["list", "show", "create", "edit"];

// Resources that are parent-only (no API, just sidebar grouping)
const PARENT_GROUPS = [
  "vendors",
  "supervisor-management",
  "vehicle-setup",
  "load-monitoring",
  "reports",
  "website",
];

// Vendor role: limited to their own dashboard + load status updates
const VENDOR_PERMISSIONS: Record<string, string[]> = {
  "vendor-dashboard": LIST_ONLY,
  loads: ["list", "show", "edit"],
  "load-history": READ_ONLY,
};

export const accessControlProvider = {
  can: async ({ resource, action }: { resource: string; action: string; params?: any }) => {
    const user = localStorage.getItem("user");
    if (!user) return { can: false };

    const { role } = JSON.parse(user);

    // Parent group resources are always visible (no data access, just navigation)
    if (PARENT_GROUPS.includes(resource)) {
      return { can: true };
    }

    // Permission matrix per role
    const permissions: Record<string, Record<string, string[]>> = {
      SUPER_ADMIN: {
        // Vendor Management
        users: ALL_CRUD,
        drivers: ALL_CRUD,
        // Supervisor Management
        supervisors: ALL_CRUD,
        "supervisor-assignments": ALL_CRUD,
        // Vehicle Setup
        vehicles: ALL_CRUD,
        "vehicle-types": ALL_CRUD,
        // Load Monitoring
        loads: ALL_CRUD,
        "load-history": READ_ONLY,
        // Reports
        "reports-summary": LIST_ONLY,
        "reports-drivers": LIST_ONLY,
        "reports-vehicles": LIST_ONLY,
        "reports-loads": LIST_ONLY,
        // Dashboard
        dashboard: LIST_ONLY,
        "vendor-dashboard": LIST_ONLY,
        // Website
        "site-home": LIST_ONLY,
        "site-contact": LIST_ONLY,
        "site-projects": LIST_ONLY,
        "site-slides": ALL_CRUD,
        "site-settings": LIST_ONLY,
        // Legacy (keep for compatibility)
        posts: ALL_CRUD,
        categories: ALL_CRUD,
        media: ALL_CRUD,
      },

      EDITOR: {
        // Vendor Management
        users: READ_ONLY,
        drivers: EDITOR_CRUD,
        // Supervisor Management
        supervisors: EDITOR_CRUD,
        "supervisor-assignments": EDITOR_CRUD,
        // Vehicle Setup
        vehicles: EDITOR_CRUD,
        "vehicle-types": EDITOR_CRUD,
        // Load Monitoring
        loads: EDITOR_CRUD,
        "load-history": READ_ONLY,
        // Reports
        "reports-summary": LIST_ONLY,
        "reports-drivers": LIST_ONLY,
        "reports-vehicles": LIST_ONLY,
        "reports-loads": LIST_ONLY,
        // Dashboard
        dashboard: LIST_ONLY,
        "vendor-dashboard": LIST_ONLY,
        // Website
        "site-home": LIST_ONLY,
        "site-contact": LIST_ONLY,
        "site-projects": LIST_ONLY,
        "site-slides": EDITOR_CRUD,
        "site-settings": LIST_ONLY,
        // Legacy
        posts: EDITOR_CRUD,
        categories: EDITOR_CRUD,
        media: ["list", "show", "create"],
      },

      VIEWER: {
        // Vendor Management
        users: [],
        drivers: READ_ONLY,
        // Supervisor Management
        supervisors: READ_ONLY,
        "supervisor-assignments": READ_ONLY,
        // Vehicle Setup
        vehicles: READ_ONLY,
        "vehicle-types": READ_ONLY,
        // Load Monitoring
        loads: READ_ONLY,
        "load-history": READ_ONLY,
        // Reports
        "reports-summary": LIST_ONLY,
        "reports-drivers": LIST_ONLY,
        "reports-vehicles": LIST_ONLY,
        "reports-loads": LIST_ONLY,
        // Dashboard
        dashboard: LIST_ONLY,
        "vendor-dashboard": LIST_ONLY,
        // Website
        "site-home": LIST_ONLY,
        "site-contact": LIST_ONLY,
        "site-projects": LIST_ONLY,
        "site-slides": READ_ONLY,
        "site-settings": LIST_ONLY,
        // Legacy
        posts: READ_ONLY,
        categories: READ_ONLY,
        media: READ_ONLY,
      },

      VENDOR: VENDOR_PERMISSIONS,
    };

    const rolePerms = permissions[role];
    if (!rolePerms) return { can: false };

    const resourcePerms = rolePerms[resource];
    if (!resourcePerms) return { can: false };

    return { can: resourcePerms.includes(action) };
  },
};
