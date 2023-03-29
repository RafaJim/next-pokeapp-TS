'use client'
import { useState, useEffect } from 'react';
import styles from './randomPokemons/Pokes.module.css';
import PokeCard from './components/PokeCard';
import SearchBar from './components/SearchBar';

interface Pokemon {
  name: string;
  url?: string;
  id: number;
}

const Home = () => {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [pokeSearch, setPokeSearch] = useState<boolean>(false);

  const pokeData = async() => {
    let data: { results: Pokemon[] } = { results: [] };

    try {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=200&offset=1', {cache: 'no-store'});
      if(!res.ok){
        throw new Error('Bad response', {
          cause: { res }
        })
      }

      data = await res.json();
    } catch (err) {
      console.log(err);
    }
    
    return data.results;
  }
  
  const fetchPokemons = async () => {
    const res = await pokeData();
    let arr: Pokemon[] = [];

    res.forEach((poke: Pokemon, index: number) => (
      arr.push({
        name: poke.name,
        id: index + 2
      })
    ))
    
    setPokemons(arr);
    setFilteredPokemons(arr);
  }

  const filter = (name: string) => {
    const filteredPokes = pokemons.filter(poke => (
      poke.name.includes(name)
    ))
    setFilteredPokemons(filteredPokes);

    let findPoke = pokemons.filter(poke => poke.name === name);
    if(findPoke.length === 1) setPokeSearch(true);
  }

  
  useEffect(() => {
    fetchPokemons();
  }, [])

  return (
    <div className={styles.body}>
      <SearchBar pokeFinded={pokeSearch} filter={filter} />

      <div className={styles.main}>
        {filteredPokemons.map(({name, id}) => (
          <PokeCard name={name} id={id} key={id} />
        ))}

      </div>
    </div>
  )
}
 
export default Home;
