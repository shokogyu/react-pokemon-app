import React from 'react'
import './Card.css'

const Card = ({pokemon}) => {
  return (
    <div className='card'>
        <div className="cardNum">{pokemon.id}</div>
        <div className='cardImg'>
            <img src={ pokemon.sprites.front_default } />
        </div>
        <h3 className='cardName'>{ pokemon.name }</h3>
        <div className='cardTypes'>
            <span className=''>タイプ</span>
            <div>
                {pokemon.types.map((type, i) => {
                    return (
                        <p key={i}>{type.type.name}</p>
                    )
                })}
            </div>
        </div>
        <div className="cardInfo">
            <div className="cardData">
                <p className='title'>重さ：{pokemon.weight}</p>
            </div>
            <div className="cardData">
                <p className='title'>高さ：{pokemon.height}</p>
            </div>
            <div className="cardData">
                <p className='title'>アビリティ：{pokemon.abilities[0].ability.name}</p>
            </div>
        </div>
    </div>
  )
}

export default Card