import React from "react";
import { Layout, Typography, Row, Col } from "antd";

const { Content } = Layout;
const { Title } = Typography;
interface Props {}

export const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout>
      <header>
        <nav>
          <Row justify="center" align="middle">
            <Col>
              <Typography>
                <Title>Quiz App</Title>
              </Typography>
            </Col>
          </Row>
        </nav>
      </header>

      <Content>{children}</Content>
    </Layout>
  );
};
