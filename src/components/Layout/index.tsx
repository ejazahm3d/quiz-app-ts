import React from "react";
import { Layout, Row, Col } from "antd";

const { Content } = Layout;
interface Props {}

export const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <header style={{ marginBottom: "2rem", marginTop: "5rem" }}>
        <nav>
          <Row justify="center" align="middle">
            <Col>
              <h1
                style={{
                  fontFamily: "'Bungee Outline', cursive",
                  fontSize: "4rem",
                }}
              >
                Quiz App
              </h1>
            </Col>
          </Row>
        </nav>
      </header>

      <Content>{children}</Content>
    </>
  );
};
