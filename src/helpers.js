const INR_TO_ETH = 0.0000077;
const USD_TO_ETH = 0.00063

export const generateRandomValue = () => {
    return Math.floor(Math.random()*1000000)

};

export const convertFiatToEth = (fiatAmount, fiatCurrency) => {

    switch (fiatCurrency) {
        case 'INR':
            return fiatAmount * INR_TO_ETH

        case 'USD':
            return fiatAmount * USD_TO_ETH;
    }

}