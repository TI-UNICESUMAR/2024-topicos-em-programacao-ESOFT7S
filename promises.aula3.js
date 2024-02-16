import { writeFile, readFile } from "fs/promises";

const bulbasaurUrl = "https://pokeapi.co/api/v2/pokemon/1";

const fetchPokemonData = async () => {
  const response = await fetch(bulbasaurUrl).then((response) =>
    response.json()
  );

  const pokemonData = buildPokemonData(response);

  await escreverArquivo("pokemon.json", pokemonData);

  await lerArquivo("pokemon.json");

  await lerArquivo("dados.txt");
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

  return JSON.stringify(pokemonInfo, null, 2);
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

const lerArquivo = async (nomeDoArquivo) => {
  console.log(`Lendo dados do arquivo: ${nomeDoArquivo}`);

  try {
    const result = await readFile(nomeDoArquivo, "utf-8");

    console.log(`Dados lidos do arquivo ${nomeDoArquivo}`);

    console.log(result);
  } catch (error) {
    console.error(`Erro ao ler dados do arquivo ${nomeDoArquivo}`, error);
  }
};

fetchPokemonData();
