'use client';

import { motion } from 'framer-motion';
import styles from './ProductCard.module.css';
import Button from './Button';

/**
 * ProductCard
 * Componente UI para mostrar un producto.
 * Implementa 4 estados de borde indirectamente (Empty, Overflow truncado en CSS).
 */
export default function ProductCard({ product, onAddToCart, isLoadingAction = false }) {
  if (!product) {
    return (
      <div className={`${styles.card} ${styles.empty}`}>
        <p>Producto no disponible</p>
      </div>
    );
  }

  const imageUrl = product.thumbnail_url || 'https://via.placeholder.com/400x500?text=ASKO';

  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className={styles.imageContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt={product.name} className={styles.image} />
        <div className={styles.overlay}>
          <Button onClick={() => onAddToCart(product)} isLoading={isLoadingAction}>
            Agregar
          </Button>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.price}>${product.retail_price}</p>
      </div>
    </motion.div>
  );
}
