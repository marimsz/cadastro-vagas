import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/firebaseConfing';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";

export default function Home() {

  const [vagas, setVagas] = useState<any[]>([])

  async function logout() {
    try {
        await signOut(auth);
        router.replace("/login")
    } catch (error) {
        console.log(error)
    }
  }

  async function carregarVagas(){
     const snapshot = await getDocs(
      collection(db,"vagas")
     );

      const lista : any = []

      snapshot.forEach((doc)=>{
        lista.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setVagas(lista)
  }

  useEffect(()=>{
    carregarVagas()
  },[])


  return (
    <View style={styles.container}>

  <Text style={styles.titulo}>💼 Vagas Disponíveis</Text>

  <TouchableOpacity
    onPress={() => router.push("/cadastro")}
    style={styles.botaoCadastrar}
  >
    <Text style={styles.textoBotao}>+ Cadastrar Vaga</Text>
  </TouchableOpacity>

  <FlatList
    data={vagas}
    keyExtractor={(item) => item.id}
    showsVerticalScrollIndicator={false}
    renderItem={({ item }) => (
      <View style={styles.card}>
        <Text style={styles.cargo}>{item.cargo}</Text>

        <Text style={styles.empresa}>
          🏢 {item.empresa}
        </Text>

        <Text style={styles.salario}>
          💰 R$ {item.salario}
        </Text>
      </View>
    )}
  />

  <TouchableOpacity
    onPress={logout}
    style={styles.botaoLogout}
  >
    <Text style={styles.textoLogout}>
      Sair da Conta
    </Text>
  </TouchableOpacity>

</View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
    padding: 20,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 20,
    textAlign: "center",
  },

   botaoCadastrar: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  textoBotao: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 3,
  },

  cargo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },

  empresa: {
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 5,
  },

  salario: {
    fontSize: 18,
    color: "#16A34A",
    fontWeight: "bold",
  },

  botaoLogout: {
    backgroundColor: "#DC2626",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  textoLogout: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});
