import React, { useState, useEffect } from "react";
import { message } from "antd";
import axios from "../../Axios/Axios";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";





function PayPalButton({selectedDate,token,schedulTime,doctorId,consultationFees,setShowPaypal,handleCloseModal} ) {
   
    const [paymentComplete, setPaymentComplete] = useState(false);
 const navigate = useNavigate()
    const client = JSON.parse(localStorage.getItem("clientToken"));
    const clientToken = client.clientToken;
  
  
    const paypalOptions = {
      "client-id":"AR9rPCNyMwEXNemm95XvdI32AEqLbAxrtV0Q1MLtScf_hvTo81IBAsiMiuiyY3oMI8WejvaXwZYbzRFr",
    };
  
    const createOrder = (data, actions) => {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code:'USD',
              value: consultationFees,
            },
          },
        ],
        applicaton_context:{
          shipping_context:"NO_SHIPPING"
        }
      })
      .then((orderID) => {
        return orderID
      })
    };
    const onApprove =  (data, actions) => {
      return actions.order.capture().then(function (details){
        console.log(details,"detailsssssssss");
        setPaymentComplete(true);
      //   console.log(notification._id );
  console.log(schedulTime,"ttttttttttttttttt");
      axios
      .post("/postAppointment", {
        date: selectedDate,
        time: schedulTime,
        token:token,
        doctor: doctorId,
        consultationFees:consultationFees,
      },
      { headers: { accesstoken: clientToken } }
      
      )
      .then((response) => {
        console.log(response, "responseeee");
        const result = response.data;
        
        if (result.success) {
          setShowPaypal(false)
          handleCloseModal()
          navigate('/clientAppHistory');
          message.success(result.message);
        } else {
          message.error(result.message).then(() => {});
        }
      });

      })
   
    };
    const onError = (data,actions) => {
      message.error("An error occured with your payment")
    }
  
  return (
    <div className="w-44 ">
                    {!paymentComplete && (
                      <PayPalScriptProvider options={{"client-id":"AR9rPCNyMwEXNemm95XvdI32AEqLbAxrtV0Q1MLtScf_hvTo81IBAsiMiuiyY3oMI8WejvaXwZYbzRFr"}}>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                         onError={onError}
                        />
                      </PayPalScriptProvider>
                    )}
                    {paymentComplete && <p>Payment complete!</p>}
                  </div>
  )
}

export default PayPalButton
