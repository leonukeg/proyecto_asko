'use client';

import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import Button from '../ui/Button';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.grungeOverlay}></div>
      </div>
      
      <div className={`container ${styles.content}`}>
        <motion.div 
          className={styles.textContent}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.tagline}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
            <span className={styles.taglineText}>CAMISETAS CON <span className={styles.highlight}>ALMA PROPIA</span></span>
          </div>

          <h1 className={styles.title}>
            <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}>ASKO Ropa Urbana y Streetwear: </span>
            EXPRESA <br />
            LO QUE <span className={styles.highlight}>ERES</span>
          </h1>

          <p className={styles.description}>
            Camisetas streetwear y diseños originales de artistas <br />
            que rompen moldes.
          </p>

          <div className={styles.actions}>
            <Button>Ver Colecciones →</Button>
          </div>

          <div className={styles.socialProof}>
            <div className={styles.avatars}>
              <div className={styles.avatar}></div>
              <div className={styles.avatar}></div>
              <div className={styles.avatar}></div>
            </div>
            <div className={styles.rating}>
              <span>★★★★★</span> +2.3K clientes
            </div>
          </div>
        </motion.div>

        <motion.div 
          className={styles.visualContent}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {/* Aquí iría la imagen grande del modelo con la camiseta ASKO */}
          <div className={styles.badgeContainer}>
            <motion.div 
              className={styles.circularBadge}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            >
              <svg viewBox="0 0 100 100" width="100" height="100">
                <defs>
                  <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <text fontSize="11" fill="#fff" letterSpacing="2">
                  <textPath href="#circle">
                    ARTE INDEPENDIENTE • SIN COPIAS •
                  </textPath>
                </text>
              </svg>
              <div className={styles.badgeIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--color-primary)"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path></svg>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
