import { NextResponse } from 'next/server';
import { PrintfulService } from '@/lib/services/PrintfulService';

export async function GET() {
  try {
    const printful = new PrintfulService();
    const products = await printful.getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
