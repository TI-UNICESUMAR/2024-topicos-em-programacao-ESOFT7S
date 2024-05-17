let meuSet = new Set()

let setComValor = new Set([1, 2, 3, 4])

meuSet.add({ nome: 'Thiago' })
meuSet.add({ nome: 'Thiago' })
meuSet.add(2)
meuSet.add(2)

//console.log(meuSet)

//exercicio 1 usar o Set para remover os items comuns entre os dois arrays
// e retornar um novo array sem os itens duplicados

function uniaoDeArrays(arr1, arr2) {
    const conjunto = new Set([...arr1, ...arr2])
    return Array.from(conjunto)
}

const num1 = [1,2,3,4]
const num2 = [1,2,5,6]

console.log(uniaoDeArrays(num1, num2))


// exericio 2 interceção de Arrays, retorne um novo array somente com os itens
// comuns entre o array 1 e o array 2, utilize o Set para facilitar a comparação

function intersecaoDeArrays(arr1, arr2) {
    const set1 = new Set(arr1)
    const set2 = new Set(arr2)
    const intersecao = new Set([...set1].filter(number => set2.has(number)))
    return Array.from(intersecao)
}

console.log(intersecaoDeArrays(num1, num2))