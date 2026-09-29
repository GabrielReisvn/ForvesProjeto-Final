import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cores } from '../data/tema';

export default function Dashboard() {
  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [trancaAberta, setTrancaAberta] = useState(false);

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    const usuarioSalvo = await AsyncStorage.getItem('mt_usuario');
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }

  async function alternarTranca() {
    try {
      setTrancaAberta(!trancaAberta);
      Alert.alert("Sucesso", trancaAberta ? "Fechadura Trancada!" : "Fechadura Destrancada!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível se comunicar com o ESP32.");
    }
  }

  async function fazerLogout() {
    await AsyncStorage.removeItem('mt_token');
    await AsyncStorage.removeItem('mt_usuario');
    router.replace('/');
  }

  return (
    
      
        
          Olá, {usuario?.user || 'Usuário'}
          Painel Geral Forve's
        
        
          Sair
        
      

      
        Status da Tranca (ESP32)
        
          {trancaAberta ? "ABERTA" : "TRANCADA"}
        

        
          
            {trancaAberta ? "Trancar Agora" : "Abrir Fechadura"}
          
        
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
  },
  conteudo: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  saudacao: {
    fontSize: 22,
    fontWeight: 'bold',
    color: cores.textoPrincipal,
  },
  subtitulo: {
    fontSize: 14,
    color: cores.textoSecundario,
  },
  botaoSair: {
    backgroundColor: cores.borda,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  textoSair: {
    color: cores.vermelho,
    fontWeight: 'bold',
  },
  cardStatus: {
    backgroundColor: cores.fundoCard,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: cores.borda,
    alignItems: 'center',
  },
  cardTitulo: {
    color: cores.textoSecundario,
    fontSize: 14,
    marginBottom: 8,
  },
  statusTexto: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  botaoAcao: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoAcao: {
    color: cores.textoPrincipal,
    fontWeight: 'bold',
    fontSize: 16,
  }
});