import React from 'react';
import { Row, Col, Divider } from 'antd';
import styles from './CourseJS.module.css';
import { Card, Avatar, Button } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Meta } = Card;

const style = { background: '#0092ff' };

export const CourseJS = () => {
  return (
    <div className={styles.javascript}>
      <Divider
        orientation="left"
        style={{ color: '#333', fontWeight: 'normal' }}
      >
        Javascript
      </Divider>
      <Row gutter={[16, 24]}>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <Card
              style={{ width: '100%' }}
              title="Learn javascript"
              cover={
                <img
                  alt="example"
                  src="https://miro.medium.com/max/668/1*hcws3Wa6u9IqaEZ_4X04uw.jpeg"
                  style={{ height: '150px' }}
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="toniktoo"
                description="Frontend developer"
              />
              <div className="simleLineApp" style={{ margin: '8px 0' }} />
              <ul className={styles.todoList}>
                <li className={styles.todoItem}>
                  <p className={styles.todoItemTitile}>Promise</p>
                </li>
                <li className={styles.todoItem}>
                  <p className={styles.todoItemTitle}>Event Loop</p>
                </li>
                <li className={styles.todoItem}>
                  <p className={styles.todoItemTitle}>DOM API</p>
                </li>
              </ul>
            </Card>
          </div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>
            <Button type="primary" style={{ width: '100%' }}>
              Create card
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};
