import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm({formSubmit}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const data=await formSubmit();
    if(data === "Error"){
      alert("failed to submit your Application please retry")
      setIsLoading(false);
      return;
    }
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `${process.env.REACT_APP_FRONTEND_BASE_URL}/paymentsucess?formid=${data}`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      alert(result.error.message);
      failedpayment(data);

    }
    // --------If Want to stay on same page dont want to redirect-------------
    // const { paymentIntent, error } = await stripe.confirmPayment({
    //   elements,
    //   confirmParams: {
    //     return_url: "https://localhost:44471/paymentsucess?formid=sms",
    //   },
    //     redirect:'if_required'
    // });
    // if (error?.type === "card_error" || error?.type === "validation_error") {
    //   setMessage(error.message);
    // }else if (paymentIntent && paymentIntent.status === "succeeded") {
    //   alert("Payment successful! Transaction ID: " + paymentIntent.id);
    // } else {
    //   setMessage("An unexpected error occurred.");
    // }

    setIsLoading(false);
  };
  
  const failedpayment = async (idf) => {
    // setSubmiting(true);
    var datatosend = {
        id: idf,
    }
    const option = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({Id:idf})

    }
    const response = await fetch("api/UserApplication/pending-application-ps", option);
    if (response.ok) {
        // navigate('/users-applications');
    } else {
        // Status code is outside the range 200-299
        console.log('Error:', response.status, response.messge);
    }
}

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>

      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button className="button-strip" disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}