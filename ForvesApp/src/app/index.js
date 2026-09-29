import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Pressable, 
  StyleSheet, 
  ActivityIndicator 
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { cores } from '../data/tema';

const API_URL = 'http://192.168.1.100:3000/api'; // Coloque o IP da sua API Backend

export default function Login() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  async function fazerLogin() {
    if (!usuario || !senha) {
      setMensagemErro('Preencha todos os campos.');
      return;
    }

    setCarregando(true);
    setMensagemErro('');

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: usuario, password: senha })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Credenciais inválidas.');
      }

      await AsyncStorage.setItem('mt_token', data.token);
      await AsyncStorage.setItem('mt_usuario', JSON.stringify(data.usuario));

      router.replace('/dashboard');
    } catch (error) {
      setMensagemErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    
      
        Forve's
        Sistema de Controle de Acesso

        {mensagemErro ? {mensagemErro} : null}

        Usuário
        

        Senha
        

        
          {carregando ? (
            
          ) : (
            Entrar
          )}
        
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cores.fundo,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardLogin: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: cores.fundoCard,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: cores.textoPrincipal,
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 14,
    color: cores.textoSecundario,
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    color: cores.textoPrincipal,
    fontSize: 14,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: cores.fundo,
    color: cores.textoPrincipal,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  botao: {
    backgroundColor: cores.roxo,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  textoBotao: {
    color: cores.textoPrincipal,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoErro: {
    color: cores.vermelho,
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  }
});