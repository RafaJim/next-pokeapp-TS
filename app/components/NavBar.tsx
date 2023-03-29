import Link from "next/link";
import styles from './styles/NavBar.module.css';

const NavBar: React.FC = () => {

  interface Link {
    label: string;
    route: string
  }

  const links: Link[] = [
  {
    label: 'Home',
    route: '/'
  },
  {
    label: 'Random Pokemon',
    route: '/randomPokemons'
  }
]

  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navigation}>
          {links.map(({label, route}) => (
            <li key={route}>
              <Link href={route}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
 
export default NavBar;
