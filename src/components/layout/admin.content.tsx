"use client";
import { Layout } from "antd";

const AdminContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { Content } = Layout;
  return (
    <>
      <Layout style={{ margin: "24px 16px 0" }}>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            background: "#ccc",
            borderRadius: "#ccc",
          }}
        >
          {children}
        </div>
      </Layout>
    </>
  );
};

export default AdminContent;
