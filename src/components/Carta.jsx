import React from 'react';
import styles from './Carta.module.css';

const Carta = ({ virada, encontrada, imagem, verso, aoClicar }) => (
  <div
    className={`${styles.carta} ${encontrada ? styles.encontrada : ''}`}
    onClick={aoClicar}
  >
    {(virada || encontrada) ? (
      <img src={imagem} alt="Carta" className={styles.cartaFace} />
    ) : (
      <img src={verso} alt="Verso da carta" className={styles.cartaFace} />
    )}
  </div>
);

export default Carta;