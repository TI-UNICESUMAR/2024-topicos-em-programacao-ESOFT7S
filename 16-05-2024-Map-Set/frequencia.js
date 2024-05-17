function countWordFrequency(frase) {
    const palavras = frase.split(/\s+/);
    const frequenciaMap = new Map()
    for(const palavra of palavras) {
        const count = frequenciaMap.get(palavra) || 0;
        frequenciaMap.set(palavra, count + 1)
    }
    return frequenciaMap
}

const frase = "ola mundo ola todos"
const frequencias = countWordFrequency(frase)
console.log(frequencias)