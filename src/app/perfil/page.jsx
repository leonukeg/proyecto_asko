'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from './page.module.css';

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: ''
  });

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Cargar datos del localStorage al iniciar
    const savedData = localStorage.getItem('asko_user_profile');
    if (savedData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setIsSaved(false); // Si hay cambios, quitamos el mensaje de "Guardado"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('asko_user_profile', JSON.stringify(formData));
    setIsSaved(true);
    
    // Ocultar el mensaje de éxito después de 3 segundos
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  return (
    <main className={styles.main}>
      <Header />
      
      <section className={`container ${styles.profileSection}`}>
        <div className="global-title-wrapper">
          <h1 className="global-page-title glitch" data-text="MI PERFIL">MI PERFIL</h1>
          <p className={styles.subtitle}>ESTADO DEL OPERATIVO: ACTIVO</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.formContainer}>
          
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Datos Personales</h2>
            <div className={styles.inputGrid}>
              <div className={styles.inputGroup}>
                <label htmlFor="firstName">Nombre</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="lastName">Apellido</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="phone">Teléfono</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+34 600 000 000"
                />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Dirección de Envío</h2>
            <div className={styles.inputGrid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label htmlFor="address">Dirección completa</label>
                <input 
                  type="text" 
                  id="address" 
                  name="address" 
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Calle, número, piso, puerta..."
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="city">Ciudad</label>
                <input 
                  type="text" 
                  id="city" 
                  name="city" 
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Tu ciudad"
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="zipCode">Código Postal</label>
                <input 
                  type="text" 
                  id="zipCode" 
                  name="zipCode" 
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="00000"
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="country">País</label>
                <input 
                  type="text" 
                  id="country" 
                  name="country" 
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="España"
                />
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" className="btn-industrial">
              ACTUALIZAR PROTOCOLO
            </button>
            {isSaved && <span className={styles.successMessage}>¡Datos guardados con éxito!</span>}
          </div>

        </form>
      </section>

      <Footer />
    </main>
  );
}
