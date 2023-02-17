import InicialScreen from './src/screens/inicial';
import { useFonts, Jura_400Regular, Jura_300Light, Jura_700Bold } from '@expo-google-fonts/jura';
import NavegacaoPrincipal from './src/navigation';

export default function App() {

  let [fontsLoaded] = useFonts({
    Jura_400Regular, Jura_300Light, Jura_700Bold

  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <NavegacaoPrincipal/>
  );
}
