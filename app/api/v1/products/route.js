import { NextResponse } from 'next/server';
import { supabase, INITIAL_PRODUCTS } from '@/lib/supabase';

export async function GET(request) {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*, categories(name, slug)')
      .eq('active', true);

    if (!error && products && products.length > 0) {
      return NextResponse.json({
        success: true,
        data: products
      });
    }

    return NextResponse.json({
      success: true,
      data: INITIAL_PRODUCTS
    });
  } catch (err) {
    return NextResponse.json({
      success: true,
      data: INITIAL_PRODUCTS
    });
  }
}
