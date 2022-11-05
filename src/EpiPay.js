import React from "react";
import {Col, PageHeader, Row} from "antd";
import {useState} from "react";
import "./App.scss";

import MethodSelector from "./components/MethodSelector";
import EpiInput from "./components/EpiInput";
import {convertFiatToEth} from "./helpers";
const PAGES = {
    METHOD_SELECTOR: {
        name: 'method-selector',
        Component: MethodSelector
    },
    EPI_INPUT: {
        name: 'epi-input',
        Component: EpiInput
    }
};

const EpiPay = ({
                    vendorName,
                    onStatusChange,
                    onSuccess,
                    onRejection,
                    onMessageSent,
                    amount,
                    currency,
                    enableQR,
                    brandName
}) => {

    const amountInEth = convertFiatToEth(amount, currency)

    const [currentPage, setCurrentPage] = useState(PAGES.METHOD_SELECTOR);

    // check with api if vendor name is registered
    if (!vendorName) {
        return <div>
            no valid vendor provided
        </div>
    }

const CurrentPageComponent = currentPage.Component;

    return (
        <Row className="epi-container">
            <PageHeader
                className="site-page-header"
                onBack={() => setCurrentPage(PAGES.METHOD_SELECTOR)}
                title={<div>
                    {/*TODO - add vendor logo */}
                    {brandName}
            </div>}
                subTitle={<div>
                    Amount: &nbsp;
                    {/*TODO - add eth logo*/}
                    {amountInEth} ETH
                </div>}
            >
            </PageHeader>
            <Col span={24}>
            <CurrentPageComponent
                onSuccess={onSuccess}
                vendorName={vendorName}
                amount={amountInEth}
                onEpiSelect={() => {
                    setCurrentPage(PAGES.EPI_INPUT)
                }}
            />
            </Col>
        </Row>
    );
}

export default EpiPay;