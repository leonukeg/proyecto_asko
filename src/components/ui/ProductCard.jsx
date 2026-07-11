'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './ProductCard.module.css';

/**
 * ProductCard
 * Componente UI para mostrar un producto.
 */
export default function ProductCard({ product }) {
  if (!product) {
    return (
      <div className={`${styles.card} ${styles.empty}`}>
        <p>Producto no disponible</p>
      </div>
    );
  }

  const imageUrl = product.thumbnail_url || 'https://via.placeholder.com/400x500?text=ASKO';

  return (
    <Link href={`/producto/${product.id}`} style={{ textDecoration: 'none' }}>
      <motion.div 
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.nameContainer}>
          <h3 className={styles.nameVertical}>{product.name}</h3>
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.imageContainer}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageUrl} alt={product.name} className={styles.image} />
          </div>
          <div className={styles.info}>
            <p className={styles.price}>${product.retail_price || '30.00'}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
