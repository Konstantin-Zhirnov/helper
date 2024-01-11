import {Injectable} from '@nestjs/common';
import Stripe from 'stripe';

import {CreatePaymentDto} from "./dto/create-payment.dto";

@Injectable()
export class StripeService {
    private readonly stripe: Stripe;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {});
    }

    async createPayment(createPaymentDto: CreatePaymentDto): Promise<Stripe.PaymentIntent> {
        return await this.stripe.paymentIntents.create({
            payment_method: createPaymentDto.id,
            amount: createPaymentDto.amount,
            currency: 'CAD',
            description: 'Account payment per month',
            confirm: true
        });
    }
}
