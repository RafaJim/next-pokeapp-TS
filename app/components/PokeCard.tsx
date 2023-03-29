import styles from '../randomPokemons/Pokes.module.css';
import Link from "next/link";
import Image from "next/image";

interface PokeCardProps {
    name: string;
    id: number;
}

const PokeCard: React.FC<PokeCardProps> = ({name, id}) => {    
    const pokemonImage: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    
    let nameNew: string = name[0].toUpperCase() + name.slice(1);

    return (
      <>
        <Link href={`/randomPokemons/${name}`} >
            <div className={styles.card} >
                <h2 className={styles.title}>{nameNew}</h2>
                <Image className={styles.image} alt={nameNew} width={150} height={150} src={pokemonImage} />
            </div>
        </Link>
      </>
    )
}
 
export default PokeCard;
