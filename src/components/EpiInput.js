import React, {useState} from 'react';
import {Button, Col, Form, Input, Row, Spin, Typography} from "antd";
import {fetchMessages, fetchMessagesForQrCode, handlePaymentRequest} from "../api";
import _ from "lodash";
import {generateRandomValue} from "../helpers";
import QRCode from "react-qr-code";
import {CheckCircleTwoTone} from '@ant-design/icons'

const { Title, Text, Link } = Typography;
const EpiInput = ({vendorName, amount, onSuccess}) => {
    let intervalForQrPolling;
    const [epiId, setEpiId] = useState('');
    const [isPaymentMessageProcessing, setIsPaymentMessageProcessing ]= useState(false);
    const [qrCodeValue, setQrCodeValue] = useState('');
    const [showQrCodeButton, setShowQrCodeButton] = useState(true);
    const [paymentMessage, setPaymentMessage] = useState(null);
    const [loadingMessage, setLoadingMessage] = useState('');

    const initialiseQrPaymentFlow = () => {
        const _randomQrId = generateRandomValue();
        setQrCodeValue(JSON.stringify({
            QRId: _randomQrId,
            vendorName,
            amount
        }))
        setShowQrCodeButton(false);
        pollForQrMessages(_randomQrId);

    }
    const pollForQrMessages = (qrPollId) => {
        intervalForQrPolling = setInterval(() => {
            fetchMessagesForQrCode(qrPollId)
                .then(res => {
                    console.log('qr code messages:', res);
                    if (!_.isEmpty(res.messages)) {
                        // clear interval
                        const _messageInFocus = _.get(res, ['messages'])[0];
                        // onStatusChange && onStatusChange(_messageInFocus.status);
                        if (_messageInFocus.status === 'completed') {
                            clearInterval(intervalForQrPolling);
                        }
                    }
                })
                .catch(err => {
                    console.error(err);
                    clearInterval(intervalForQrPolling);
                })
        }, 2000)
    };

    const pollMessagesForCurrentMessage = (targetMessageId, paymentProcessedCallback) => {
        const interval = setInterval(() => {
            fetchMessages(epiId, vendorName)
                .then(({messages: _messages}) => {
                    console.log('poll result', _messages);
                    const _messageInFocus = _.find(_messages, (_message) => {
                        return parseInt( _message.id) === parseInt(targetMessageId);
                    })

                    setPaymentMessage({..._messageInFocus});
                    console.log('_messageInFocus:', _messageInFocus);
                    if (_messageInFocus?.status === 'pending') {
                        setLoadingMessage('Thanks for approving, please wait while the transaction is confirmed on chain');
                    }

                    if (_messageInFocus?.status === 'completed') {
                        paymentProcessedCallback && paymentProcessedCallback()
                    }

                })
                .catch(err => {
                    clearInterval(interval);
                    console.error(err)
                })
        },2000)
    }

    const handleSendPaymentRequest = () => {
        intervalForQrPolling && clearInterval(intervalForQrPolling);
        // send message
        setIsPaymentMessageProcessing(true);
        setLoadingMessage('Sending payment request to your wallet');
        handlePaymentRequest(epiId, vendorName, amount)
            .then(result => {

                setLoadingMessage('Message sent! Please open your EPI wallet and approve the payment');
                // onMessageSent && onMessageSent();
                pollMessagesForCurrentMessage(result?.data?.id, () => {
                    setIsPaymentMessageProcessing(false);
                });
                // start polling messages
            })
    }

    if (paymentMessage && paymentMessage?.status === 'completed') {
        return <div>
            <Row>
                <Col span={12} offset={6} style={{textAlign: 'center'}}>
                    {/*<Icon type='CheckCircle' style={{fontStyle: '128px'}} twoToneColor="#52c41a" />*/}
                    {/*<div style={{margin: '0 auto', fontSize: '132px', color: '#52c41a' }}>*/}

                    <CheckCircleTwoTone style={{margin: '0 auto', fontSize: '132px', color: '#52c41a' }} twoToneColor="#52c41a" />
                    {/*</div>*/}
                </Col>
                <Col span={24}>
                    <Title style={{textAlign: 'center'}} level={1}>
                        Payment Success
                    </Title>
                </Col>
                <Col span={4} offset={10}>
                    <Button onClick={onSuccess}>
                        <Text type='secondary'>
                            Continue
                        </Text>
                    </Button>
                </Col>
            </Row>
        </div>
    }

console.log('paymentMessage', paymentMessage);
    return (
        <div>
            <Spin
                spinning={isPaymentMessageProcessing}
                tip={<Text strong style={{color: '#1890ff'}}>
                    {loadingMessage}
                </Text>}
            >
                <div className='epi-form-container'>
                    <Title level={4} className='method-title'>Pay using EPI ID</Title>
                    <Form onFinish={handleSendPaymentRequest} layout='inline'>
                        <Row className='epi-form-row'>
                            <Col span={20}>
                                <Form.Item>
                                    <Input placeholder='enter your EPI id' onChange={e => {
                                        setEpiId(e.target.value);
                                    }} value={epiId} />
                                </Form.Item>
                            </Col>
                            <Col span={4}>


                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>

                    </Form>
                </div>
                <Row className='epi-qr-container'>
                    <Col span={24}>

                        <Title level={4} className='method-title'>Pay using EPI QR</Title>
                    </Col>

                    <div className='qr-button-container'>
                        {
                            showQrCodeButton &&
                            <Button onClick={initialiseQrPaymentFlow} type='primary'>
                                Show QR Code
                            </Button>
                        }

                    </div>
                    <Col span={12} className='qr-container' style={showQrCodeButton && {
                        filter: 'blur(18px)'
                    }}>


                        <div style={{ height: "auto", maxWidth: 200, width: "100%", paddingTop: '12px' }}>
                            <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={qrCodeValue}
                                viewBox={`0 0 256 256`}
                            />
                        </div>
                    </Col>
                    <Col span={12} className='qr-description'>
                        <Text strong>
                            Scan the Qr using the EPI wallet on your phone
                        </Text>
                        <Text>
                            You can access the EPI wallet here: <Link href="https://ant.design" target="_blank">
                            EPI wallet
                        </Link>
                        </Text>
                    </Col>
                </Row>
            </Spin>
        </div>
    )
};

export default EpiInput;