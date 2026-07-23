import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fullName,
      phone,
      email,
      address,
      city,
      pincode,
      estimatedWeightKg,
      preferredPickupDate,
      notes,
    } = body;

    if (!fullName || !phone || !email || !address || !city || !pincode || !estimatedWeightKg) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all mandatory contact & pickup address fields.' },
        { status: 400 }
      );
    }

    const weightNum = parseFloat(estimatedWeightKg);
    if (isNaN(weightNum) || weightNum <= 0) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid newspaper weight in kg.' },
        { status: 400 }
      );
    }

    const donationRefId = `DON-${Math.floor(100000 + Math.random() * 900000)}`;
    const estimatedPencils = Math.round(weightNum * 10); // 1kg ~ 10 pencils
    const estimatedTreesSaved = (weightNum * 0.015).toFixed(1); // 1kg ~ 0.015 trees

    let dbSuccess = false;
    try {
      const { data, error } = await supabase.from('newspaper_donations').insert({
        full_name: fullName,
        phone,
        email,
        address,
        city,
        pincode,
        estimated_weight_kg: weightNum,
        preferred_pickup_date: preferredPickupDate || null,
        notes: notes || '',
        status: 'pending_pickup',
      }).select();

      if (!error) {
        dbSuccess = true;
      } else {
        console.warn('Supabase DB Insert Note (table might be pending creation):', error.message);
      }
    } catch (dbErr) {
      console.warn('Supabase DB connection note:', dbErr.message);
    }

    return NextResponse.json({
      success: true,
      donationId: donationRefId,
      dbSaved: dbSuccess,
      message: `Thank you, ${fullName}! Your doorstep newspaper pickup request has been received.`,
      summary: {
        weightKg: weightNum,
        estimatedPencils,
        estimatedTreesSaved,
        pickupDate: preferredPickupDate || 'Within 2-3 business days',
        discountVoucher: 'ECORECYCLE15',
      },
    });
  } catch (error) {
    console.error('Donation Submission Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process newspaper donation request.' },
      { status: 500 }
    );
  }
}
