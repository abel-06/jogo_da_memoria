import React, { useEffect, useState } from 'react';

import styles from './GameMemory.module.css';

import versoCarta from '../assets/VersoCarta.jpeg';

import Carta from './Carta';

//imagens
import img1 from '../assets/Charizard.jpeg';
import img2 from '../assets/Dragonite.jpeg';
import img3 from '../assets/Jiggypluff.jpeg';
import img4 from '../assets/Eevee.jpeg';
import img5 from '../assets/Pikachu.jpeg';
import img6 from '../assets/MeoTwo.jpeg';
import img7 from '../assets/Greninja.jpeg';
import img8 from '../assets/Magikarp.jpeg';
import img9 from '../assets/Lucario.jpeg';
import img10 from '../assets/Trio.jpeg';




const pares = [
  { imagem: img1 },
  { imagem: img2 },
  { imagem: img3 },
  { imagem: img4 },
  { imagem: img5 },
  { imagem: img6 },
  { imagem: img7 },
  { imagem: img8 },
  { imagem: img9 },
  { imagem: img10 },
]

function embaralhar(array) {
  const NovoArray = [...array];
  for (let i = NovoArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [NovoArray[i], NovoArray[j]] = [NovoArray[j], NovoArray[i]];
  }
  return NovoArray;
}

const GameMemory = ({setTela}) => {
  const cartasBase = pares.flatMap((par, idx) => [
    {id: idx * 2, imagem: par.imagem, virada: false, encontrada: false},
    {id: idx * 2 + 1, imagem: par.imagem, virada: false, encontrada: false}
  ])

  const [cartas, setCartas] = useState([]);
  const [selecionadas, setSelecionadas] = useState([]);
  const [tentativas, setTentativas] = useState(0);

  useEffect(() => {
    setCartas(embaralhar(cartasBase));
     console.log(embaralhar(cartasBase))
  }, []);

  useEffect(() => {
    if (selecionadas.length === 2) {
      setTentativas(t => t + 1);
      const [idx1, idx2] = selecionadas;
    if (selecionadas.length === 2) {
      const [idx1, idx2] = selecionadas;
      if (cartas[idx1].imagem === cartas[idx2].imagem) {
        //par encontrado
        setTimeout(() => {
          setCartas(cartasAntigas => cartasAntigas.map((c, i) =>
          i === idx1 || i === idx2 ? {...c, encontrada: true} : c));
          setSelecionadas([]);
        }, 1000);
      } else {
        //Não é par
        setTimeout(() => {
          setCartas(cartasAntigas => cartasAntigas.map((c, i) => 
          i === idx1 || i === idx2 ? {...c, virada: false} : c
        )
        );
        setSelecionadas([]);
        }, 1000);
      }
    }
    }
  }, [selecionadas, cartas]);

   useEffect(() => {
  if (cartas.length > 0 && cartas.every(c => c.encontrada)) {
    setTimeout(() => {
      if (typeof setTela === 'function') setTela('final');
    }, 800);
  }
}, [cartas, setTela]);


  const handleCartaClick = (idx) => {
    if (cartas[idx].virada || cartas[idx].encontrada || selecionadas.length === 2) return;
    setCartas(cartas.map((c, i) => i === idx ? {...c, virada: true} : c));
    setSelecionadas([...selecionadas, idx]);
  }

  const reiniciarJogo = () => {
  setCartas(embaralhar(cartasBase));
  setSelecionadas([]);
  setTentativas(0);
}

  return (
    <div>
        <h1>Game Memory</h1>
        <h2>Tentativas: {tentativas}</h2>
        <div className={styles.tabuleiro}>
          {cartas.map((carta, idx) => (
    <Carta
      key={carta.id}
      virada={carta.virada}
      encontrada={carta.encontrada}
      imagem={carta.imagem}
      verso={versoCarta}
      aoClicar={() => handleCartaClick(idx)}
    />
    ))}
            </div>

          <div className="button">
            <button onClick={reiniciarJogo}>Reiniciar Jogo</button>
          </div>
        </div>
  )
}

export default GameMemory