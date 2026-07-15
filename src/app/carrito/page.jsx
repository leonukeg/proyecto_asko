'use client';

import { useCart } from '@/context/CartContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './page.module.css';
import { useState } from 'react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice, isLoaded } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            size: item.size,
            price: item.price,
            image: item.image,
            selectedVariantId: item.variant_id,
            quantity: item.quantity
          }))
        })
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Error de Stripe: " + (data.error || "Error desconocido al conectar con el banco."));
        setIsProcessing(false);
      }
    } catch (err) {
      console.error("Error during checkout:", err);
      alert("SE JODIÓ LA CONEXIÓN. INTENTA DE NUEVO.");
      setIsProcessing(false);
    }
  };

  if (!isLoaded) return null; // Avoid hydration mismatch

  return (
    <main className={styles.main}>
      <Header />
      
      <div className={`container ${styles.cartContainer}`}>
        <div className="global-title-wrapper">
          <h1 className="global-page-title glitch" data-text="TU ARSENAL">TU ARSENAL</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className={styles.emptyState}>
            <h2>ESTÁ MÁS VACÍO QUE TUS ARGUMENTOS.</h2>
            <Link href="/drops" className="btn-industrial">
              BUSCAR MUNICIÓN
            </Link>
          </div>
        ) : (
          <div className={styles.cartGrid}>
            <div className={styles.itemsList}>
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div 
                    key={`${item.id}-${item.size}`}
                    className={styles.cartItem}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    layout
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                    
                    <div className={styles.itemInfo}>
                      <h3 className={styles.itemName}>{item.name.toUpperCase()}</h3>
                      <p className={styles.itemSize}>TALLA: {item.size}</p>
                      <p className={styles.itemPrice}>${item.price}</p>
                    </div>

                    <div className={styles.itemControls}>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className={styles.qtyButton}
                      >
                        -
                      </button>
                      <span className={styles.qtyNumber}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className={styles.qtyButton}
                      >
                        +
                      </button>
                    </div>

                    <div className={styles.itemTotal}>
                      ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.id, item.size)}
                      className={styles.removeButton}
                      title="Eliminar"
                    >
                      X
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className={styles.summaryPanel}>
              <h2 className={styles.summaryTitle}>TICKET DE COMPRA</h2>
              
              <div className={styles.summaryLine}>
                <span>SUBTOTAL</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className={styles.summaryLine}>
                <span>ENVÍO</span>
                <span>Calculado en checkout</span>
              </div>
              
              <div className={styles.summaryTotal}>
                <span>TOTAL</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <button 
                className={`btn-industrial ${styles.checkoutButton}`}
                disabled={cartItems.length === 0 || isProcessing}
                onClick={handleCheckout}
              >
                {isProcessing ? 'CONECTANDO...' : 'PAGAR AHORA'}
              </button>

              <div className={styles.paymentMethods}>
                <span className={styles.secureText}>PAGO SEGURO POR STRIPE</span>
                <div className={styles.badges}>
                  <span className={styles.badge}>VISA</span>
                  <span className={styles.badge}>MC</span>
                  <span className={styles.badge}>AMEX</span>
                  <span className={styles.badge}>APPLE PAY</span>
                  <span className={styles.badge}>G PAY</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
