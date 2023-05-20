- [Inicio](#inicio)
- [Dependências](#dependências)
  - [Back](#back)
  - [Front](#front)
  - [Mobile](#mobile)
- [Fastify](#fastify)
  - [Configuração Inicial](#configuração-inicial)
  - [Rotas](#rotas)
  - [Sub-rotas](#sub-rotas)
  - [Parâmetros](#parâmetros)
    - [Validação](#validação)
    - [Booleanos](#booleanos)
  - [Cors](#cors)
- [Prisma](#prisma)
  - [Configuração Inicial](#configuração-inicial-1)
  - [Criando models](#criando-models)
    - [Relacionamento](#relacionamento)
  - [Migrations](#migrations)
  - [Studio](#studio)
- [Prisma Client](#prisma-client)
  - [Configuração](#configuração)
  - [Get](#get)
    - [Todos](#todos)
    - [Único](#único)
  - [Order by](#order-by)
  - [Retorno](#retorno)
  - [Create](#create)
  - [Update](#update)
  - [Delete](#delete)
- [Next](#next)
- [React](#react)
  - [Componentes](#componentes)
    - [Estilização](#estilização)
  - [Propriedades](#propriedades)
  - [Roteamento](#roteamento)
  - [Classes](#classes)
  - [Fontes](#fontes)
  - [Metadata](#metadata)
  - [Comentários](#comentários)
  - [Imagens](#imagens)
- [Tailwind](#tailwind)
  - [Fontes](#fontes-1)
  - [Cores](#cores)
  - [Altura](#altura)
  - [Largura](#largura)
  - [Hover](#hover)
  - [Padding](#padding)
  - [Transition](#transition)
- [Expo](#expo)
  - [Execução](#execução)
  - [Html](#html)
  - [CSS](#css)
  - [Fontes](#fontes-2)
  - [Imagens](#imagens-1)
    - [Background](#background)
    - [Svg](#svg)
  - [Botão](#botão)
    - [TouchableOpacity](#touchableopacity)


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

Os tipos suportados são: GET, POST, PUT, DELETE

## Sub-rotas

Crie um pasta chamada *routes* no *src*, crie o arquivo da rota.

Importe o *FastifyInstance* e o objeto do *prisma*.

    import { FastifyInstance } from 'fastify'
    import { prisma } from '../lib/prisma'

Exporte uma função assíncrona que irá conter o nome da 
*sub-rota + routes*, conforme o exemplo abaixo:

    export async function memoriesRoutes(app: FastifyInstance) {...}

Dentro dele defina as rotas:

    app.get('/users', async () => {
        const users = await prisma.user.findMany()
        return users
    })

## Parâmetros

Get

    app.get('/route/:param', async () => {
        . . .
    })

    app.get('/memories/:id', async () => {
        . . .
    })

### Validação

Instale o *zod*:

    npm install zod

Importe:

    import { z } from 'zod'

Dentro da rota, faça da seguinte maneira:

Crie a rota e passe um request como parâmetro para dentro da arrow function:

    app.get('/route/:param', async (request) => {. . .})

Crie o modelo dos parâmetros validados:
    
    const paramsSchema = z.object({
        param: z.type(),
    })

Pegue os parâmetros retornados pelo *paramsSchema* e atribua a constantes:

    const { param } = paramsSchema.parse(request.params)

Exemplo:

    app.get('/memories/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = paramsSchema.parse(request.params)
    })

### Booleanos

A validação pra booleanos funciona da seguinte forma:

    const bodySchema = z.object({
      param: z.coerce.boolean(),
    })

O *coerce* converte o valor recebido do front, em um valor booleano 
correspondente.

    const bodySchema = z.object({
      content: z.string(),
      isPublic: z.coerce.boolean().default(false), // coerce convert the value to equivalent in true or false
    })

**Nota:** *default* é um método que serve para definir o valor padrão.

## Cors

Instale o pacote que gerencia os *cors*:

    npm install @fastify/cors

*server.ts*

Faça o importe dos *cors*:

    import cors from '@fastify/cors'

Configure ele:

    app.register(cors, {
        origin: true, // All urls
    })

**Nota:** Em *origin* você pode passar um *array* com as urls que podem 
acessar, ou passar um *true* que define que todas as urls podem acessar.

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

**Nota:** No caso do id, dizemos que ele é do tipo chave primária (@id) e 
possui um *uuid* único por padrão.

**Não se esqueça de fazer a migração.**

### Relacionamento

O relacionamento entre models é simples, basta fazer o seguinte:

**Nota:** Nesse caso é um relacionamento de muitos para um.

    model User {
        id        String   @id @default(uuid())
        memories  Memory[]
    }

    model Memory {
        id        String   @id @default(uuid())
        userId    String
        user      User     @relation(fields: [userId], references: [id])
    }

No caso no model *Memory*, ele indica que o *userId* está relacionado 
ao *User*, se referenciando pelo id dele, já o *User* pode possuir 
várias *memories*.

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

*src/lib/prisma.ts*

Importe o *PrismaClient*

    import { PrismaClient } from '@prisma/client'

Crie e exporte uma constante, além de configurar um *log* para as *query's*:

    export const prisma = new PrismaClient({
        log: ['query'],
    })

Para usar, basta fazer um import:

    import { prisma } from 'lib/prisma'

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

Caso queria fazer um filtro, nesse caso ele só irá pegar os que possuem name:

    const users = await prisma.user.findMany({
        select: {
            name: true,
        },
    })

### Único

Encontre ou retorne um erro:

    const model_data = prisma.model.findUniqueOrThrow({
      where: {
        field_data,
      },
    })

Exemplo:

    const { id } = paramsSchema.parse(request.params)

    const memory = prisma.memory.findUniqueOrThrow({
      where: {
        id,
      },
    })

## Order by

    const model = await prisma.model.findMany({
        orderBy: {
            field: 'asc', // Crescente
        },
    })

    const memories = await prisma.memory.findMany({
        orderBy: {
            createdAt: 'asc',
        },
    })

## Retorno

Você pode modificar a forma dos dados serem passados para o front-end

    return model.map((model_data) => {
      return {
        field: model_data.field,
      }
    })

    return memories.map((memory) => {
      return {
        id: memory.id,
        coverUrl: memory.converUrl,
        excerpt: memory.content.substring(0, 115).concat('...'),
      }
    })

Desse modo, ele só irá retornar campos específicos.

## Create

Use o método *create* do *model*, passando um objeto chamado de *data* 
contendo os valores da *data*.

    const model_data = await prisma.model.create({
        data: {
            field_value,
        },
    })

Exemplo:

    const content = "value"

    const memory = await prisma.memory.create({
        data: {
            content,
            userId: '6083458c-b7b0-4b10-b29d-ec459ca20ba1',
        },
    })

**Nota:** No caso do *memory*, o userId é obrigatório.

## Update

Use o método *update*.

Normalmente usamos o *id* como *field* para o where:

    const modelUpdated = await prisma.model.update({
        where: {
            field,
        },
        data: {
            fieldValue,
        },
    })

Exemplo

    const id = 'zbv'
    const content = '1326'

    const memoryUpdated = await prisma.memory.update({
        where: {
            id,
        },
        data: {
            content,
        },
    })

## Delete

Basicamente igual ao get, só que chamando o método *delete*.

    app.delete('/route/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        await prisma.model.delete({
            where: {
                id,
            },
        })
    })

Exemplo:

    app.delete('/memories/:id', async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        await prisma.memory.delete({
            where: {
                id,
            },
        })
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

## Fontes

Para usar fontes do google faça o seguinte.

Arquivo *layout.tsx*

Importe as fontes a serem usadas

    import {
        Roboto_Flex as Roboto,
        Bai_Jamjuree as BaiJamjuree,
    } from 'next/font/google'

Crie constantes para elas.

    const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
    const baijamjuree = BaiJamjuree({
        subsets: ['latin'],
        weight: '700',
        variable: '--font-baijamjuree',
    })

O parâmetro *variable* serve para o tailwind acessar a fonte.

**Nota:** Como a *roboto* é flex, não é necessário passar o *weight* dela, 
diferente da *BaiJamjuree*.

Arquivo *tailwind.config.js*

Você deve criar uma fontFamily para cada uma das fontes a serem utilizadas

    extend: {
      fontFamily: {
        sans: 'var(--font-roboto)',
        alt: 'var(--font-baijamjuree)',
    },

Arquivo *layout.tsx*

Agora para implementar as fontes na aplicação.

Passe as fontes com a variável e a *fontFamily* que vai ser usada 
[no caso que acabamos de definir]

    export default function RootLayout({ children }: { children: ReactNode }) {
        return (
            <html lang="en">
            <body className={`${roboto.variable} ${baijamjuree.variable} font-sans`}>{children}</body>
            </html>
        )
    }

Desse modo ele irá implementar a fonte.

Para usar ela basta colocar no html

    <h1 className="font-alt">Texto</h1>

## Metadata

A metadata são os dados da página, como título e descrição, localizados 
no *layout.tsx*

    export const metadata = {
        title: 'NLW Spacetime',
        description:
            'Uma cápsula do tempo criada com React, Next.js, TailwindCSS e Typescript',
    }

## Comentários

    {/* Right */}
    <div></div>

## Imagens

Importe o Image do next:

    import Image from 'next/image'

Importe a imagem:

    import nlwLogo from '../assets/nlw-spacetime-logo.svg'

Adicione ao código

    <Image src={nlwLogo} alt="NLW Spacetime" />

Isso faz a otimização automática da imagem.

# Tailwind

O tailwind é um framework css.

A estilização dele é feita por classes.

Consulte a documentação e veja o tópico anterior para trabalhar com ele.

## Fontes

Veja a configuração do react para fontes.

## Cores

**Nota:** Isso serve para a configuração de qualquer propriedade, basta 
colocar o a propriedade e abrir o objeto com o nome e o valor desejado.

Arquivo *tailwind.config.js*

    theme: {
        extend: {
            colors: {
                    nome: {
                    weight: '#eaeaea',
                }
            }
        }
    }

    theme: {
        extend: {
            colors: {
                    gray: {
                    50: '#eaeaea',
                    100: '#bebebf',
                }
            }
        }
    }

## Altura

    <p className="h-[Alturapx]"></p>

    <p className="h-[360px]"></p>

## Largura

    <p className="w-[Largurapx]"></p>

    <p className="w-[360px]"></p>

## Hover

    <p className="hover:alteração"></p>

    <p className="hover:text-gray-50"></p>

## Padding

Horizontal

    px-tamanho

    px-28

Cima e baixo

    py-tamanho

    py-16

## Transition

Transição de cores

    transition-colors

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

**Nota:** Essa reinicialização deve ser feita após adicionar dependências ao 
projeto.

## Fontes

Instale as fontes do google que serão usadas:

    npx expo install @expo-google-fonts/roboto @expo-google-fonts/bai-jamjuree expo-font

No *App.tsx*

Faça a importação das fontes e do *useFonts*

    import {
        useFonts,
        Roboto_400Regular,
        Roboto_700Bold,
    } from '@expo-google-fonts/roboto'

    import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'

**Nota:** O *useFonts* só precisa ser importado uma vez

Agora dentro da função do *App*, utilize o useFonts, passando um objeto 
contendo as fontes importadas, adicione o retorno a uma constante array que 
irá receber um valor chamado de *hasLoadedFonts*, ele é do tipo *booleano* e 
retornado pelo use fonts.

    export default function App() {
        const [hasLoadedFonts] = useFonts({
            Roboto_400Regular,
            Roboto_700Bold,
            BaiJamjuree_700Bold,
        })
        . . .
    }

Após isso verifique se as fontes carregaram, caso não retorne um 
null, isso irá garantir que o app só inicie quando as fontes forem 
renderizadas.

    if (!hasLoadedFonts) {
        return null
    }

## Imagens

### Background

No caso vamos aplicar uma imagem de background, faça a importação da classe:

    import ImageBackground from 'react-native'

Faça a importação da imagem:

    import image from 'path'

    import blurBg from './src/assets/bg-blur.png'

**Nota:** Na pasta onde está as imagens, crie um arquivo chamado de 
*assets.d.ts* e coloque isso nele:

    declare module '*.png'

Isso servirá para que o react entenda que pode importar todo arquivo png.

Faça a aplicação:

    <ImageBackground source={blurBg}></ImageBackground>

### Svg

Instale os pacotes necessários para trabalhar com svg:

    npx expo install react-native-svg

    npm install -d react-native-svg-transformer

Na raiz da aplicação, crie um arquivo chamado de *metro.config.js*, contendo 
o seguinte:

    const { getDefaultConfig } = require('expo/metro-config')

    module.exports = (() => {
    const config = getDefaultConfig(__dirname)

    const { transformer, resolver } = config

    config.transformer = {
        ...transformer,
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    }
    config.resolver = {
        ...resolver,
        assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
        sourceExts: [...resolver.sourceExts, 'svg'],
    }

    return config
    })()

Dentro do local dos svg's, crie um arquivo chamado *assets.d.ts*, caso não 
exista, e coloque o seguinte:

    declare module '*.svg' {
        import React from 'react'
        import { SvgProps } from 'react-native-svg'
        const content: React.FC<SvgProps>
        export default content
    }

Importe o svg:

    import Stripes from './src/assets/stripes.svg'

**Nota:** Ele está com a inicial maiúscula, uma vez que o react transforma ele 
em um componente.

Agora para implementar:

    <Stripes />

Para estilizar com *className*, você deve fazer o seguinte:

    import { styled } from 'nativewind'

    const StyledComponent = styled(Component)
    const StyledStripes = styled(Stripes)

Agora:

    <StyledStripes className="absolute left-2" />

## Botão

Não existe botões no react native, uma vez que eles são chamados de *Touchable*:

### TouchableOpacity

É um botão com hover que fica opaco com o toque, a opacidade é definida na 
propriedade *activeOpacity*:

    import { TouchableOpacity } from 'react-native'

    <TouchableOpacity activeOpacity={0.7}>

Textos devem ser adicionados dentro dos componentes *texts* e colocados dentro 
do botão.

    <Text>Cadastrar lembrança</Text>
