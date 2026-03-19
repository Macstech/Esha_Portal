/**
 * Access Control Provider for Refine.
 * Maps user roles to resource-level permissions.
 */
export const accessControlProvider = {
  can: async ({ resource, action, params }) => {
    const user = localStorage.getItem("user");
    if (!user) return { can: false };

    const { role } = JSON.parse(user);

    // Permission matrix
    const permissions = {
      SUPER_ADMIN: {
        // Full access to everything
        posts: ["list", "show", "create", "edit", "delete"],
        categories: ["list", "show", "create", "edit", "delete"],
        media: ["list", "show", "create", "delete"],
        users: ["list", "show", "create", "edit", "delete"],
        dashboard: ["list"],
      },
      EDITOR: {
        posts: ["list", "show", "create", "edit"],
        categories: ["list", "show", "create", "edit"],
        media: ["list", "show", "create"],
        users: ["list", "show"],
        dashboard: ["list"],
      },
      VIEWER: {
        posts: ["list", "show"],
        categories: ["list", "show"],
        media: ["list", "show"],
        users: [],
        dashboard: ["list"],
      },
    };

    const rolePerms = permissions[role];
    if (!rolePerms) return { can: false };

    const resourcePerms = rolePerms[resource];
    if (!resourcePerms) return { can: false };

    return { can: resourcePerms.includes(action) };
  },
};
