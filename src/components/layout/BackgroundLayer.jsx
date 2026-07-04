'use client';

import { motion } from 'framer-motion';
import styles from './BackgroundLayer.module.css';

export default function BackgroundLayer() {
  const sprayAnimation = {
    hidden: { 
      opacity: 0, 
      clipPath: 'inset(0% 100% 0% 0%)', // Oculto por la derecha
      filter: 'blur(8px)',
      scale: 0.95
    },
    visible: {
      opacity: 0.02,
      clipPath: 'inset(0% 0% 0% 0%)', // Revelado completo
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 2, // Más lento para que parezca que lo están trazando
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={styles.backgroundLayer}>
      <motion.div 
        className={styles.singleLogo}
        custom={1} initial="hidden" animate="visible" variants={sprayAnimation}
      />
    </div>
  );
}
