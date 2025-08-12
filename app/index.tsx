import { Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import{auth} from '../services/firebaseConfig'


export default function LoginScreen() {
  // Estados para armazenar os valores digitados

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const router = useRouter()//Hook de navegação

  useEffect(() => {
    const verificarUsuarioLogado = async () => {
      try {
        const usuarioSalvo = await AsyncStorage.getItem('@user')
        if (usuarioSalvo) {
          router.push('/HomeScreen')//Se tiver algo armazenado local, redireciona para HomeScreen
        }
      } catch (error) {
        console.log("Erro ao verificar login", error)
      }
    }

    //Chama a função estruturada acima
    verificarUsuarioLogado()
  },[])

// Função para simular o envio do formulário
const handleLogin = () => {
  if (!email || !senha) {
    Alert.alert('Atenção', 'Preencha todos os campos!');
    return;
  }
   signInWithEmailAndPassword(auth, email, senha)
    .then(async(userCredential)=>{
      const user = userCredential.user
      await AsyncStorage.setItem('@user',JSON.stringify(user))
      router.push('/HomeScreen')
    })
    .catch((error)=>{
      const errorCode = error.code
      const errorMessage = error.message
      console.log("Error Mensagem: ",errorMessage)
    })
};

//função para enviar o email de reset de senha para o usuário
const esqueceuSenha = ()=>{
  if(!email){
    alert("Digite o email para recuperar a senha")
  }
  sendPasswordResetEmail(auth,email)
    .then(()=>{alert("Enviado email de recuperação")})
    .catch((error)=>{
      console.log("Error ao enviar email",error.message)
      alert("Erro ao enviar e-mail. Verifique se o email está correto.")
    })
}

return (
  <View style={styles.container}>
    <Text style={styles.titulo}>Realizar login</Text>


    {/* Campo Email */}
    <TextInput
      style={styles.input}
      placeholder="E-mail"
      placeholderTextColor="#aaa"
      keyboardType="email-address"
      autoCapitalize="none"
      value={email}
      onChangeText={setEmail}
    />

    {/* Campo Senha */}
    <TextInput
      style={styles.input}
      placeholder="Senha"
      placeholderTextColor="#aaa"
      secureTextEntry
      value={senha}
      onChangeText={setSenha}
    />

    {/* Botão */}
    <TouchableOpacity style={styles.botao} onPress={handleLogin}>
      <Text style={styles.textoBotao}>Login</Text>
    </TouchableOpacity>

    <Link href="CadastrarScreen" style={{ marginTop: 20, color: 'white', marginLeft: 150 }}>Cadastre-se</Link>
    
    <Text style={{color:'white',justifyContent:"center",alignItems:"center", marginLeft:130}} onPress={esqueceuSenha}>Esqueceu a Senha?</Text>
  </View>
);
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#333',
  },
  botao: {
    backgroundColor: '#00B37E',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
