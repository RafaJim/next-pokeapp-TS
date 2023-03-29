'use client'

import styles from './Pokes.module.css'
import PokeCard from '../components/PokeCard'
import { useState, useEffect } from 'react'

export default function RandomPokemons() {

  const [pokemons, setPokemons] = useState([])
  
  const generateRandomNums = () => {
    let numbers = []
    while(numbers.length < 20){
      let id = Math.floor(Math.random() * 1001)

      if(id === 0) id + 2
      if(id === 1) id + 1
      if(numbers.indexOf(id) === -1)  numbers.push(id)

    }
    return numbers
  }

  const getRandomPoke = async(ids) => {
    const promises = ids.map(id => (
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {cache: 'no-store'})
    ))

    Promise.all(promises)
    .then(res => Promise.all(res.map(r => r.json())))
    .then(data => {setPokemons(
      data.map(poke => (
        {
          name: poke.name,
          id: poke.id
        }
      ))
    )})
    
  }

  useEffect(() => {
    getRandomPoke(generateRandomNums())
  }, [])

  return (
    <div className={styles.main}>
      {pokemons.map(({name, id}) => (
          <PokeCard name={name} id={id} key={id} />
      ))}

    </div>
  )
}