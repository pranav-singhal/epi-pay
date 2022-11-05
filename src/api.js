export const BASE_URL = 'https://wallet-api-a.herokuapp.com';

export const fetchMessages = (epiId, vendor) => {
    return fetch(`${BASE_URL}/messages?sender=${vendor}&recipient=${epiId}`)
        .then(res => res.json())
};

export const fetchMessagesForQrCode = (qrCode) => {
    return fetch(`${BASE_URL}/messages?qrcode=${qrCode}`)
        .then(res => res.json())
}

export const handlePaymentRequest = (epiId, vendor, amount) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    return fetch(`${BASE_URL}/message`, {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({
            type: 'request',
            sender: vendor,
            recipient: epiId,
            txDetails: {
                amount
            }
        }),
    })
        .then(response => response.json())
}
