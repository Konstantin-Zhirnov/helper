import {Body, Controller, Post} from '@nestjs/common';

import { StripeService } from './stripe.service';
import {CreatePaymentDto} from './dto/create-payment.dto';

@Controller()
export class StripeController {
    constructor(private readonly stripeService: StripeService) {}

    @Post('create-payment')
    async createPayment(@Body() createPaymentDto: CreatePaymentDto,): Promise<any> {
        const paymentIntent = await this.stripeService.createPayment(createPaymentDto);
        return { client_secret: paymentIntent.client_secret };
    }
}
