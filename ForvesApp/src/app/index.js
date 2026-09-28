// ETAPA 1 - INICIO DO PROJETO: TELA INICIAL

// O que fazemos aqui?
// Esta é a tela inicial do app (rota "/")

import { View, Text, ScrollView, FlatList, Pressable, StyleSheet} from "react-native";
// View: Conteiner básicos
// Text: para exibir texto
// ScrollView: permite rolagem vertical
// Flatlist: lista otimizada com rolagem
// Pressable: botão de feedback de toque
// StyleShett: define estilos

import { useRouter } from "expo-router";
// acesso ao objeto router, tem a função de navegação baseada em arquivos (biblioteca).

import GameCard from "../components/GameCard";
// Reutilizar componentes, isso evita duplicação código e mantem a consistência visual.

import { jogos } from "../data/jogos";
// Importante uma array de objetos do arquivo data/jogos.js

import { cores } from "../data/tema";
// importa a paleta de cores do app do arquivo data/tema.js

// ==================================
export default function Inicio(){
    const router = useRouter();
    // obtemos o objeto de navegação

    //-------------------------------
    // BLOCO 1 - Preparação dos dados
    //-------------------------------
    
    const destaques = jogos.filter((jogo) => jogo.destaque)
    // percore o array jogos e cria um novo array destaques contendo apenas os objetos cuja o campo "destaque" seja true.
    const populares = [...jogos].sort((a, b) => b.nota - a.nota).slice(0, 6);
    // ...jogos -> cria uma cópia do array original
    // sort((a, b) => b.nota - a.nota) ordena a cópia da maior nota para a menor
    // .slice(0, 5): extrai apenas os 5 primeiros elementos do array
    
    //-------------------------------
    // BLOCO 2 - ESTRUTURA DA TELA 
    //-------------------------------
    return (
        // Inicio do JSX retornando pelo componente: define o que será renderizado na tela
        <ScrollView style={styles.container} contentContainerStyle={styles.conteudo}>
           {/* scrollview: container com rolagem vertical */}
           <Text style={styles.titulo}>GameHub</Text>
           {/* Exibe o texto "Gamehub" como título, usando o estilo "titulo" */}
           <Text style={styles.subtitulo}>Seu universo de jogos em um só lugar</Text>

        {/*-------------------------------
        BLOCO 2.1 - Seção Jogos 
        -------------------------------*/}
        <Text style={styles.secaoTitulo}>Jogos em destaque</Text>
        {/* Exibe o titulo desta seção, usando o estilo "secaotitulo" */}
        <FlatList
            data={destaques}
            // define a fonte de dados da lista - array "destaques"
            keyExtractor={(item) => item.id}
            // Função que retorna uma chave única
            horizontal
            // faz a lista rolar
            showsVerticalScrollIndicator={false}
            // oculta a barrinha de rolagem horizontal, deixando a interface mais limpa
            renderItem={({item}) => <GameCard jogo={item}/>}
            // função chamada para cada elemento do array "data"
        />
        {/*-------------------------------
        BLOCO 2.2 - Seção "Mais populares" 
        -------------------------------*/}
        {/* Mesma estruta da seção anterior, mas com dados diferentes */}

        <Text style={styles.secaoTitulo}>Mais Populares</Text>
        {/* Título da segunda seção, reaproveitando o mesmo estilo "Seção Titulo" */}

        <FlatList
            data={populares}
            // Desta vez a fonte de dados é o array "populares" (top 5 por nota)
            keyExtractor={(item) => item.id}
            // Mesma lógica de chave única no id do Jogo
            horizontal
            // Lista horizontal, igual à seção anterior
            showsHorizontalScrollIndicator={false}
            // Esconder o indicador de rolagem
            renderItem={({item}) => <GameCard jogo={item} />}
            // Reutiliza o mesmo componente GameCard, provando que ele funciona com qualquer lista de jogos!        
        />        
        {/*-------------------------------
        BLOCO 2.3 - Botao "Ver todos jogos" 
        -------------------------------*/}
        {/* Pressable oferece mais controle sobre o estilo e feedback visual */}
        <Pressable
        style={styles.botao}
        // Aplica o estilo visual no botão!
        onPress={() => router.push("./jogos")}
        // onPress: Função executada quando o usuário toca no botão
        // router.push("/jogos") navega para a rota "/jogos"
        >
            <Text style={styles.textoBotao}>Ver todos os Jogos</Text>

        </Pressable>
        
        </ScrollView>
    );
}
//-------------------------------
// BLOCO 3 - ESTILOS 
//-------------------------------
// PORQUE USAR StyleSheet?
// - StyleSheet.create oyimixs os estilos (evita recriação desnecessária)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: cores.fundo,
    },
    conteudo: {
        padding: 8,
        paddingBottom: 40,
    },
    titulo: {
        fontSize: 32,
        fontWeight: "bold",
        color: cores.textoPrincipal,
    },
    subtitulo: {
        fontSize: 15,
        color: cores.textoSecundario,
        marginTop: 4,
        marginBottom: 24,
    },
    secaoTitulo: {
        fontSize: 18,
        fontWeight: "bold",
        color: cores.textoPrincipal,
        marginTop: 8,
        marginBottom: 12,
    },
    botao: {
        backgroundColor: cores.roxo,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 24,
    },
    textoBotao: {
        color: cores.textoPrincipal,
        fontSize: 16,
        fontWeight: "bold",
    }
})
//  AGORA VAMOS PARA A ETAPA 2 – CRIAR O ARQUIVO tema.js PARA CENTRALIZAR AS CORES
