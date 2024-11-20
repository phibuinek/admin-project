"use client";
import { Layout } from "antd";
import React from "react";

const AdminFooter = () => {
  const { Footer } = Layout;
  return (
    <Footer style={{ textAlign: "center" }}>
      Phi Bùi IT ©{new Date().getFullYear()} Created by Phi Bùi IT
    </Footer>
  );
};

export default AdminFooter;
