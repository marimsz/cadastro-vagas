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
    <View style={{flex:1, padding: 20}}>
      <Text style={{fontSize:24, fontWeight: 'bold', marginBottom: 20}}>Vagas</Text>
      <TouchableOpacity onPress={()=> router.push("/cadastro")}
        style={{borderWidth:1, padding:10, marginBottom:10, backgroundColor: '#007bff', borderRadius: 8}}>

        <Text style={{color: 'white', fontWeight: 'bold'}}>Cadastrar Vagas</Text>
      </TouchableOpacity>
      <FlatList
        data={vagas}
        keyExtractor={(item)=> item.id}
        renderItem={({item})=>(
          <View style={{borderWidth: 1, padding:15, marginBottom:10, borderRadius: 8}}>
            <Text style={{fontWeight: 'bold', fontSize: 18}}>{item.cargo}</Text>
            <Text>{item.empresa}</Text>
            <Text>{item.salario}</Text>
          </View>
        )}
      />

      <TouchableOpacity onPress={logout}
      style={{
        backgroundColor:"#ef4444",
        padding:15,
        borderRadius:10
      }}
      >
         <Text style={{color:"#fff", textAlign:"center", fontWeight:"bold"}}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

