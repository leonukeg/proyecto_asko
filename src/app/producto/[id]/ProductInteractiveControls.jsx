'use client';

import { useState } from 'react';
import styles from './ProductPage.module.css';

export default function ProductInteractiveControls({ product, variants }) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Extraemos la talla del nombre (Printful suele poner "(Black / L)" o "- XL")
  const getSizeFromName = (name) => {
    const match = name.match(/\/\s*([a-zA-Z0-9]+)\)$/) || name.match(/-\s*([a-zA-Z0-9]+)$/);
    if (match && match[1]) {
      return match[1];
    }
    // Si no encuentra el patrón, devuelve la última palabra limpiando símbolos
    const parts = name.split(' ');
    return parts[parts.length - 1].replace(/[^a-zA-Z0-9]/g, '') || name;
  };

  const handleCheckout = async () => {
    if (!selectedVariant) {
      alert("¡ELIGE UNA TALLA PRIMERO!");
      return;
    }

    setIsCheckingOut(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: [{ 
            name: selectedVariant.name, 
            price: selectedVariant.retail_price || '30.00', 
            image: product.thumbnail_url || 'https://via.placeholder.com/400x500?text=ASKO',
            variant_id: selectedVariant.id // Enviamos esto al checkout para Printful
          }] 
        })
      });
      
      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error("Error during checkout:", err);
      alert("SE JODIÓ LA CONEXIÓN AL BANCO. INTENTA DE NUEVO.");
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <div className={styles.sizesGrid}>
        {variants?.map((variant) => (
          <button 
            key={variant.id}
            className={`${styles.sizeButton} ${selectedVariant?.id === variant.id ? styles.selected : ''}`}
            onClick={() => setSelectedVariant(variant)}
          >
            {getSizeFromName(variant.name)}
          </button>
        ))}
      </div>

      <button 
        className={styles.buyButton}
        onClick={handleCheckout}
        disabled={isCheckingOut}
        style={{ opacity: isCheckingOut ? 0.5 : 1 }}
      >
        {isCheckingOut ? 'PROCESANDO...' : 'HAZLO TUYO'}
      </button>
    </>
  );
}
