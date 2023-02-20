import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AjudaScreen from '../screens/app/ajuda';
import ConfigDeslogadoScreen from '../screens/app/config/config-deslogado';
import HomeScreen from '../screens/app/home';
import { MaterialIcons } from '@expo/vector-icons';
import { AppColors } from '../themes/colors';
import { useContextApp } from '../provider/context';
import ConfigScreen from '../screens/app/config/config';
import { NavegacaoConfig } from './config';

const Tab = createBottomTabNavigator();

export function NavegacaoApp() {


    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: 'white',
            tabBarInactiveBackgroundColor: AppColors.BACKGROUND,
            tabBarLabelStyle: { fontSize: 16},
            headerShown: false
        }}>
            <Tab.Screen name="home" component={HomeScreen}
                options={{
                    tabBarLabel: "Sobre", 
                    tabBarIcon: (icon) => <MaterialIcons name="info" size={20} color={icon.color} />,
                    tabBarActiveBackgroundColor: AppColors.PRIMARY
                    }}
                />
            <Tab.Screen name="ajuda" component={AjudaScreen}
                options={{
                    tabBarLabel: "Ajuda", 
                    tabBarIcon: (icon) => <MaterialIcons name="local-hospital" size={20} color={icon.color} />,
                    tabBarActiveBackgroundColor: AppColors.SECONDARY

                }}
            />
            <Tab.Screen name="config" component={NavegacaoConfig}
                options={{
                    tabBarLabel: "Configuração", 
                    tabBarIcon: (icon) => <MaterialIcons name="settings" size={20} color={icon.color} />,
                    tabBarActiveBackgroundColor: AppColors.TERTIARY
                }}
            />
        </Tab.Navigator>
    )
}