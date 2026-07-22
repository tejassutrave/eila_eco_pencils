import { NextResponse } from 'next/server';
import { supabase, INITIAL_CATEGORIES } from '@/lib/supabase';

export async function GET(request) {
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('*');

    if (!error && categories && categories.length > 0) {
      return NextResponse.json({
        success: true,
        data: categories
      });
    }

    return NextResponse.json({
      success: true,
      data: INITIAL_CATEGORIES
    });
  } catch (err) {
    return NextResponse.json({
      success: true,
      data: INITIAL_CATEGORIES
    });
  }
}
