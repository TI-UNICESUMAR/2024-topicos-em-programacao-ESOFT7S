import { writeFile, readFile } from "fs/promises";

const bulbasaurUrl = "https://pokeapi.co/api/v2/pokemon?limit=151";

const fetchPokemonData = async () => {
  console.time('Time Promise All: ')
  const response = await fetch(bulbasaurUrl).then((response) =>
    response.json()
  );

  const pokeMap = response.results.map(async (pokemon) => {
    let url = pokemon.url
    const pokeRender = await fetch(url).then((pokeResponse) => {
      return pokeResponse.json()
    })
    return buildPokemonData(pokeRender)
  })

  const finalPoke = await Promise.all(pokeMap)

  escreverArquivo('pokemon.json', JSON.stringify(finalPoke, null, 2))
  console.timeEnd('Time Promise All: ')
};

const fetchPokemonDataAsync = async () => {
  console.time('Time Async: ')
  const response = await fetch(bulbasaurUrl).then((response) =>
    response.json()
  );

  const pokeMap = response.results.map((pokemon) => {
    return pokemon.url
  })

  let pokeArr = []
  for (let i = 0; i < pokeMap.length; i++) {
    const pokeAwait = await fetch(pokeMap[i])
    const pokeJson = await pokeAwait.json()
    pokeArr.push(pokeJson)
  }

  escreverArquivo('pokemon.json', JSON.stringify(pokeArr, null, 2))
  console.timeEnd('Time Async: ')
};

const buildPokemonData = (data) => {
  const { name, types, weight, height } = data;

  const getTypes = types.map(({ type }) => type.name);

  const pokemonInfo = {
    nome: name,
    tipos: getTypes,
    peso: weight,
    altura: height,
  };

  return pokemonInfo
};

const escreverArquivo = async (nomeDoArquivo, dados) => {
  console.log(`Escrevendo dados no arquivo pokemon.json...`);

  await writeFile(nomeDoArquivo, dados)
    .then(() =>
      console.log(`Dados escritos no arquivo ${nomeDoArquivo} com sucesso.`)
    )
    .catch((error) =>
      console.error(
        `Erro ao escrever dados no arquivo ${nomeDoArquivo}:`,
        error
      )
    );
};


fetchPokemonData();

fetchPokemonDataAsync();
