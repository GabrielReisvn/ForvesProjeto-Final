# 🎮 GameHub — Kit inicial

Este é o **ponto de partida** do projeto. Ele ainda não tem nenhuma tela —
vamos construir tudo juntos, passo a passo, em aula.

O que já vem pronto aqui:

- `assets/` → ícones do app e as imagens dos jogos (`assets/games/`), para
  vocês não perderem tempo procurando imagem na internet.
- `app.json` → configurações básicas do Expo, já apontando para os ícones.
- `package.json` / `package-lock.json` → lista das bibliotecas que o projeto
  usa, nas versões certas.
- `babel.config.js` → configuração necessária para o Expo Router funcionar.

O que **não** vem pronto (de propósito): a pasta `src/` com as telas. Isso é
o que vamos criar juntos, começando na próxima aula.

## Antes da primeira aula

1. Confirme que o Node.js está instalado:
   ```bash
   node -v
   ```
2. Instale o app **Expo Go** no seu celular (Android ou iOS), ou configure um
   emulador no seu computador.
3. Extraia este `.zip` numa pasta (ex.: `GameHub/`) e, dentro dela, rode:
   ```bash
   npm install
   ```
   Isso baixa todas as bibliotecas listadas no `package.json`.
4. Deixe seu celular na **mesma rede Wi-Fi** do computador — é assim que o
   Expo Go vai conseguir se conectar ao projeto.

## Um ajuste antes de gerar seu próprio APK (mais pra frente)

No `app.json`, o campo `"package"` está como `"com.SEUNOME.gamehub"`. Quando
chegar a hora de gerar seu próprio `.apk` (veremos isso no fim do curso),
troque `SEUNOME` pelo seu nome ou usuário, em minúsculo e sem espaços —
por exemplo: `"com.joaosilva.gamehub"`. Cada aluno precisa de um identificador
diferente para o EAS não confundir os projetos.

## Testando que está tudo certo

Depois do `npm install`, rode:

```bash
npx expo start
```

Isso vai abrir o Metro Bundler no terminal. Não se preocupe se aparecer erro
de "nenhuma tela encontrada" — é esperado, porque ainda não criamos nenhuma
tela. A partir da próxima aula, isso muda rapidinho. 🚀
