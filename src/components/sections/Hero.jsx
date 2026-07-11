'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.scatterContainer}>
        {[1, 2, 3, 4].map((num) => (
          <div 
            key={num} 
            className={`${styles.scatterImage} ${styles[`scatter${num}`]}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={`/asko_${num}.png`} 
              alt={`ASKO Apparel ${num}`} 
            />
          </div>
        ))}
      </div>
      
      <div className={`container ${styles.contentGrid}`}>
        
        {/* BLOQUE IZQUIERDO: TÍTULO GIGANTE */}
        <motion.div 
          className={styles.titleBlock}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
        >
          <div className={styles.seoHidden}>
            <h1>ASKO - Ropa Urbana, Arte Underground y Camisetas con Alma Propia.</h1>
          </div>

          <div className={styles.titleWrapper}>
            <div className="global-page-title glitch" data-text="STREETWEAR">
              STREETWEAR
            </div>
            <div className={`global-page-title glitch ${styles.titleOffset}`} data-text="SIN REGLAS.">
              SIN REGLAS.
            </div>
          </div>
        </motion.div>

        {/* BLOQUE DERECHO: MANIFIESTO Y ACCIÓN */}
        <motion.div 
          className={styles.actionBlock}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
        >
          <h3 className={styles.subtitle}>
            CREAMOS PIEZAS PARA QUIENES NUNCA ENCAJARON.
          </h3>

          <p className={styles.description}>
            Convirtiendo lo cotidiano en extraño y lo grotesco en identidad.<br />
            Diseños originales que rompen el molde de lo correcto.
          </p>

          <div className={styles.actions}>
            <Link href="/drops" className="btn-industrial">
              VER EL ARSENAL
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
