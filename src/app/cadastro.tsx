import { Button, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { db} from '../firebase/firebaseConfing';
import { collection, addDoc } from 'firebase/firestore';
import { router } from 'expo-router';
import { auth } from '../firebase/firebaseConfing';

//cargo
//empresa
//salario

export default function Cadastro() {

    const [cargo, setCargo] = useState('')
    const [empresa, setEmpresa] = useState('')
    const [salario, setSalario] = useState('')


    useEffect(()=>{
        const unsubcrib = auth.onAuthStateChanged((user)=>{
            if (!user) {
                router.replace("/login")
            }
        })
        return
    },[])

    async function salvarVaga(){
        await addDoc(
            collection(db,"vagas"),
            {
                cargo,
                empresa,
                salario
            }
        )
        alert("Vaga cadastrada!")
    }
    return (
        <View style={styles.container}>
    <View style={styles.card}>
      <Text style={styles.titulo}>Cadastro de Vagas</Text>

      <TextInput
        style={styles.input}
        value={cargo}
        onChangeText={setCargo}
        placeholder="Digite o cargo..."
      />

      <TextInput
        style={styles.input}
        value={empresa}
        onChangeText={setEmpresa}
        placeholder="Digite a empresa..."
      />

      <TextInput
        style={styles.input}
        value={salario}
        onChangeText={setSalario}
        placeholder="Digite o salário..."
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={salvarVaga}
      >
        <Text style={styles.textoBotao}>Salvar Vaga</Text>
      </TouchableOpacity>
    </View>
  </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#272acf",
    marginBottom: 25,
  },

  input: {
    height: 55,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: "#fafafa",
    marginBottom: 15,
    fontSize: 16,
  },

  botao: {
    backgroundColor: "#272acf",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});