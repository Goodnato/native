import React from 'react';
//Componente que é responsavel por gerenciar todas as rotas
import {NavigationContainer} from '@react-navigation/native';
///Aqui é para configurar as rotas individualmente
import {createStackNavigator} from '@react-navigation/stack';

import Landing from '../pages/Landing';
import GiveClasses from '../pages/GiveClasses';
import StudyTabs from './StudyTabs';

const { Navigator, Screen } = createStackNavigator(); 

//headerShown é o header das paginas. Nós tiramos.
function AppStack() {
    return (
        <NavigationContainer>
            <Navigator screenOptions={{ headerShown: false }}>
                <Screen name="Landing" component={Landing} />
                <Screen name="GiveClasses" component={GiveClasses} />
                <Screen name="Study" component={StudyTabs} />
            </Navigator>
        </NavigationContainer>
    );
}

export default AppStack;