const fs = require('fs').promises

async function escreverArquivoAsyncAwait(nomeArquivo, dados) {
    try {
        console.log(`Escrevendo dados no arquivo ${nomeArquivo}...`)
        await fs.writeFile(nomeArquivo, dados)
        console.info(`Dados escritos no arquivo ${nomeArquivo} com sucesso.`)
    } catch (error) {
        console.error(`Erro ao escrever dados no arquivo ${nomeArquivo}: ${error}`)
    }
}

async function lerArquivoAsyncAwait(nomeArquivo) {
    try {
        console.log(`Lendo dados do arquivo: ${nomeArquivo}`)
        await fs.writeFile(nomeArquivo, 'utf-8')
        console.info(`Dados lidos do arquivo ${nomeArquivo}`)
        return dados
    } catch (error) {
        console.error(`Erro ao ler dados do arquivo ${nomeArquivo}: ${error}`)
    }
}

async function getPokemonDataWithAsyncAwait() {
    try {
        console.info("Aguardando retorno da Poke API")
        const apiResponse = await fetch("https://pokeapi.co/api/v2/pokemon/1")
        const data = await apiResponse.json()
        const pokemonInfo = {
            nome: data.name,
            tipos: data.types.map(type => type.type.name),
            peso: data.weight,
            altura: data.height
        }

        const pokemonData = JSON.stringify(pokemonInfo, null, 2)
        await escreverArquivoAsyncAwait("pokemon.json", pokemonData)

        console.log("Pokemon cadastrado")

        const dadosArquivoLocal = await lerArquivoAsyncAwait("dados.txt")
        console.log(`Conteudo do arquivo dados.txt: \n ${dadosArquivoLocal}`)

        const dadosPokemonSalvo = await lerArquivoAsyncAwait("pokemon.json")
        console.log(`Conteudo do arquivo pokemon: \n ${dadosPokemonSalvo}`)

    } catch (error) {
        console.error("Erro ao obter dados do pokemon")
    }
}

getPokemonDataWithAsyncAwait();
