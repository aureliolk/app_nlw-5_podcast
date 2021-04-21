import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { GetStaticPaths, GetStaticProps } from 'next'
import { api } from '../../services/api'
import { convertDurationToString } from '../../utilis/convertDuration'
import Image from 'next/image'
import styles from './style.module.scss'

type Episodes = {
    id: number,
    title: string,
    thumbnail: string,
    publishedAt: string,
    duration: number,
    durationAsString: string,
    url: string,
    members: string,
    description:string
}

type EpisodesProps = {
    episodes: Episodes;
}

export default function Episodes({ episodes }: EpisodesProps) {
    return (
        <div className={styles.episodes}>
            <div className={styles.thumbnailContainer}>
                <button type='button'>
                    <img src='/arrow-left.svg' alt='voltar' />
                </button>
                <Image
                    width={700}
                    height={160}
                    src={episodes.thumbnail}
                    objectFit="cover"
                />
                <button type='button'>
                    <img src="/play.svg" alt="tocar episodio"/>
                </button>
            </div>

            <header>
                <h1>{episodes.title}</h1>
                <span>{episodes.members}</span>
                <span>{episodes.publishedAt}</span>
                <span>{episodes.durationAsString}</span>   
            </header>

            <div className={styles.description} dangerouslySetInnerHTML={{__html: episodes.description}}/>
               
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () =>{
    return{
        paths:[],
        fallback:'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { slug } = ctx.params
    const { data } = await api.get(`/episodes/${slug}`)

    const episodes = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        description: data.description,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MM yy', { locale: ptBR }),
        duration: Number(data.file.duration),
        durationAsString: convertDurationToString(Number(data.file.duration)),
        url: data.file.url
      }

    return {
        props: {
            episodes
        },
        revalidate: 60 * 60 * 24, // 24horas
    }
}