import { AuthPage } from "@refinedev/antd";

export const LoginPage = () => {
  return (
    <AuthPage
      type="login"
      title={
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 700, margin: 0, color: "#1890ff" }}>
            Esha Enterprises
          </h1>
        </div>
      }
      formProps={{
        initialValues: {
          email: "admin@contenthub.com",
          password: "admin123",
        },
      }}
    />
  );
};
