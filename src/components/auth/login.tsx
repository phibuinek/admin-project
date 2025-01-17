"use client";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { authenticate } from "@/utils/actions";
import { useRouter } from "next/router";

const Login = () => {
  const onFinish = async (values: any) => {
    const router = useRouter();
    // console.log("check values: ", values);
    const { username, password } = values;
    // const data = await signIn("credentials", {
    //   email,
    //   password,
    //   redirectTo: false,
    // });
    // console.log(">>> check dta: ", data);
    const res = await authenticate(username, password);
    // console.log(">>> check res: ", res);

    if (res?.error) {
      //error
      notification.error({
        message: "Error login",
        description: res?.error,
      });
      if (res?.code === 2) {
        router.push("/verify");
      }
    } else {
      //redirect to dashboard
      router.push("/dashboard");
    }
  };

  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend>Đăng Nhập</legend>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
          <Link href={"/"}>
            <ArrowLeftOutlined /> Quay lại trang chủ
          </Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Chưa có tài khoản?{" "}
            <Link href={"/auth/register"}>Đăng ký tại đây</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default Login;
