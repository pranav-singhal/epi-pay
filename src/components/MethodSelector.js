import React from 'react';
import {Col, Row, Tag, Typography} from "antd";
import {RightOutlined} from "@ant-design/icons";
import "../App.scss"
import logo from '../assets/images/epi-logo-minimal.png'
const { Title } = Typography;

const MethodSelector = ({initialisePaymentFlow, onEpiSelect}) => {
return (
    <Row>
        <Col span={24}>
            <Title level={4} className='method-title'>Pay using EPI</Title>

            <Row onClick={onEpiSelect} style={{alignItems: 'center'}} className='method-row'>
                <Col span={3} className='method-image-container'>
                    <img src={logo} alt="" className='method-image'/>
                </Col>
                <Col span={8}>
                    <Title className='method-description' level={5}> EPI/ QR</Title>
                </Col>
                <Col span={2} offset={11}>
                    <RightOutlined />
                </Col>

            </Row>

        </Col>

        <Col span={24}>
            <Title level={4} className='method-title'>Pay using Other Wallets</Title>

            <Row onClick={initialisePaymentFlow} style={{alignItems: 'center', marginBottom: 4}} className='method-row'>
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

            <Row onClick={initialisePaymentFlow} style={{alignItems: 'center'}} className='method-row'>
                <Col span={3} className='method-image-container'>
                    <img src="https://play-lh.googleusercontent.com/HqR6E8DMeawiojvVU0d4yaHFvzKf6Z86FTc8Eqmx5JUxR9id_58DBucCYgoY5ie_FN84" alt="" className='method-image'/>
                </Col>
                <Col span={8}>
                    <Title className='method-description' level={5}> Wallet Connect</Title>
                </Col>
                <Col span={10}>
                    <Tag color="processing">Coming soon</Tag>
                </Col>
                <Col span={2} offset={1}>
                    <RightOutlined />
                </Col>


            </Row>

        </Col>
    </Row>
)
}

export default MethodSelector;