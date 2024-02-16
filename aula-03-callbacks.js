const fs = require('fs').promises;

async function escreverArquivoCallback(nomeArquivo, dados) {
    console.log(`Escrevendo dados no arquivo ${nomeArquivo}...`)
    try {
        fs.writeFile(nomeArquivo, dados);
        console.log(`Dados escritos no arquivo ${nomeArquivo} com sucesso.`);
    }catch(error) {
        console.error(`Erro ao escrever dados no arquivo ${nomeArquivo}:`, error);
    }
}


async function lerArquivoCallback(nomeArquivo) {
    console.log(`Lendo dados do arquivo: ${nomeArquivo}`)
    try{
        const data = await fs.readFile(nomeArquivo, 'utf-8');
        console.log(`Dados lidos do arquivo ${nomeArquivo}`)
        return data;
    }catch(error) {
        console.error(`Erro ao ler dados do arquivo ${nomeArquivo}`, error);
        return null;
    }
}

async function getPokemonDataWithCallbacks() {
    console.log("Aguardando retorno da Poke API")
    try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon/1");
        const jsonResponse = await response.json();

        const pokemonInfo = {
            nome: jsonResponse.name,
            tipos: jsonResponse.types.map(type => type.type.name),
            peso: jsonResponse.weight,
            altura: jsonResponse.height
        }

        const pokemonData = JSON.stringify(pokemonInfo, null, 2)
        await escreverArquivoCallback('pokemon.json', pokemonData);
        console.log("Pokemon cadastrado");

        const arquivoContent = await lerArquivoCallback('dados.txt');
        if(arquivoContent) {
            console.log(`conteudo do arquivo dados.txt`, dadosArquivoLocal)
            const pokemonContent = await lerArquivoCallback('pokemon.json');
            if(pokemonContent) {
                console.log("Conteudo do arquivo pokemon", pokemonContent)
            } else {
                console.error('Erro ao ler dados do pokemon', error)
            }
        } else {
            console.error('Erro ao ler arquivo dados.txt', error)
        }
        console.log(myPokemon);
    } catch(error) {
        console.error("Erro ao obter dados do pokemon", error)
    }
}

getPokemonDataWithCallbacks(); 