import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import TeacherList from '../pages/TeacherList';
import Favorites from '../pages/Favorites';

const { Navigator, Screen } = createBottomTabNavigator();

//Elevation é pra tirar a sombra das bordas no Android e Shadow no IOS
//flexDirection é pro icone ficar do lado do texto. Por padrao ele fica em cima
function StudyTabs() {
    return (
        <Navigator
            tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 64
                },
                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                iconStyle: {
                    flex: 0,
                    width: 0,
                    height: 0
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16
                },
                inactiveBackgroundColor: '#FAFAFC',
                activeBackgroundColor: '#EBEBF5',
                inactiveTintColor: '#C1BCCC',
                activeTintColor: '#32264D'
            }}
        >
            <Screen 
                name="TeacherList" 
                component={TeacherList} 
                //Essa option é onde configuramos o que tem dentro de cada aba
                options={{
                    //Aqui damos o nome
                    tabBarLabel: 'Proffys',
                    //Aqui o icone. Recebe uma funçao e nós desestruturamos para jogar esses valores dentro do icone
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            //Size e Color vem da aba. Para o icone ficar com a mesma caracteristica
                            <Ionicons name="ios-easel" size={size} color={focused ? '#8257E5' : color} />
                        );
                    }
                }}
            />
            <Screen 
                name="Favorites" 
                component={Favorites} 
                options={{
                    //Aqui damos o nome
                    tabBarLabel: 'Proffys',
                    //Aqui o icone. Recebe uma funçao e nós desestruturamos para jogar esses valores dentro do icone
                    tabBarIcon: ({ color, size, focused }) => {
                        return (
                            //Size e Color vem da aba. Para o icone ficar com a mesma caracteristica
                            <Ionicons name="ios-heart" size={size} color={focused ? '#8257E5' : color} />
                        );
                    }
                }}
            />
        </Navigator>
    );
}

export default StudyTabs;