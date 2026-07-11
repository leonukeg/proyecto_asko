'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './ProductPage.module.css';

export default function ProductInteractiveControls({ product, variants }) {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

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

  const handleAddToCart = () => {
    if (!selectedVariant) {
      alert("¡ELIGE UNA TALLA PRIMERO!");
      return;
    }

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: selectedVariant.retail_price || '30.00',
        image: product.thumbnail_url || 'https://via.placeholder.com/400x500?text=ASKO',
        variant_id: selectedVariant.id
      },
      getSizeFromName(selectedVariant.name),
      1
    );

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
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
        className="btn-industrial"
        onClick={handleAddToCart}
        style={{ backgroundColor: isAdded ? 'var(--color-primary)' : '', width: '100%', marginTop: 'var(--spacing-lg)' }}
      >
        {isAdded ? '¡EN TU ARSENAL!' : 'AÑADIR AL ARSENAL'}
      </button>
    </>
  );
}
