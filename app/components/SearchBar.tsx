'use client'
import styles from './styles/SearchBar.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarPropr {
    pokeFinded: boolean;
    filter: Function;
}

const SearchBar: React.FC<SearchBarPropr> = ({pokeFinded, filter}) => {
    const [input, setInput] = useState<string>('');
    
    const router: any = useRouter();

    const searchPoke = (event: any) => {
        if(event.key === 'Enter') {
            if(pokeFinded === true){
                router.push(`/randomPokemons/${input.toLowerCase()}`);
            }else {
                alert(`I can't find the pokemon ${input}`);
            }
        } 
    }

    const change = (value: string) => {
        setInput(value);
        filter(value);
    }
    
    return (
        <>
            <input 
                className={styles.bus} 
                onChange={e => change(e.target.value)} 
                onKeyDown={searchPoke}
                type="text" 
                placeholder="Search pokemon + enter"
            />
        </>
    )
}
 
export default SearchBar;
