import '../styles/global.scss'
import { Header } from '../components/header'
import { Player } from '../components/player'
import style from '../styles/app.module.scss'

function MyApp({ Component, pageProps }) {
  return (
    <div className={style.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      <Player/>
    </div>
  )
}

export default MyApp
