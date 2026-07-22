import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const { name, email, phone, company, quantityNeeded, message } = await request.json();

    if (!name || !email || !phone || !quantityNeeded) {
      return NextResponse.json(
        { success: false, error: 'Please provide all required inquiry fields' },
        { status: 400 }
      );
    }

    try {
      await supabase.from('inquiries').insert({
        name,
        email,
        phone,
        company,
        quantity_needed: parseInt(quantityNeeded, 10),
        message,
        status: 'new'
      });
    } catch (dbErr) {
      console.warn('Inquiry DB write fallback:', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for your bulk enquiry! Our eco-gifting team will contact you within 24 hours.'
    });
  } catch (error) {
    console.error('Inquiry Submission Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry' },
      { status: 500 }
    );
  }
}
