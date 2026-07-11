'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './page.module.css';

export default function IntroPage() {
  return (
    <main className={styles.introContainer}>
      <Link href="/home" className={styles.introLink}>
        <motion.div 
          className={styles.logoWrapper}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="ASKO Logo" className={styles.logo} />
        </motion.div>
      </Link>
    </main>
  );
}
