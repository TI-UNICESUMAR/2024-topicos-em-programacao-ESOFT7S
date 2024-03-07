---
marp: true
author: Pedro Satin
title: Programação Web
class: invert
paginate: true
backgroundImage: "linear-gradient(to bottom, #1111, #4444)"
---

## Componentes principais do Node.js: 2-3 - Libuv

Como eu dito anteriormente, nem setTimeout , setInterval nem setImmediate existem em JavaScript. Essas são funções de timer e são funções assíncronas tratadas por uma conhecida biblioteca C chamada libuv.

---
Libuv é uma biblioteca C que permite ao Node.js criar:

* Async Functions
* Threads
* Timers
* Child Processes
* Event Loops

E muito mais

---

Ela foi originalmente feito para ajudar o Node.js, mas é extensível e também pode ser usado em outras linguagens. E o resultado que ele tem com seu loop de eventos é o que fortalece o núcleo do Node.js e o transforma em um dos maiores e mais usados runtimes do mundo.

---
Como a Libuv pode fazer isso? Permitindo que o operações assincronas sejam executadas, como por exemplo o setTimeout.

Timers são funções assincronas executadas em segundo plano, e retornam o contexto principal quando terminam. Cada vez que executamos setTimeout em JS, é a Libuv executando esse código em segundo plano e chamando o callback fornecido.
O loop de eventos seria então um loop infinito que fica buscando novos eventos e chamando as funções fornecidas de volta ao terminar a execução

---

Isso é o que todos conhecemos como parte de sigle thread do JavaScript. E, mesmo que você possa criar e manipular threads com Libuv, cada tarefa eventualmente enviará uma mensagem de volta ao loop de eventos para manter a consistência e a ordem, isso evitará que as tarefas entrem em conflito entre si e causem conflitos.

---

Em resumo, é assim que o Node.js pode trabalhar com multithreads usando o módulo Worker Threads.
Cada vez que uma tarefa for concluída, ela enviará uma mensagem de volta ao loop de eventos e o loop de eventos chamará seu callback e removerá a função da fila.

---

## Componentes principais do Node.js: 3-3 - Camada C++

V8 é o mecanismo que interpreta JavaScript e pode chamar funções C++ personalizadas e libuv é a biblioteca que fornece o loop de eventos e outros recursos, como threading e execução de tarefas assíncronas no sistema operacional.

---

A última parte do sistema Node.js é o que chamo de camada C++.
A camada C++ é o mediador entre o código JavaScript que você escreve, o mecanismo V8 e o Libuv. Ele lida com respostas do V8 e Libuv e responde à camada JavaScript.

---

Imagine o seguinte pipeline:
1. Execute um programa C++ e envie um arquivo JS como argumento Executado pela camada C++, ou seja, seu programa.
2. Leia o conteúdo do arquivo Também executado pela camada C++.
3. Envie a string para o motor V8 e ele transforma o código em um objeto C++ V8 avaliando a string que você enviou.
4. Aguarde que eventos, temporizadores, processos e outras chamadas assíncronas concluam o processamento
Este é o loop de eventos da Libuv rodando como um loop infinito.
5. Libuv conclui a tarefa e chama as funções C++ fornecidas. A camada C++ recebe a resposta.
6. A camada C++ chama a API V8 para responder à função JS. A camada C++ invoca a função de callback fornecida e finaliza a solicitação.

---

## O que são Funções de Callback e sua Utilidade

As funções de callback em JavaScript são funções passadas como argumentos para outras funções. Elas são executadas após a conclusão de uma operação, permitindo um fluxo de trabalho assíncrono. Isso é crucial em operações que dependem de tempo, como solicitações de rede ou eventos de usuário.

---
## Benefícios da Programação Assíncrona em JavaScript

Na programação assíncrona, operações não bloqueiam a execução do código. Isso é vital em JavaScript, especialmente para aplicações web, onde a resposta imediata a interações do usuário e a eficiência no carregamento são cruciais. A programação assíncrona, utilizando callbacks, promove uma experiência de usuário mais fluida e responsiva.

---

Por exemplo, em JavaScript, um callback pode ser usado para manipular a resposta de uma solicitação HTTP. Quando os dados são recebidos, a função de callback é chamada para processá-los. Este modelo é amplamente utilizado em APIs, interações com bancos de dados e manipulação de eventos de usuário.

---

## Um pequeno exemplo de callbacks

```js

  function multiply(a,b) {
    return a * b;
  }

  function square(n) {
    return multiply (n, n)
  }

  function printSquare(n) {
    let squared = square(n);
    console.log(squared);
  }

  printSquare(4);

```

---

![](CallStack.png)

---

## Mais um exemplo de callback

```js
function processarUsuario(id, callback) {
  // Simula uma operação de busca de dados
  const usuario = {
      id: id,
      nome: "Luiz"
  };
  callback(usuario);
}

processarUsuario(1, function(usuario) {
  console.log("Nome do usuário:", usuario.nome);
});


```

--- 

## Fluxos Assíncronos

Vamos entender a ordem de execução do código e qual será sua saída subsequente:

```js
console.log(1);
console.log(2);
console.log(3);
console.log(4);

```

---
## Qual será a ordem agora?
```js
console.log(1);
console.log(2);
setTimeout(() =>{
  console.log('callback function')
}, 5000);
console.log(3);
console.log(4);
```
---

![](BrowserAsyncOperation.png);

---
![](BrowserEventLoop.jpeg);

---
## Entendendo cada sessão:

**Heap** - Armazena todas as referências de objetos e variáveis ​​que definimos em nossa função.

