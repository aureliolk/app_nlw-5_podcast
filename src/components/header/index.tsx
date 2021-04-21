import styles from './style.module.scss'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import Link from 'next/link'


export function Header(){
    const currentDate = format(new Date(),'EEEE, d MMMM',{
        locale: ptBR
    })

    return(
        <header className={styles.headerContainer}>
            <Link href={'/'}>
                <img src="/logo.svg" alt="Logo"/>
            </Link>
            <p>Inteligencia LTDA</p>
            <span>{currentDate}</span>
        </header>
    )
}