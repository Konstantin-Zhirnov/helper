import React from 'react'
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

import { useAppDispatch } from "../../../../shared";
import { fetchCreatePayment } from "../../model/asyncActions";

const options = {
    hidePostalCode: true,
}


const PaymentForm: React.FC = React.memo(() => {
    const stripe = useStripe()
    const elements = useElements()

    const dispatch = useAppDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        })

        if (!error) {
            console.log('paymentMethod', paymentMethod)
            const { id } = paymentMethod
            dispatch(fetchCreatePayment({id, amount: 3}))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement options={options} />
            <button>Pay</button>
        </form>
    )
})

export { PaymentForm }