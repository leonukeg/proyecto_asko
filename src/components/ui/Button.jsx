'use client';

import { motion } from 'framer-motion';
import styles from './Button.module.css';

/**
 * Button
 * Componente UI reutilizable. 
 * Maneja los estados Loading y Disabled.
 */
export default function Button({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  disabled = false,
  onClick,
  ...props 
}) {
  
  if (isLoading) {
    return (
      <button className={`${styles.button} ${styles[variant]} ${styles.disabled}`} disabled>
        <span className={styles.loader}></span> Cargando...
      </button>
    );
  }

  return (
    <motion.button
      className={`${styles.button} ${styles[variant]} ${disabled ? styles.disabled : ''}`}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
}
