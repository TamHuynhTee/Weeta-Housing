import React from 'react';
import styles from './styles.module.css';

interface IProps {
  children: React.ReactElement;
  isVisible: boolean;
  closeModal: (value: boolean) => void;
}

const ContainerModal = (props: IProps) => {
  const { isVisible, children, closeModal } = props;
  return (
    <React.Fragment>
      {isVisible && (
        <div
          onClick={() => closeModal(true)}
          className={styles.overlayModal}
        ></div>
      )}
      <div className={isVisible ? styles.modalVisible : styles.modal}>
        {children}
      </div>
    </React.Fragment>
  );
};

export default ContainerModal;
