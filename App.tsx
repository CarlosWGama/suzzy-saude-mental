import InicialScreen from './src/screens/inicial';
import { useFonts, Jura_400Regular, Jura_300Light, Jura_700Bold } from '@expo-google-fonts/jura';
import NavegacaoPrincipal from './src/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ContextAppProvider } from './src/provider/context';

export default function App() {

  let [fontsLoaded] = useFonts({
    Jura_400Regular, Jura_300Light, Jura_700Bold

  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <GestureHandlerRootView style={{flex:1}}>
      <ContextAppProvider>
        <NavegacaoPrincipal/>
      </ContextAppProvider>
    </GestureHandlerRootView>
  );
}
