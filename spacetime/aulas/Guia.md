- [Inicio](#inicio)
- [Dependências](#dependências)
  - [Back](#back)
  - [Front](#front)
  - [Mobile](#mobile)
- [Fastify](#fastify)
  - [Configuração Inicial](#configuração-inicial)
  - [Rotas](#rotas)
- [Prisma](#prisma)
  - [Configuração Inicial](#configuração-inicial-1)
  - [Criando models](#criando-models)
  - [Migrations](#migrations)
  - [Studio](#studio)
- [Prisma Client](#prisma-client)
  - [Configuração](#configuração)
  - [Get](#get)
    - [Todos](#todos)
- [Next](#next)
- [React](#react)
  - [Componentes](#componentes)
    - [Estilização](#estilização)
  - [Propriedades](#propriedades)
  - [Roteamento](#roteamento)
  - [Classes](#classes)
- [Tailwind](#tailwind)
- [Expo](#expo)
  - [Execução](#execução)
  - [Html](#html)
  - [CSS](#css)


# Inicio

A aplicação desenvolvida será uma capsulá do tempo.

# Dependências

## Back

- [x] Node
- [x] Typescript + tsx
- [x] Fastify
- [x] ESLint
- [x] Prisma + SQLite


## Front

- [ ] React + Next.js
- [ ] TailwindCSS
- [ ] ESLint + Prettier Tailwind

## Mobile

...

# Fastify

O fastify é o framework responsável pela criação web.

## Configuração Inicial

Importe o fastify

    import fastify from "fastify";

Crie uma constante chamada app, instanciando o import.

    const app = fastify();

Após isso realize a abertura do servidor, por meio do método *listen*, 
passe uma objeto contendo uma *key* chamada de *port* com a porta desejada.

Esse método retorna uma *promisse*.

O *then* será executado quando o servidor estiver no ar.

    app.listen({
        port: 8080
    }).then(() => {
        console.log("HTTP server running on http://localhost:8080");
    });

## Rotas

    app.tipo('/rota', () => {
        . . .
    })

    app.get('/', () => {
        return "Hello World";
    });

# Prisma

O prisma é uma orm.

## Configuração Inicial

Após realizar a instalação, rode:

    npx prisma init --datasource-provider Database

    npx prisma init --datasource-provider SQLite

## Criando models

A criação de um model segue a seguinte estrutura

    model Model {
        campo Tipo configs
    }

    model User {
        id String @id @default(uuid())
        name String
    }

**Nota:** No caso do id, dizemos que ele é do tipo chave primária (@id) e possui 
um *uuid* único por padrão.

**Não se esqueça de fazer a migração.**

## Migrations

Para realizar uma migração de desenvolvimento:

    npx prisma migrate dev

Ele irá pedir o nome da migração.

## Studio

O prisma studio é uma gui para verificação da database, para executá-la use o 
seguinte comando:

    npx prisma studio -n 0.0.0.0 --port 8080

# Prisma Client

O *prisma client* serve para ser acessar os dados dentro do código.

    npm install @prisma/client

## Configuração

Import o *PrismaClient*

    import { PrismaClient } from '@prisma/client'

Crie uma constante

    const prisma = new PrismaClient()

## Get

### Todos

Para pegar todos os registros de um model, use o método findMany, note que 
ele é assíncrono, então a função que irá chamar ele também deve ser.

    const model_data = await prisma.model.findMany()

Exemplo:

    app.get('/users', async () => {
        const users = await prisma.user.findMany()
        return users
    })


# Next

O next é o framework que será usado no front-end.

    npx create-next-app@latest web --use-npm

Para rodar o projeto inicial

    npm run dev -- -p 8080

# React

## Componentes

Os componentes são formas de separarmos a nossa tela que está cheia de 
informações em vários pedaços menores.

Dentro do react eles nada mais são do que funções que retornam um html.

Eles geralmente servem para melhor manutenção e reaproveitamento do código.

Normalmente salvos em:

    - src/
      - components/
        - Component.tsx

Começam com a inicial maiúscula.

Exemplo de componente:

    export function Button(){
        return (
            <p>Botão</p>
        )
    }

Para utilizar.

    // Arquivo page.tsx

Realize o import do componente

    import { Button } from "@/components/Button";

Use na função da página

    export default function Home() {
        return ( . . . )
    }

Dentro de algum elemento

    <h1>
        Hello World!
        <Button/>
    </h1>

### Estilização

A estilização de um componente é feito por meio de objetos criados fora do 
escopo dele.

    const styles = {
        color: '#F00',
    }

    export function Button(){
        return (
            <p style={styles}>. . .</p>
        )
    }

**Nota:** As chaves servem para indicar a utilização de variáveis do javascript 
dentro do html, com isso você também pode usar da seguinte maneira:

    const name = 'Emanuel'

    export function Button(){
        return (
            <p>{name}</p>
        )
    }

## Propriedades

As propriedades são atributos passados para os componentes.

Crie uma interface para definir as propriedades

    interface ButtonProps {
        title: string
    }

Após isso adicione ao componente

    export function Button(props: ButtonProps){ . . . }

Para acessar basta digitar o nome do parâmetro e a propriedade definida na 
interface.
        
    <p>{props.title}</p>

## Roteamento

Todo arquivo chamado de *page.tsx* criado dentro de uma subpasta dentro de 
*src/app*, é automaticamente uma página e a pasta pai é o nome da rota.

    - src/
      - app/
        - user/
          - page.tsx
        - page.tsx

**Nota:** A página principal é o arquivo que está na raiz da pasta app.

A estrutura básica da página é a seguinte:

    export default function Pagina() {
        return <h1>Pagina</h1>
    }

Isso também pode ser realizado de forma recursiva infinitamente.

    - src/
      - app/
        - user/
          - login/
            - page.tsx
          - register/
            - -page.tsx
          - page.tsx
        - page.tsx

## Classes

A adição de classes css ao código html dentro de um componente é feita da 
seguinte maneira:

    <div className="className">
        . . .
    </div>

# Tailwind

O tailwind é um framework css.

A estilização dele é feita por classes.

Consulte a documentação e veja o tópico anterior para trabalhar com ele.

# Expo

O *expo* é um framework que facilita o trabalho com o react native.

Crie um projeto com ele.

    npx create-expo-app name

Faça a renomeação da extensão do *App.js* para *App.tsx*.

Baixe o app do expo no celular.

## Execução

Para executar dentro do container, rode o seguinte comando na pasta do app.

    npm run start -- --port 8080

Desse modo insira o *ip* do dispositivo no celular na porta especificada, 
dessa maneira o app já estará em exibição no seu dispositivo.

## Html

A estrutura do *expo* não possui html, desse modo ele não possui semântica, 
porém a forma de trabalhar dele é igual a do react.

    import { Text, View } from 'react-native';

    export default function App() {
        return (
            <View style={styles.container}>
            <Text>Hello World!</Text>
            <StatusBar style="auto" />
            </View>
        );
    }

Basicamente tudo é *text*.

## CSS

O css dele é chamado de *CSS-in-JS*, basicamente o formato de objeto.

    import { StyleSheet } from 'react-native';

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

A aplicação é a mesma do react

    <View style={styles.container}></view>

**Nota:** Não existe herança de estilos no react native.

Você pode usar o tailwind dentro do expo, para isso faça os seguinte passos:

Instale

    npm install nativewind
    npm i tailwindcss -d

Inicie

    npx tailwindcss init

Coloque isso no tailwind.config.js

    content: ["./App.tsx", "./app/**/*.tsx"],

No babel.config.js

    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],

E no tsconfig.json

    "compilerOptions": {
        "types": [
        "nativewind/types"
        ]
    },

Após isso reinicie a aplicação.

**Nota:** Essa reinicialização deve ser feita após adicionar dependências ao projeto.