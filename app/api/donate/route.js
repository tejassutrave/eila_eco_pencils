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
      const todayDate = new Date().toISOString().split('T')[0];
      const { data, error } = await supabase.from('donations').insert({
        donor_name: fullName,
        donor_phone: phone,
        donor_email: email,
        pickup_address: address,
        city: city || 'Dharwad',
        state: 'Karnataka',
        pincode: pincode,
        weight_estimate: weightNum,
        preferred_date: preferredPickupDate || todayDate,
        preferred_slot: 'Morning (9 AM - 12 PM)',
        status: 'pending',
      }).select();

      if (!error) {
        dbSuccess = true;
      } else {
        console.warn('Supabase DB Insert Note:', error.message);
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

export async function GET(request) {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase Donations Fetch Note:', error.message);
      return NextResponse.json({ success: true, data: [] });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Donation Fetch Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch donations' },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Missing donation id or status' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('donations')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) {
      console.warn('Supabase Donation Status Update Note:', error.message);
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Donation Update Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update donation status' },
      { status: 500 }
    );
  }
}
