import React from 'react'

const TelaFinal = ({setTela}) => {
  return (
    <div>
      <h1>Parabéns! Você terminou o jogo!</h1>
      <button onClick={() => setTela('inicio')}>Voltar ao inicio
      </button>
    </div>
  )
}

export default TelaFinal