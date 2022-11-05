import React from 'react';
import {Col, Row, Typography} from "antd";
import {RightOutlined} from "@ant-design/icons";
import "../App.scss"
const { Title } = Typography;
const MethodSelector = ({initialisePaymentFlow, onEpiSelect}) => {
return (
    <Row>
        <Col span={24}>
            <Title level={4} className='method-title'>Pay using EPI</Title>

            <Row onClick={onEpiSelect} style={{alignItems: 'center'}} className='method-row'>
                <Col span={3} className='method-image-container'>
                    <img src="https://picsum.photos/200/300.jpg" alt="" className='method-image'/>
                </Col>
                <Col span={8}>
                    <Title className='method-description' level={5}> UPI/ QR</Title>
                </Col>
                <Col span={2} offset={11}>
                    <RightOutlined />
                </Col>

            </Row>

        </Col>

        <Col span={24}>
            <Title level={4} className='method-title'>Pay using Other Wallets</Title>

            <Row onClick={initialisePaymentFlow} style={{alignItems: 'center'}} className='method-row'>
                <Col span={3} className='method-image-container'>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="" className='method-image'/>
                </Col>
                <Col span={8}>
                    <Title className='method-description' level={5}> Metamask</Title>
                </Col>
                <Col span={2} offset={11}>
                    <RightOutlined />
                </Col>

            </Row>

        </Col>
    </Row>
)
}

export default MethodSelector;