'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import ProductCard from '@/components/ui/ProductCard';
import styles from './page.module.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkoutLoadingId, setCheckoutLoadingId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Failed to load products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  return (
    <main className={styles.main}>
      <Header />
      <Hero />
      
      <section id="colecciones" className={`container ${styles.section}`}>
        
        {/* State: Loading */}
        {isLoading && (
          <div className={styles.productGrid}>
            {[1, 2, 3, 4].map(n => (
              <div key={n} style={{ height: '400px', backgroundColor: 'var(--color-background-elevated)', borderRadius: 'var(--radius-md)', animation: 'pulse 2s infinite' }}></div>
            ))}
          </div>
        )}

        {/* State: Error */}
        {error && !isLoading && (
          <div className={styles.errorState}>
            <h3>Error al cargar las colecciones</h3>
            <p>{error}</p>
          </div>
        )}

        {/* State: Empty */}
        {!isLoading && !error && products.length === 0 && (
          <div className={styles.emptyState}>
            <h3>No hay productos disponibles por ahora.</h3>
            <p>Vuelve pronto para ver nuestras nuevas colecciones.</p>
          </div>
        )}

        {/* State: Data */}
        {!isLoading && !error && products.length > 0 && (
          <div className={styles.productGrid}>
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart}
                isLoadingAction={checkoutLoadingId === product.id}
              />
            ))}
          </div>
        )}
      </section>
      
      <Footer />
    </main>
  );
}
