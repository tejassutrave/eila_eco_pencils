import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request) {
  try {
    const { amount, currency = 'INR', customerName, customerEmail } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    // Check if Razorpay keys are configured (or use fallback mock order for testing)
    if (!key_id || !key_secret || key_id.includes('mock_key')) {
      const mockOrderId = 'order_mock_' + Math.random().toString(36).substring(2, 10);
      return NextResponse.json({
        success: true,
        order_id: mockOrderId,
        amount: Math.round(amount * 100),
        currency,
        key_id: key_id || 'rzp_test_mock',
        is_mock: true
      });
    }

    const instance = new Razorpay({ key_id, key_secret });

    const options = {
      amount: Math.round(amount * 100), // amount in paise
      currency,
      receipt: `rcpt_${Date.now().toString().slice(-8)}`,
      notes: {
        customer_name: customerName || 'Valued Customer',
        customer_email: customerEmail || 'customer@example.com'
      }
    };

    const razorpayOrder = await instance.orders.create(options);

    return NextResponse.json({
      success: true,
      order_id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key_id
    });
  } catch (error) {
    console.error('Razorpay Create Order Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
