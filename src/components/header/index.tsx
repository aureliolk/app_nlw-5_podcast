import styles from './style.module.scss'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'


export function Header(){
    const currentDate = format(new Date(),'EEEE, d MMMM',{
        locale: ptBR
    })

    return(
        <header className={styles.headerContainer}>
            <img src="/logo.svg" alt="Logo"/>
            <p>Inteligencia LTDA</p>
            <span>{currentDate}</span>
        </header>
    )
}