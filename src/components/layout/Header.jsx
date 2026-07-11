'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import SearchModal from '../ui/SearchModal';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { totalItems, isLoaded } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className={`container ${styles.headerInner}`}>
        <Link href="/home" className={`${styles.logo} ${styles.logoAnimated}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="ASKO Logo" className={styles.logoImage} />
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/drops" className={styles.navLink}>DROPS</Link>
          <Link href="/sobre-nosotros" className={styles.navLink}>ASKO</Link>
        </nav>

        <div className={styles.actions}>
          <button className={styles.iconBtn} onClick={() => setSearchOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </button>
          <Link href="/perfil" className={styles.iconBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          </Link>
          <Link href="/carrito" className={styles.iconBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            {isLoaded && totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
          </Link>
        </div>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setSearchOpen(false)} />
    </motion.header>
  );
}
