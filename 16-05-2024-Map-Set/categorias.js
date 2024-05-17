let produtos = [
    {nome: 'Maça', categoria: "Frutas"},
    {nome: 'Banana', categoria: "Frutas"},
    {nome: 'Lapis', categoria: "Papelaria"},
    {nome: 'Tesoura', categoria: "Papelaria"},
    {nome: 'Limão', categoria: "Frutas"},
]


function agruparPorCategoria(produtos) {
    const categoriaMap = new Map()
    for(produto of produtos) {
        const categoria = produto.categoria
        if(!categoriaMap.has(categoria)) {
            //categoriaMap.set(categoria, [])
        }
        categoriaMap.get(categoria).push(produto)
    }
    return categoriaMap
}

console.log(agruparPorCategoria(produtos))