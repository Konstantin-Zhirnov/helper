import React from 'react'
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";

import {PaymentForm} from "../../../features";


const Payment: React.FC = React.memo(() => {

    const stripePromise = loadStripe('pk_live_51OOpxmKpziiITh1KXgDxG8tiVbijpBlJdQ2bRYc3x8jc9RH2X0fWljOrTfmxQS2A6TugNb99q9tx63MVk62n185i004fPF6lKO')

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm />
        </Elements>
    )
})

export { Payment }