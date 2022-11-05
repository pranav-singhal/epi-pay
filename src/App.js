import "antd/dist/antd.css";
import './App.scss';
import EpiPay from "./EpiPay";
import {useState} from "react";
import {Spin} from "antd";

function App() {

    const amount = 0.00001;
    const [messageSent, setIsMessageSent] = useState(false);
    const [txStatus, setTxStatus] = useState('');

  return (
    <div className="App">
     <h1> pay {amount} ETH using epi</h1>

      <EpiPay
          vendorName='vendor'
          amount={amount}
          enableQR
          onMessageSent={() => {
              setIsMessageSent(true);
              console.log('please accept the payment request on your phone')
          }}
          onStatusChange={(status) => {
              setTxStatus(status);
              console.log('transaction status: ', status);
          }}
          onSuccess={() => {
              setTxStatus('completed');
              console.log('payment successful');
          }}
          onCancel={() => {
              // handle cancel
          }}
          brandName={'Meat Story'}
      />

        {
            messageSent && txStatus === 'unconfirmed' &&
            <div>
                Please accept the payment on your phone
                <Spin />
            </div>
        }

        {
            txStatus === 'pending' &&
            <div>
                Thanks for approving the payment, please wait while we confirm
                on chain completion
            </div>
        }

        {
            txStatus === 'completed' &&
            <div>
                transaction successfully completed
            </div>
        }

    </div>
  );
}

export default App;
