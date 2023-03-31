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
    returnTop()
    setLoading(true);

    let data = await getAllPokemon(nextURL);
    loadPokemon(data.results)

    setNextURL(data.next)
    setPrevURL(data.previous)
    setLoading(false);

    // console.log(data)
  }

  /**
   * 前へボタンを押した時の処理
   */
  const handlePrevPage = async () => {
    if(!prevURL) return;

    returnTop()
    setLoading(true);

    let data = await getAllPokemon(prevURL);
    loadPokemon(data.results);

    setNextURL(data.next)
    setPrevURL(data.previous)
    setLoading(false);
  }

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="introduction">
              <p className="introductionText">
                <a href="https://pokeapi.co/" target="_blank">PokeApi</a>から20件ずつポケモン情報を取得し一覧表示しています。
              </p>
            </div>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </div>
            <div className="btns">
              <button onClick={handlePrevPage} className={(prevURL) ? "": 'isDisable'}>前へ</button>
              <button onClick={handleNextPage} className={(nextURL) ? "": 'isDisable'}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
