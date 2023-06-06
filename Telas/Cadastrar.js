import { useState, Component } from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity, Image} from 'react-native';
import CheckBox from '../Comp/CheckBox';
import { useNavigation } from '@react-navigation/native';
import firebase from '../src/firebaseConfig';

export default function App(){

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [Confirmarsenha, setConfirmarsenha] = useState('');
  const [isServidor, setIsServidor] = useState(false);
  const navigation = useNavigation();

  async function CadastrarDados(){
    if(senha !== Confirmarsenha){
      alert("As senhas devem ser idênticas!");
      return;
    };
    if(nome !== '' && sobrenome !== '' && telefone !== '' && email !== '' && senha !=='' && Confirmarsenha !==''){
      await firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then((value) =>{
        firebase.database().ref('Usuarios').child(value.user.uid).set({
          nome: nome,
          sobrenome: sobrenome,
          telefone: telefone,
          email: email,
          senha: senha,
          isServidor: isServidor,
        })
        alert("Cadastro realizado com sucesso!")
        return;
      })
      .catch(() =>{
        alert("Erro ao cadastrar");
        return;
      })
      setNome('');
      setSobrenome('');
      setTelefone('');
      setEmail('');
      setSenha('');
      setConfirmarsenha('');
      setIsServidor(false);
    }else {
      alert("Preencha os dados!");
    };
    
  };

  return(
      <View style={styles.container}>
        <Text style={styles.Cadastrar}>
            Cadastrar
        </Text>      
        <TextInput placeholder='   Nome' style={styles.TextInput} value={nome} onChangeText={text=>setNome(text)} /> 
        <TextInput placeholder='   Sobrenome' style={styles.TextInput} value={sobrenome} onChangeText={text=>setSobrenome(text)} /> 
        <TextInput placeholder='   Telefone' style={styles.TextInput} value={telefone} onChangeText={text=>setTelefone(text)} /> 
        <TextInput placeholder='   Email' style={styles.TextInput} value={email} onChangeText={text=>setEmail(text)} />  
        <TextInput secureTextEntry={true} placeholder='   Senha' style={styles.TextInput} value={senha} onChangeText={text=>setSenha(text)} />  
        <TextInput secureTextEntry={true} placeholder='   Confirmar senha' style={styles.TextInput} value={Confirmarsenha} onChangeText={text=>setConfirmarsenha(text)} />  
        
        <CheckBox checked={isServidor} value={isServidor} onChange={() => setIsServidor(!isServidor)} />
                <TouchableOpacity style={styles.btnCadastro} onPress={()=>CadastrarDados()}>
        <Text style={{color:'white', textAlign: 'center', fontSize:16}}> Cadastrar</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.Terlogin}> Já possui uma conta? Faça o Login! </Text>
        </TouchableOpacity>
      </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    
  },

  TextInput:{
    flexDirection:'column',
    alignItems:'flex-end' ,
    width:'80%',
    backgroundColor:'#D9D9D9',
    textAlignVertical: 'center',
    borderRadius: 30,
    marginBottom: 15,
    fontSize: 14,
    padding: 12
  },

  btnCadastro:{
    backgroundColor: '#F24E1E',
    width: '42.4%',
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    marginTop: -20,
    marginBottom: 20,
  },

 Cadastrar:{
  flex: 1,
  fontSize: 40,
  width: '55%',
  height: 0,
  fontWeight: 'bold',
  padding: 11,
  marginTop: 40
 },

 Terlogin:{ 
  fontSize:14,
  height: 19,
  justifyContent: 'flex-start',
  fontWeight: 'bold',
  marginTop: 20
 }
});