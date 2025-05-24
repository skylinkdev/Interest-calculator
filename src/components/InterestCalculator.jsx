import React, { useState } from 'react';
import { Card, Form, InputNumber, Select, Button, Space, Divider, Radio } from 'antd';
import { CalculatorOutlined } from '@ant-design/icons';

const { Option } = Select;

const InterestCalculator = () => {
  const [form] = Form.useForm();
  const [results, setResults] = useState(null);
  const [periodType, setPeriodType] = useState('year'); // 'year' 或 'day'

  const calculateInterest = (values) => {
    const { principal, rate, period, type } = values;
    let totalAmount, interest;

    if (type === 'simple') {
      // 单利计算
      if (periodType === 'year') {
        interest = principal * (rate / 100) * period;
      } else {
        // 按天计算，将年利率转换为日利率
        interest = principal * (rate / 100) * (period / 365);
      }
      totalAmount = principal + interest;
    } else {
      // 复利计算
      if (periodType === 'year') {
        totalAmount = principal * Math.pow(1 + rate / 100, period);
      } else {
        // 按天计算，将年利率转换为日利率
        totalAmount = principal * Math.pow(1 + rate / 100, period / 365);
      }
      interest = totalAmount - principal;
    }

    setResults({
      principal,
      interest: interest.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
    });
  };

  return (
    <div className="calculator-container">
      <Card title="利息计算器" bordered={false}>
        <Form
          form={form}
          layout="vertical"
          onFinish={calculateInterest}
          initialValues={{
            type: 'simple',
            period: 1,
            periodType: 'year',
          }}
        >
          <Form.Item
            label="本金"
            name="principal"
            rules={[{ required: true, message: '请输入本金金额' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              precision={2}
              placeholder="请输入本金金额"
              prefix="¥"
            />
          </Form.Item>

          <Form.Item
            label="年利率"
            name="rate"
            rules={[{ required: true, message: '请输入年利率' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={100}
              precision={2}
              placeholder="请输入年利率"
              suffix="%"
            />
          </Form.Item>

          <Form.Item
            label="期限类型"
            name="periodType"
            rules={[{ required: true, message: '请选择期限类型' }]}
          >
            <Radio.Group onChange={(e) => setPeriodType(e.target.value)}>
              <Radio.Button value="year">按年</Radio.Button>
              <Radio.Button value="day">按天</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label={periodType === 'year' ? "存款期限（年）" : "存款期限（天）"}
            name="period"
            rules={[{ required: true, message: '请输入存款期限' }]}
          >
            {periodType === 'year' ? (
              <Select>
                {[1, 2, 3, 5, 10, 20, 30].map((year) => (
                  <Option key={year} value={year}>
                    {year} 年
                  </Option>
                ))}
              </Select>
            ) : (
              <InputNumber
                style={{ width: '100%' }}
                min={1}
                max={36500} // 限制最大天数为100年
                placeholder="请输入天数"
                suffix="天"
              />
            )}
          </Form.Item>

          <Form.Item
            label="计算方式"
            name="type"
            rules={[{ required: true, message: '请选择计算方式' }]}
          >
            <Select>
              <Option value="simple">单利</Option>
              <Option value="compound">复利</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<CalculatorOutlined />}
              block
            >
              计算
            </Button>
          </Form.Item>
        </Form>

        {results && (
          <div className="result-card">
            <Divider>计算结果</Divider>
            <div className="result-item">
              <span className="result-label">本金：</span>
              <span className="result-value">¥{results.principal}</span>
            </div>
            <div className="result-item">
              <span className="result-label">利息：</span>
              <span className="result-value">¥{results.interest}</span>
            </div>
            <div className="result-item">
              <span className="result-label">本息合计：</span>
              <span className="result-value">¥{results.totalAmount}</span>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default InterestCalculator; 