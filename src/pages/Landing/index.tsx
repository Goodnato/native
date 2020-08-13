import React, { useEffect, useState } from 'react';
//O Touch quando voce clica perde um pouco de opacidade
import { View, Image, Text, TouchableOpacity } from 'react-native';
//É a opçao para navegar para outra pagina
import { useNavigation } from '@react-navigation/native';
//Ele faz adaptar o efeito do click do botao ao sistema operacional do usuario
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

import styles from './styles';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

function Landing() {
    const [totalConnections, setTotalConnections] = useState(0);

    //Primeiro parametro function. 
    //Segundo parametro array de dependencias. Quando eu uma variavel for alterada, dispara a funçao. Se deixar vazia, o load é encarregado por disparar
    //Serve para disparar a função assim que o componente é mostrado na tela
    //Se o array (segundo parametro) tiver vazio, dispara uma vez ao carregar. Se tiver uma variavel declarado, toda vez que a variável por alterado dispara
    useEffect(() => {
        //como a funçao é uma Promisse, eu uso o then para aguardar a resposta.
        api.get('connections').then(response => {
            const { total } = response.data;

            setTotalConnections(total);
        })
    }, [])
    
    //Usa a biblioteca de navegaçao
    const { navigate } = useNavigation();

    function handleNavigationToGiveClassesPage(){
        //Redireciona para o nome da rota que foi dado no Screen no routes
        navigate('GiveClasses')
    }

    function handleNavigationToStudyPages() {
        navigate('Study')
    }

    return (
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner} />

            <Text style={styles.title}>
                Seja bem vindo, {'\n'}
                <Text style={styles.titleBold}>O que deseja fazer?</Text>
            </Text>
            
            <View style={styles.buttonsContainer}>
                <RectButton onPress={handleNavigationToStudyPages} style={[styles.button, styles.buttonPrimary]}>
                    <Image source={studyIcon} />

                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton onPress={handleNavigationToGiveClassesPage} style={[styles.button, styles.buttonSecondary]}>
                    <Image source={giveClassIcon} />

                    <Text style={styles.buttonText}>Dar aulas</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {totalConnections} conexões já realizadas. {' '}
                <Image source={heartIcon} />
            </Text>
        </View>
    );
}

export default Landing;