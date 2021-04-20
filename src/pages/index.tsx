// import {useEffect} from 'react'

export default function Home(props) {
  console.log(props.episodes)

  // //chamadas SPA
  // useEffect(()=>{
  //   fetch('http://localhost:3333/episodes')
  //   .then(response => response.json())
  //   .then(data => console.log(data))
  // },[])

  return (
    <>
      <h1>Segundo DIA</h1>
      {/* <p>{JSON.stringify(props.episodes)}</p> */}
    </>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const data = await response.json()

  return {
    props: {
      episodes: data,
    },
    revalidate: 60 * 60 * 8,
  }
}