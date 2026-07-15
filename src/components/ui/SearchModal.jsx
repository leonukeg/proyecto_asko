import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './SearchModal.module.css';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus input
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (query.length > 2) {
        setIsSearching(true);
        try {
          const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          const data = await res.json();
          setResults(data.results || []);
        } catch (error) {
          console.error("Error searching:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setResults([]);
      }
    }, 300); // Debounce

    return () => clearTimeout(searchTimeout);
  }, [query]);

  const handleResultClick = (url) => {
    onClose();
    router.push(url);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className={styles.overlay}
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(15px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
        >
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={onClose}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </button>

            <div className={styles.searchContainer}>
              <input 
                ref={inputRef}
                type="text" 
                className={styles.searchInput}
                placeholder="BUSCAR..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              
              <div className={styles.resultsContainer}>
                {isSearching && <div className={styles.loading}>RASTREANDO...</div>}
                
                {!isSearching && query.length > 2 && results.length === 0 && (
                  <div className={styles.noResults}>NO SE ENCONTRÓ NADA. VUELVE A INTENTAR.</div>
                )}

                {!isSearching && results.length > 0 && (
                  <motion.ul 
                    className={styles.resultsList}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {results.map((result, idx) => (
                      <motion.li 
                        key={`${result.type}-${result.id || idx}`}
                        className={styles.resultItem}
                        onClick={() => handleResultClick(result.url)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        {result.type === 'product' ? (
                          <div className={styles.productResult}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {result.image && <img src={result.image} alt={result.title} className={styles.resultImage} />}
                            <div className={styles.resultInfo}>
                              <h3 className={styles.resultTitle}>{result.title}</h3>
                              <span className={styles.resultPrice}>€{result.price}</span>
                            </div>
                          </div>
                        ) : (
                          <div className={styles.pageResult}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                              <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                            <div className={styles.resultInfo}>
                              <h3 className={styles.resultTitle}>{result.title}</h3>
                              <p className={styles.resultDesc}>{result.description}</p>
                            </div>
                          </div>
                        )}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
