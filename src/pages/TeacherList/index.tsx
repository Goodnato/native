import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
//Importa a LIB que gerencia o storage do celular
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

function TeacherList() {
    //Estado para ver se os filtros estao visiveis
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    //Preciso declarar o tipo desse array pois iremos usar funçoes posteriomente
    const [favorites, setFavorites] = useState<number[]>([]);

    function loadFavorites() {
        //Como o storage é diferente que banco de dados, só pode salvar os valores do tipo text
        //Então se eu quero salvar uma lista, preciso converter para texto
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                //Como o response vai ta em texto, precisamos converter para; o JSON
                const favoritedTeachers = JSON.parse(response)
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })
                setFavorites(favoritedTeachersIds);
            }
        });
    }

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeek_day] = useState('');
    const [time, setTime] = useState('');

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit() {
        loadFavorites();
        
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        })

        setIsFiltersVisible(false);

        setTeachers(response.data);
    }

    return (
        <View style={styles.container}>
            <PageHeader
                title="Proffys Disponíveis"
                //Uma maneira de passar um componente como propriedade
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color="#FFF" />
                    </BorderlessButton>
                )}
            >
                {isFiltersVisible && (
                    //Se o Filter for true, mostra essa view
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        <TextInput
                            style={styles.input}
                            value={subject}
                            //Evento recebe o texto direto
                            onChangeText={text => setSubject(text)}
                            placeholder="Qual a matéria?"
                            placeholderTextColor="#C1BCCC"
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                <TextInput
                                    style={styles.input}
                                    value={week_day}
                                    //Evento recebe o texto direto
                                    onChangeText={text => setWeek_day(text)}
                                    placeholder="Qual o dia?"
                                    placeholderTextColor="#C1BCCC"
                                />
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <TextInput
                                    style={styles.input}
                                    value={time}
                                    //Evento recebe o texto direto
                                    onChangeText={text => setTime(text)}
                                    placeholder="Qual horário?"
                                    placeholderTextColor="#C1BCCC"
                                />
                            </View>
                        </View>

                        <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                //É melhor para fazer paddings nos scrolls
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            //Como passará por toda a lista, se uma dessas tiverem no array dos favorites, aproveita e ja manda a relaçao dos favoritados
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;

