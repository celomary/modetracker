import {View, Text, StyleSheet, Dimensions, Pressable, Image} from 'react-native';
import React, { useState, useContext } from 'react';
import {Mode} from '../types';
import { Context } from '../appContext.provider';
import reanimated, {useSharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated';
const butterflies = require('../assets/wondering.png');

const RPressable = reanimated.createAnimatedComponent(Pressable);
const moodOptions: Mode[] = [
    { emoji: '🧑‍💻', description: 'studious' },
    { emoji: '🤔', description: 'pensive' },
    { emoji: '😊', description: 'happy' },
    { emoji: '🥳', description: 'celebratory' },
    { emoji: '😤', description: 'frustrated' },
];

const ModePicker: React.FC= () => {
    const [selectedMode, setSelectedMode] = useState<Mode | null>(null);
    const [isChoosed, setIsChoosed] = useState(false);
    const {modeList} = useContext(Context);
    const sharedOpacity = useSharedValue(0.5);
    const sharedScale = useSharedValue(0.8);
    const opacityStyled = useAnimatedStyle(()=>{
        return {
            opacity: sharedOpacity.value,
            transform: [
                {
                    scale: sharedScale.value
                }
            ]
        }
    },[])
    return (
    <View style={[styles.parentContainer, isChoosed? {alignItems: "center"}: null]}>
        {!isChoosed && <Text style={styles.parentText}>How Are You Doing Today?</Text>}
    <View style={
        styles.modesContainer
    }>
       {
            isChoosed ? <View>
                <Image source={butterflies}  style={{
                    width: 150,
                    height: 150
                }}/>
            </View>:
            moodOptions.map(({emoji, description}, index) => {
                return <View key={index} style={
                    styles.itemsContainer
                }>
                <Pressable  onPress={()=>{
                    setSelectedMode({emoji, description});
                    sharedOpacity.value = withTiming(1, {
                        duration: 600
                    });
                    sharedScale.value = withTiming(1, {
                        duration: 600
                    })
                }} style={[styles.button,
                description === selectedMode?.description ? styles.selectedItemButton : null]}><Text style={styles.mode} >{emoji}</Text></Pressable>
                <Text style={[styles.itemsText,
                {
                    opacity: description === selectedMode?.description ? 1 : 0
                }]}>{description}</Text>
                </View>
            })
       }
    </View>

    <View style={
        [styles.bottomBtnContainer,
        ]
    }>
        <RPressable onPress={
            ()=> {
                if (isChoosed)
                {
                    sharedOpacity.value = 0.5;
                    sharedScale.value = 0.8;
                    setIsChoosed(false);
                }
                else if (selectedMode)
                {
                    modeList[1](selectedMode)
                    setIsChoosed(true);
                }
                setSelectedMode(null);
            }
        } style={
            [styles.bottomBtn,
                isChoosed ? {
                    width: 150
                } : null,
                opacityStyled
        ]
        }>
            
                <Text style={styles.bottomBtnText}>{isChoosed ? 'Choose again!': 'Choose'}</Text>
        </RPressable>
    </View>
    </View>)
}

const styles = StyleSheet.create({
    modesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mode: {
        fontSize: 25
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedItemButton: {
        backgroundColor: '#454C73'
    },
    itemsContainer: {
        alignItems: 'center'
    },
    itemsText: {
        fontSize: 12,
        color: '#454A73',
        fontFamily: 'robotoSlabRegular',
        textTransform: 'capitalize'
    },
    parentContainer: {
        marginHorizontal: Dimensions.get('window').width * 0.025,
        width: Dimensions.get('window').width * 0.95,
        height: 230 * Dimensions.get('window').fontScale,   
        borderWidth: 2,
        borderColor: '#454A73',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    parentText: {
        fontSize: 24 / Dimensions.get('window').fontScale,
        fontWeight: '600',
        color: '#454A73',
        fontFamily: 'robotoSlabBold'
    },
    bottomBtnContainer: {
        alignItems: 'center'
    },
    bottomBtn: {
        backgroundColor: '#454A73',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 18,
        width: 100,
        alignItems: 'center'
    },
    bottomBtnText: {
        color: "#fff",
        fontWeight: '600',
        fontFamily: 'robotoSlabRegular'
    }
})
export default ModePicker;
