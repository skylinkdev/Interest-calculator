import React from 'react';
import { Layout, Typography } from 'antd';
import InterestCalculator from './components/InterestCalculator.jsx';
import './App.css';

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout className="layout">
      {/* <Header className="header">
        <Title level={2} style={{ color: 'white', margin: '16px 0' }}>
          利息计算器
        </Title>
      </Header> */}
      <Content className="content">
        <InterestCalculator />
      </Content>
    </Layout>
  );
}

export default App; 