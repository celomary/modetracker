import {SafeAreaView, StyleSheet, Image, Dimensions, Pressable} from 'react-native';
import React from 'react';
import ModePicker from '../components/modePicker.component';

const HomeScreen: React.FC = () => {
    return <SafeAreaView style={styles.container}>
        <Image source={{
            uri: "https://source.unsplash.com/OB2F6CsMva8"
        }} style = {
            {
                width: Dimensions.get('screen').width,
                height: Dimensions.get('screen').height,
                position: 'absolute'
            }
        } />
        <ModePicker />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#EFCB77'
    }
})
export default HomeScreen;