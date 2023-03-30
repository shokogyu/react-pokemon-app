import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import { getAllPokemon, getPokenmon } from './utils/pokemon.js'

function App() {

  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  // ブラウザをリロードしたときにpokemonデータを取ってくるのでuseEffectを使う
  // 一回だけ呼び出してほしいので、第二引数にはからの配列[]を指定する
  useEffect(() => {

    // pokemonデータを取得する関数を作る
    const fetchPokemonData = async () => {

      // すべてのpokemonデータを取得
      let res = await getAllPokemon(initialURL);

      // ポケモン詳細データを取得
      loadPokemon(res.results);

      // console.log(res.results)

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

  return (
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
        </>
      )}
    </div>
  );
}

export default App;
