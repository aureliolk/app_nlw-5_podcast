import style from './home.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { api } from '../services/api'
import { convertDurationToString } from '../utilis/convertDuration'

type Episodes = {
  id: number,
  title: string,
  thumbnail: string,
  publishedAt: string,
  duration: number,
  durationAsString: string,
  url: string,
  members: string,
}

type HomeProps = {
  latesEpisodes: Episodes[],
  allEpisodes: Episodes[]
}

export default function Home({ latesEpisodes, allEpisodes }: HomeProps) {



  return (
    <div className={style.homepage}>
      <section className={style.latesEpisodes}>
        <h2>Últimos Lançamentos</h2>
        <ul>
          {latesEpisodes.map(episode => {
            return (
              <li key={episode.id}>
                <div style={{ width: 100 }}>
                  <Image
                    width={192}
                    height={192}
                    src={episode.thumbnail}
                    alt={episode.title}
                    objectFit='cover'
                  />
                </div>
                <div className={style.episodeDetails}>
                  <Link href={`/episodes/${episode.id}`}>
                    {episode.title}
                  </Link>
                  <p>{episode.members}</p>
                  <span>{episode.publishedAt}</span>
                  <span>{episode.durationAsString}</span>
                </div>
                <button type='button'>
                  <img src="/play-green.svg" alt="Tocar Episodio" />
                </button>
              </li>
            )
          })}
        </ul>
      </section>
      <section className={style.allEpisodes}>
        <h2>Todos Episódios</h2>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map(data => {
              return (
                <tr key={data.id}>
                  <td style={{ width: 100 }}>
                    <Image width={120} height={120} src={data.thumbnail} alt={data.title} objectFit="cover" />
                  </td>
                  <td>
                    <Link href={`/episodes/${data.id}`}>
                      {data.title}
                    </Link>
                  </td>
                  <td>{data.members}</td>
                  <td style={{ width: 100 }}>{data.publishedAt}</td>
                  <td>{data.durationAsString}</td>
                  <td>
                    <button type="button">
                      <img src="/play-green.svg" alt="Tocar Episodio" />
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'pulblished_at',
      _order: 'desc'
    }
  })

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToString(Number(episode.file.duration)),
      url: episode.file.url
    }
  })

  const latesEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latesEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  }
}