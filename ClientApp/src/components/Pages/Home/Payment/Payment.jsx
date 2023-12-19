import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./payment.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);

export default function Payment({totalCost,selectedPlanId, addonIds,moneyt,formSubmit}) {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("api/PaymentApi/intent-req", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: { id: selectedPlanId ,Amount:String(totalCost),addonIds,moneytype:moneyt } }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [selectedPlanId,totalCost,addonIds,moneyt]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="Apppmnt">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm formSubmit={formSubmit} />
        </Elements>
      )}
    </div>
  );
}