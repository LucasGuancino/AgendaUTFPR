import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicial from '../Telas/Inicial';
import Perfil from '../Telas/Perfil';
import Home from '../Telas/Home';
import Cadastrar from "../Telas/Cadastrar";
import Login from "../Telas/Login";
import Calendario from "../Telas/Calendario";
import InfoAgendamento from "../Telas/InfoAgendamento";
import Relatorio from "../Telas/Relatorio";
import Agendamento from "../Telas/Agendamento";
import Agendar from "../Telas/Agendar";
import InfoAgendamentoUsuario from "../Telas/InfoAgendamentoUsuario";

const Stack = createStackNavigator();

function Navegador() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicial">
        <Stack.Screen name="Inicial" component={Inicial} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastrar" component={Cadastrar} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Calendario" component={Calendario} options={{ headerShown: false }} />
        <Stack.Screen name="InfoAgendamento" component={InfoAgendamento} options={{ headerShown: false }} />
        <Stack.Screen name="Relatorio" component={Relatorio} options={{ headerShown: false }} />
        <Stack.Screen name="Agendamento" component={Agendamento} options={{ headerShown: false }} />
        <Stack.Screen name="Agendar" component={Agendar} options={{ headerShown: false }} />
        <Stack.Screen name="InfoAgendamentoUsuario" component={InfoAgendamentoUsuario} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default Navegador;
