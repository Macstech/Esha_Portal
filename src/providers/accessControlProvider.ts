/**
 * Access Control Provider for Refine.
 * Maps user roles to resource-level permissions.
 *
 * Parent group resources (sidebar headings) are shown only when the role
 * has at least one accessible child under that group.
 */

const ALL_CRUD    = ["list", "show", "create", "edit", "delete"];
const READ_ONLY   = ["list", "show"];
const LIST_ONLY   = ["list"];
const EDITOR_CRUD = ["list", "show", "create", "edit"];

// ── Permission matrix ────────────────────────────────────────────────────────
const PERMISSIONS: Record<string, Record<string, string[]>> = {
  SUPER_ADMIN: {
    dashboard: LIST_ONLY,
    "vendor-dashboard": LIST_ONLY,
    users: ALL_CRUD,
    drivers: ALL_CRUD,
    supervisors: ALL_CRUD,
    "supervisor-assignments": ALL_CRUD,
    vehicles: ALL_CRUD,
    "vehicle-types": ALL_CRUD,
    loads: ALL_CRUD,
    "load-history": READ_ONLY,
    "reports-summary": LIST_ONLY,
    "reports-drivers": LIST_ONLY,
    "reports-vehicles": LIST_ONLY,
    "reports-loads": LIST_ONLY,
    "site-home": LIST_ONLY,
    "site-contact": LIST_ONLY,
    "site-projects": LIST_ONLY,
    "site-slides": ALL_CRUD,
    "site-settings": LIST_ONLY,
    posts: ALL_CRUD,
    categories: ALL_CRUD,
    media: ALL_CRUD,
  },

  // Alias used in some places
  ADMIN: {
    dashboard: LIST_ONLY,
    "vendor-dashboard": LIST_ONLY,
    users: ALL_CRUD,
    drivers: ALL_CRUD,
    supervisors: ALL_CRUD,
    "supervisor-assignments": ALL_CRUD,
    vehicles: ALL_CRUD,
    "vehicle-types": ALL_CRUD,
    loads: ALL_CRUD,
    "load-history": READ_ONLY,
    "reports-summary": LIST_ONLY,
    "reports-drivers": LIST_ONLY,
    "reports-vehicles": LIST_ONLY,
    "reports-loads": LIST_ONLY,
    "site-home": LIST_ONLY,
    "site-contact": LIST_ONLY,
    "site-projects": LIST_ONLY,
    "site-slides": ALL_CRUD,
    "site-settings": LIST_ONLY,
    posts: ALL_CRUD,
    categories: ALL_CRUD,
    media: ALL_CRUD,
  },

  EDITOR: {
    dashboard: LIST_ONLY,
    users: READ_ONLY,
    drivers: EDITOR_CRUD,
    supervisors: EDITOR_CRUD,
    "supervisor-assignments": EDITOR_CRUD,
    vehicles: EDITOR_CRUD,
    "vehicle-types": EDITOR_CRUD,
    loads: EDITOR_CRUD,
    "load-history": READ_ONLY,
    "reports-summary": LIST_ONLY,
    "reports-drivers": LIST_ONLY,
    "reports-vehicles": LIST_ONLY,
    "reports-loads": LIST_ONLY,
    "site-home": LIST_ONLY,
    "site-contact": LIST_ONLY,
    "site-projects": LIST_ONLY,
    "site-slides": EDITOR_CRUD,
    "site-settings": LIST_ONLY,
    posts: EDITOR_CRUD,
    categories: EDITOR_CRUD,
    media: ["list", "show", "create"],
  },

  VIEWER: {
    dashboard: LIST_ONLY,
    drivers: READ_ONLY,
    supervisors: READ_ONLY,
    "supervisor-assignments": READ_ONLY,
    vehicles: READ_ONLY,
    "vehicle-types": READ_ONLY,
    loads: READ_ONLY,
    "load-history": READ_ONLY,
    "reports-summary": LIST_ONLY,
    "reports-drivers": LIST_ONLY,
    "reports-vehicles": LIST_ONLY,
    "reports-loads": LIST_ONLY,
    "site-home": LIST_ONLY,
    "site-contact": LIST_ONLY,
    "site-projects": LIST_ONLY,
    "site-slides": READ_ONLY,
    "site-settings": LIST_ONLY,
    posts: READ_ONLY,
    categories: READ_ONLY,
    media: READ_ONLY,
  },

  // Vendors can manage loads (create, update status) + their own dashboard
  VENDOR: {
    "vendor-dashboard": LIST_ONLY,
    loads: ["list", "show", "create", "edit"],
    "load-history": READ_ONLY,
  },

  SUPERVISOR: {
    dashboard: LIST_ONLY,
    supervisors: READ_ONLY,
    "supervisor-assignments": READ_ONLY,
    loads: ["list", "show", "edit"],
    "load-history": READ_ONLY,
    "reports-summary": LIST_ONLY,
    "reports-loads": LIST_ONLY,
  },
};

// ── Parent group → children mapping ─────────────────────────────────────────
// A parent group is shown in the sidebar only when the role can access ≥1 child.
const PARENT_CHILDREN: Record<string, string[]> = {
  "vendors":              ["users", "drivers"],
  "supervisor-management":["supervisors", "supervisor-assignments"],
  "vehicle-setup":        ["vehicles", "vehicle-types"],
  "load-monitoring":      ["loads", "load-history"],
  "reports":              ["reports-summary", "reports-drivers", "reports-vehicles", "reports-loads"],
  "website":              ["site-home", "site-contact", "site-projects", "site-slides", "site-settings"],
};

export const accessControlProvider = {
  can: async ({ resource, action }: { resource: string; action: string; params?: any }) => {
    const raw = localStorage.getItem("user");
    if (!raw) return { can: false };

    const { role } = JSON.parse(raw);
    const rolePerms = PERMISSIONS[role];
    if (!rolePerms) return { can: false };

    // Parent group: visible only if the role can access at least one child
    if (PARENT_CHILDREN[resource]) {
      const children = PARENT_CHILDREN[resource];
      const hasChild = children.some(
        (child) => (rolePerms[child]?.length ?? 0) > 0
      );
      return { can: hasChild };
    }

    const resourcePerms = rolePerms[resource];
    if (!resourcePerms) return { can: false };

    return { can: resourcePerms.includes(action) };
  },
};
