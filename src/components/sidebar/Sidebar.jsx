import * as React from 'react';
import styles from './Sidebar.module.css';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import {
  HomeOutlined,
  MailOutlined,
  DesktopOutlined,
  ContainerOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { routes } from '../../constants/routes'

const { SubMenu } = Menu;

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const handleClick = () => console.log();
  return (
    <div className={styles.sidebar}>
      <Menu
        onClick={handleClick}
        style={{ backgroundColor: 'rgba(184, 203, 219, 0.306' }}
        defaultSelectedKeys={[pathname]}
        // defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key={routes.home} icon={<HomeOutlined />}>
          <Link to={routes.home}>Home</Link>
        </Menu.Item>
        <SubMenu
          key="sub2"
          title={
            <span>
              <DesktopOutlined />
              <span>Courses</span>
            </span>
          }
        >
          <Menu.Item key={routes.python}>
            <Link to={routes.python}>Python</Link>
          </Menu.Item>
          <Menu.Item key={routes.javascript}>
            <Link to={routes.javascript}>Javascript</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key={routes.blog} icon={<ContainerOutlined />}>
          <Link to={routes.blog}>Blog</Link>
        </Menu.Item>
        <Menu.Item key={routes.message} icon={<MailOutlined />}>
          <Link to={routes.message}>Message</Link>
        </Menu.Item>
        <Menu.Item key={routes.trello} icon={<UnorderedListOutlined />}>
          <Link to={routes.trello}>Trello</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
