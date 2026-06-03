import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import { auth } from "@/firebase/firebaseConfing";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "@/firebase/firebaseConfing";
import { setDoc, doc } from "firebase/firestore";
import { router } from "expo-router";


//nome
//email
//senha


export default function CadastroUsuario() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    async function cadastrarUsuario(){

        if (!nome.trim()) {
            alert("Atenção, informe o nome")
            return
        }
        if (!email.trim()) {
            alert("Atenção, informe o email")
            return
        }
         
      try {
   
         const credencial = await createUserWithEmailAndPassword(
            auth,
            email,
            senha
         );

         await setDoc(
            doc(db,"usuarios", credencial.user.uid),
            {
                nome,
                email,
                criadoEm: new Date()
            }
         )
         alert("Usuario cadastrado com sucesso!")

         router.push('/login')

      } catch (error) {
        alert("Erro ao cadastrar")
        console.log(error)

      }

    }

   return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Cadastro de Usuário</Text>

            <TextInput 
            placeholder="Nome.."
            value={nome}
            onChangeText={setNome}
            style={styles.input}
            />

            <TextInput 
            placeholder="Email.."
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
            />

            <TextInput 
            placeholder="Senha.."
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
            style={styles.input}
            />

            <TouchableOpacity
            disabled={senha.length < 6}
            style={[styles.botao, senha.length < 6 && {opacity:0.5}]}
             onPress={cadastrarUsuario} 
            >
                <Text style={styles.textoBotao}>Cadastrar</Text>
            </TouchableOpacity>



        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        padding:20,
        backgroundColor:"#f8fafc"
    },
    titulo:{
        fontSize:28,
        fontWeight: "bold",
        textAlign:'center',
        marginBottom:30
    },
    input:{
        borderWidth:1,
        borderColor:"#d1d5db",
        borderRadius:10,
        padding:15,
        marginBottom:15,
        backgroundColor:"#fff"
    },
    botao:{
        backgroundColor:"#2563eb",
        padding:15,
        borderRadius:10,
        alignItems:'center'
    },
    textoBotao:{
        color:"#fff",
        fontSize:18,
        fontWeight:"bold"
    }
})


