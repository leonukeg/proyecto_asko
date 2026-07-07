'use client';

import { useState } from 'react';
import ProductCard from '@/components/ui/ProductCard';
import styles from '@/app/page.module.css';

export default function ProductGrid({ initialProducts }) {
  const [checkoutLoadingId, setCheckoutLoadingId] = useState(null);

  const handleAddToCart = async (product) => {
    setCheckoutLoadingId(product.id);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: [{ 
            name: product.name, 
            price: product.retail_price, 
            image: product.thumbnail_url || 'https://via.placeholder.com/400x500?text=ASKO'
          }] 
        })
      });
      
      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error("Error during checkout:", err);
      alert("Hubo un problema al procesar tu pago.");
    } finally {
      setCheckoutLoadingId(null);
    }
  };

  if (!initialProducts || initialProducts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h3>No hay productos disponibles por ahora.</h3>
        <p>Vuelve pronto para ver nuestras nuevas colecciones de ropa urbana.</p>
      </div>
    );
  }

  return (
    <div className={styles.productGrid}>
      {initialProducts.map(product => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={handleAddToCart}
          isLoadingAction={checkoutLoadingId === product.id}
        />
      ))}
    </div>
  );
}
