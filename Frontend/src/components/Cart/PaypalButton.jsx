import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { data } from 'react-router-dom';

const PaypalButton = ({amount,onSuccess,onError}) => {
  return <PayPalScriptProvider options={{"client-id":import.meta.env.VITE_PAYPAL_CLIENT_ID}}>
    <PayPalButtons style={{layout: "vertical"}  }
    createOrder={(data,actions)=>{
        return actions.order.create({
            purchase_units:[{amount:{value:amount}}],
        });
    }}
    onApprove={(data,actions)=>{
        return actions.order.capture().then(onSuccess);
    }}  
    onError={onError}
    />
  </PayPalScriptProvider>
}

export default PaypalButton


// PayPalScriptProvider-- is used to load the javascript sdk script
// PayPalButtons -- is used for rendering the ui 
