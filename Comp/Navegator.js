import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Telas/Login';
import Perfil from '../Telas/Perfil';

const Stack = createStackNavigator();

function Navegador() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default Navegador;
