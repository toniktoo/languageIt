import React, { Children } from 'react';
import styles from './Modal.module.css';
import {
  WarningOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@ant-design/icons';

export const ModalAction = ({
  title,
  type,
  handleOk,
  handleCancel,
  children,
}) => {
  return (
    <div className={styles.modalWrap}>
      <div className={styles.modal}>
        <div className={styles.titleWrap}>
          <WarningOutlined style={{ fontSize: 18 }} />
          <h2 className={styles.title}>{title}</h2>
        </div>
        {children}
        <div className={styles.btnActionsWrap}>
          <div className={styles.btnAction} onClick={handleCancel}>
            <CloseOutlined />
          </div>
          <div className={styles.btnAction} onClick={handleOk}>
            <CheckOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};
