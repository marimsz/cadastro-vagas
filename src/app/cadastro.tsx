import { Button, Text, TextInput, View, StyleSheet } from 'react-native';
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
        <View>
            <Text>Cadastro de Vagas</Text>

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
            />

            <Button 
              title="Salvar"
              onPress={salvarVaga}
            />

        </View>
    )     
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        padding:10,
        margin:5
    },
})