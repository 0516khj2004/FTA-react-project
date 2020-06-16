import React, {useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import OpenService from './Open-service'
import { notification } from 'antd';
import ServerStart from './ServerStart'

// import {openuploadA} from '../util/APIUtils'

import CircularProgress from '@material-ui/core/CircularProgress';


const ModalExample = (props) => {
  
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  


  const openupload= () => {
    OpenService.openupload(props.userport,props.username, props.userkey);
    toggle();
    notification.success({
      message: 'file to api',
      description: "open api 생성!",
    });
    
    
  }

  const serviceStart = () => {
    ServerStart.serviceStart(props.username, props.userport);
    // console.log(props.userport)
   toggle();    
  }

  return (
    <div className="btn-container">
      <Button className="openbtn"  outline color="danger" size="lg" onClick={serviceStart}>My API 서버 시작</Button>
      <Modal isOpen={modal} modalTransition={{ timeout: 500 }} backdropTransition={{ timeout: 800 }}
        toggle={toggle} >
        <ModalHeader toggle={toggle}> My API 서비스 시작</ModalHeader>
        <ModalBody>
            {props.userfiles}
            파일로 api 서비스를 생성합니다.
        </ModalBody>
        <ModalFooter>
        <CircularProgress variant="determinate"/>
          <Button color="primary" onClick={openupload} >My API 서비스 시작
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default withRouter(ModalExample);

