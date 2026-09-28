// =============================
// Etapa 3; criar o arquivo jogos.js com os dados dos jogos

export const jogos = [
    {
       id: '1',
       nome: 'Minecraft',
       genero: 'sandbox',
       nota: 4.8,
       Plataforma: 'PC, Console, Mobile' ,
       Descricao: 'Um mundo feito de blocos onde você pode construir',
       imagem: require('../../assets/games/minecraft.jpg'),
       Destaque: true

    },
    {
       id: '2',
       nome: 'Fortnite',
       genero: 'battle',
       nota: 4.7,
       Plataforma: 'PC, Console, Mobile' ,
       Descricao: 'Uma ilha, um objetivo, SOBREVIVER!',
       imagem: require('../../assets/games/fortnite.jpg'),
       Destaque: false

    },
    {
       id: '3',
       nome: 'EA Sports FC',
       genero: 'Esports',
       nota: 4.9,
       Plataforma: 'PC, Console, Mobile' ,
       Descricao: 'Simulador de futebol mais famoso do mundo',
       imagem: require('../../assets/games/ea-sports-fc.jpg'),
       Destaque: true

    },
    {
       id: '4',
       nome: 'Roblox',
       genero: 'sandbox',
       nota: 4.2,
       Plataforma: 'PC, Console, Mobile' ,
       Descricao: 'Varios jogos dentro de um jogo!',
       imagem: require('../../assets/games/roblox.jpg'),
       Destaque: true

    },
    {
       id: '5',
       nome: 'Rocket League',
       genero: 'Esports',
       nota: 4.5,
       Plataforma: 'PC, Console, Mobile' ,
       Descricao: 'Futebol com carros turbinados',
       imagem: require('../../assets/games/rocket-league.jpg'),
       Destaque: false

    },
    {
       id: '6',
       nome: 'Valorant',
       genero: 'FPS',
       nota: 4.4,
       Plataforma: 'PC, Console, Mobile' ,
       Descricao: 'Um jogo de tiro tatico em equipe',
       imagem: require('../../assets/games/valorant.jpg'),
       Destaque: true

    },
    {
       id: '7',
       nome: 'TheSims',
       genero: 'Simulação',
       nota: 4.2,
       Plataforma: 'PC, Console, Mobile' ,
       Descricao: 'Simulador e3 vida real',
       imagem: require('../../assets/games/the-sims.jpg'),
       Destaque: false

    },
    {
       id: '8',
       nome: 'Among Us',
       genero: 'dedução social',
       nota: 4.1,
       Plataforma: 'PC, Console, Mobile' ,
       Descricao: 'Descubra quem é o impostor',
       imagem: require('../../assets/games/among-us.jpg'),
       Destaque: false

    },
]
// VAMOS PARA ETAP 4; Criar arquivo gamecard.js com dados dos game