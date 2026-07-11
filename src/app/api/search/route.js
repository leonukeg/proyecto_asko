import { NextResponse } from 'next/server';
import { PrintfulService } from '@/lib/services/PrintfulService';

export const dynamic = 'force-dynamic';

const STATIC_PAGES = [
  {
    type: 'page',
    title: 'El Manifiesto (Sobre Nosotros)',
    url: '/sobre-nosotros',
    description: 'Nuestra historia, nuestra actitud y la razón de ser de ASKO.'
  },
  {
    type: 'page',
    title: 'Términos y Condiciones',
    url: '/terminos-y-condiciones',
    description: 'Información legal, envíos, devoluciones y políticas de ASKO.'
  },
  {
    type: 'page',
    title: 'Catálogo de Drops',
    url: '/drops',
    description: 'Explora todos los lanzamientos y nuestro arsenal completo.'
  }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.toLowerCase() || '';

    if (!query) {
      return NextResponse.json({ results: [] });
    }

    const printful = new PrintfulService();
    const allProducts = await printful.getProducts();

    // Buscar en productos
    const matchedProducts = allProducts
      .filter(product => product.name.toLowerCase().includes(query))
      .map(product => ({
        type: 'product',
        id: product.id,
        title: product.name,
        image: product.thumbnail_url,
        price: product.retail_price,
        url: `/producto/${product.id}`
      }));

    // Buscar en páginas estáticas
    const matchedPages = STATIC_PAGES.filter(page => 
      page.title.toLowerCase().includes(query) || 
      page.description.toLowerCase().includes(query)
    );

    const results = [...matchedPages, ...matchedProducts];

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: 'Failed to search' }, { status: 500 });
  }
}
