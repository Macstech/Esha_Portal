import axiosInstance from "../utils/axios";

export const authProvider = {
  login: async ({ email, password }) => {
    try {
      const { data } = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("access_token", data.accessToken);
      localStorage.setItem("refresh_token", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      return { success: true, redirectTo: "/" };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "Login Failed",
          message: error.response?.data?.message || "Invalid credentials",
        },
      };
    }
  },

  logout: async () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    return { success: true, redirectTo: "/login" };
  },

  check: async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }

    try {
      await axiosInstance.get("/api/auth/me");
      return { authenticated: true };
    } catch {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },

  getPermissions: async () => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      return parsed.role;
    }
    return null;
  },

  getIdentity: async () => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      return {
        id: parsed.id,
        name: parsed.name,
        avatar: parsed.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(parsed.name)}&background=1890ff&color=fff`,
      };
    }
    return null;
  },

  onError: async (error) => {
    if (error.response?.status === 401) {
      return { logout: true };
    }
    return { error };
  },
};
