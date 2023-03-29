'use client'

import useFetch from '@/app/hooks/useFetch';
import styles from './PokeInfo.module.css';
import Image from 'next/image';

interface Params {
    params: {
        name: string;
    }
}

const PokeInfo: React.FC<Params> = ({params: {name}}) => {

    const url: string = `https://pokeapi.co/api/v2/pokemon/${name}`;
    const { data, loading, error } = useFetch(url);
    console.log(data?.id);
    const img: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data?.id}.png`;

    return (
        <>
            { loading ? <div>Loading pokemon info...</div> : null }
            { error ? <div>{error}</div> :
            <div className={styles.body}>
                <div>
                    {data ? <Image alt={name} width={350} height={350} src={img} /> : null }
                </div>
                <div className={styles.text}>
                    <h1 className={styles.title}>
                        Ataques del pokemon {name}
                    </h1>
                    {data ? data.abilities.map((abs, index: number) => (
                        <h3 className={styles.info} key={index + 1} >
                            {abs.ability.name}
                        </h3>
                    )) : null}
                </div>
            </div>
            }
        </>
    )
}
 
export default PokeInfo;
