import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';
import { getAllPokemon, getPokenmon } from './utils/pokemon.js'

function App() {

  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("")
  const [prevURL, setPrevURL] = useState("")

  // ブラウザをリロードしたときにpokemonデータを取ってくるのでuseEffectを使う
  // 一回だけ呼び出してほしいので、第二引数にはからの配列[]を指定する
  useEffect(() => {

    // pokemonデータを取得する関数を作る
    const fetchPokemonData = async () => {

      // すべてのpokemonデータを取得
      let res = await getAllPokemon(initialURL);

      // ポケモン詳細データを取得
      loadPokemon(res.results);
      // console.log(res)

      setPrevURL(res.previous)
      setNextURL(res.next)
      setLoading(false);
    }
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {

    // Promise.allの中は配列を入れるようにする
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokenmon(pokemon.url);
        return pokemonRecord;
      })
    )
    setPokemonData(_pokemonData);
  };
  // console.log(pokemonData);
  
  /**
   * 次へボタンを押した時の処理
   */
  const handleNextPage = async () => {
    setLoading(true);

    let data = await getAllPokemon(nextURL);
    loadPokemon(data.results)

    setNextURL(data.next)
    setPrevURL(data.previous)
    setLoading(false);
  }

  /**
   * 前へボタンを押した時の処理
   */
  const handlePrevPage = async () => {
    if(!prevURL) return;
    setLoading(true);

    let data = await getAllPokemon(prevURL);
    loadPokemon(data.results);

    setNextURL(data.next)
    setPrevURL(data.previous)
    setLoading(false);
  }

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />
            })}
          </div>
          <div className="btns">
            <button onClick={handlePrevPage}>前へ</button>
            <button onClick={handleNextPage}>次へ</button>
          </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
