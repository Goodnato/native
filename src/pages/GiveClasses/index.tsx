import React from 'react';
//ImageBackground é obrigatorio ter um style nele
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './style';

import GiveClassesBgImage from '../../assets/images/give-classes-background.png';
import { useNavigation } from '@react-navigation/native';

function GiveClasses() {
    const { goBack } = useNavigation();

    function handleNavigationGoBack() {
        goBack();
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={GiveClassesBgImage} style={styles.content}>

                <Text style={styles.title}>Quer ser um Proffy?</Text>
                <Text style={styles.description}>
                    Para começar, voce precisa se cadastrar como professor na nossa plataforma WEB.
                </Text>
            </ImageBackground>

            <RectButton onPress={handleNavigationGoBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>Tudo bem</Text>
            </RectButton>
        </View>
    );
}

export default GiveClasses;