**Call Stack** - Todas as funções que usamos em nosso código são empilhadas aqui no modo **LIFO**, de modo que a última função esteja no topo e a primeira função esteja na parte inferior.

---

**APIs da Web** - Essas APIs são fornecidas pelo navegador, que fornece funcionalidade adicional sobre o mecanismo V8. As funções que usam essas APIs são enviadas para este contêiner que, após a conclusão da resposta da API da Web, é retirado deste contêiner.

---

**Filas** - As filas são usadas para calcular a resposta do código assíncrono de forma que não bloqueie a execução do mecanismo.

* **Fila de tarefas macro** - Esta fila executa funções assíncronas como eventos DOM, chamadas Ajax e setTimeout e tem prioridade mais baixa que a fila de tarefas.

* **Fila de micro tarefas** - Esta fila executa funções assíncronas que usam promessas e tem maior precedência sobre a fila de mensagens.

---

O loop de eventos verifica a pilha de chamadas; se a pilha estiver vazia, ele envia as funções das filas para a pilha de chamadas e a executa. As funções já presentes recebem prioridade mais alta e são executadas primeiro em comparação com funções na fila de mensagens.

---


![](evl-1.gif)

---
![](evl-2.gif)

---
![](evl-3.gif)

---
![](evl-4.gif)

---
![](evl-5.gif)

---

```js
const foo = () => console.log("First");
const bar = () => setTimeout(() => console.log("Second"), 500);
const baz = () => console.log("Third");

bar();
foo();
baz();
```

---
![](evl-6.gif)

---
## Node.js Event Loop

![](NodeEventLoop.jpeg)

---

**Event Queue** - Após a conclusão do Thread Pool, uma função de callback é emitida e enviada para a fila de eventos. Quando a pilha de chamadas está vazia, o evento passa pela fila de eventos e envia o callback para a pilha de chamadas.

---

**Threads Pool** - O thread pool é composto por 4 threads que delegam operações que são muito pesadas para o loop de eventos. Operações de E/S, abertura e fechamento de conexões, setTimeouts são exemplos de tais operações.

---

O **loop de eventos** no Node Js possui diferentes fases que possuem fila **FIFO** de callbacksa para execução. Quando o loop de eventos entra em uma determinada fase, ele opera callbacks nessa fila de fase até que a fila se esgote e o número máximo de callbacks seja executado e então passa para a próxima fase.

---
![](eventLoopFases.jpeg)

---

Vamos usar como base o seguinte código: 

```js
console.log("Iniciando o Node.js");
db.query("SELECT * FROM public.cars", function(err, res) {
  console.log("Query executed");
});
console.log("Antes do resultado da consulta");

```

---

O mecanismo JavaScript V8 gerencia uma call stack, uma peça essencial que rastreia qual parte do nosso programa está em execução. Sempre que invocamos uma função JavaScript, ela é enviada para a pilha de chamadas. Quando a função chega ao fim ou a uma instrução return, ela é retirada da pilha.

---

Em nosso exemplo, a linha de código  `console.log('Starting Node.js')` é adicionada à pilha de chamadas e imprime  `Iniciando o Node.js` no console. Ao fazer isso, ele chega ao final da função `log` e é removido da pilha de chamadas.

---

![](nevl-1.gif)

---
A linha de código a seguir é uma consulta ao banco de dados. Essas tarefas são imediatamente interrompidas porque podem demorar muito. Eles são passados ​​​​para o Libuv, que os trata de forma assíncrona em segundo plano. Ao mesmo tempo, o Node.js pode continuar executando outro código sem bloquear seu único thread.

No futuro, o Node.js saberá o que fazer com a consulta porque associamos uma função de retorno de chamada a instruções para lidar com o resultado ou erro da tarefa. 

---

![](nevl-2.gif)

---

Embora o Libuv lide com a consulta em segundo plano, nosso JavaScript não é bloqueado e pode continuar com o  console.log(”Antes do resultado da consulta”).

---

![](nevl-3.gif)

---

Quando a consulta é concluída, seu callback é enviado para a fila de eventos de E/S para ser executado em breve* . *O loop de eventos conecta a fila à pilha de chamadas. Verifica se este está vazio e move o primeiro item da fila para execução.

---

![](nevl-4.gif)

---

## Referencias
* [Recreating Node.js from Scratch using V8, Libuv, and C++](https://lp.javascriptexpert.com.br/recreating-node-js)
* [Difference between the Event Loop in Browser and Node Js?](https://dev.to/jasmin/difference-between-the-event-loop-in-browser-and-node-js-1113)
* [Mas que diabos é o loop de eventos? | Philip Roberts](https://www.youtube.com/watch?v=8aGhZQkoFbQ&ab_channel=JSConf)
* [Node.js animated: Event Loop](https://dev.to/nodedoctors/an-animated-guide-to-nodejs-event-loop-3g62?ref=dailydev)
* [A Deep Dive Into the Node js Event Loop - Tyler Hawkins](https://www.youtube.com/watch?v=KKM_4-uQpow&ab_channel=UtahJS)
* [JavaScript Visualized: Event Loop](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)
* [Everything You Need to Know About Node.js Event Loop - Bert Belder, IBM](https://www.youtube.com/watch?v=PNa9OMajw9w&ab_channel=node.js)


<style> 
  * {
    color: rgb(250, 250, 250, 0.85);
  }

  h1 {
    margin-bottom: 0;
    text-decoration: underline;
    color: #fff;
    text-align: center;
  }

  strong {
    color: rgb(255, 255, 255, 1);
  }

  strong > em {
    color: rgb(255, 255, 255, 1);
  }

  p {
    margin: 1rem 0;
  }
</style>
