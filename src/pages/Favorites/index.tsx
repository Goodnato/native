import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
//Usaremos essa LIB por que quando mudarmos de página. precisamos disparar uma funçao. 
//Disparar pelo componente não é o suficiente por que as TABS já estão prontas
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    
    function loadFavorites() {
        //Como o storage é diferente que banco de dados, só pode salvar os valores do tipo text
        //Então se eu quero salvar uma lista, preciso converter para texto
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                //Como o response vai ta em texto, precisamos converter para; o JSON
                const favoritedTeachers = JSON.parse(response)
                setFavorites(favoritedTeachers);
            }
        });
    }

    //Executa toda vez que a tela entrar em focus e não mais o componente
    useFocusEffect(() => {
        loadFavorites();
    });
    
    return (
        <View style={styles.container}>
            <PageHeader title=" Meus Proffys Favoritos" />

            <ScrollView
                style={styles.teacherList}
                //É melhor para fazer paddings nos scrolls
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.id}
                            teacher={teacher}
                            //Por default, o valor sempre será true
                            favorited
                        />
                    )
                })}
            </ScrollView>
        </View>
    );
}

export default Favorites;

