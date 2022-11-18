import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import React, {useContext, useCallback} from 'react';
import { ModeWithTime } from '../types';
import reanimated, {useAnimatedStyle, useSharedValue, withTiming, useAnimatedGestureHandler} from 'react-native-reanimated'
import { format } from 'date-fns';
import { Context } from '../appContext.provider';
import { PanGestureHandler } from 'react-native-gesture-handler';

const RView = reanimated.createAnimatedComponent(View)
const ModeItem: React.FC<{item:ModeWithTime}> = ({item}) => {
    const {deleteSwt} = useContext(Context);
    const sharedX = useSharedValue(0);
    const animatedView = useAnimatedStyle(()=>{
        return {
            transform: [
                {
                    translateX: sharedX.value
                }
            ]
        }
    }, []);
    
    const animatedGesture = useAnimatedGestureHandler({
        onActive: (e)=>{
            sharedX.value = e.translationX;
        },
        onEnd: (e)=>{
            if (Math.abs(e.translationX) > 80)
            {
                sharedX.value = withTiming(1000 * (e.translationX > 0 ? 1 : -1), {
                    
                }, (finished)=>{
                    if (!!finished)
                    {
                        deleteSwt(item);
                    }
                });
                
            }
            else
                sharedX.value = withTiming(0);
        }
    }, []);
    return <PanGestureHandler activeOffsetY={[-200, 200]} activeOffsetX={[-10, 10]} onGestureEvent={animatedGesture}>
        <RView  style={
        [styles.container,
            animatedView]
    }>
        <View style={
            styles.modeContainer
        }>
            <Text style={
                styles.emoji
            }>{item.mode.emoji}</Text>
            <Text style={
                styles.description
            }>{item.mode.description}</Text>
        </View>
        <View>
            <Text style={
                styles.date
            }>{format(item.timestamp,"d MMM, yyyy 'at' hh:mm:ss aaa")}</Text>
        </View>
        <Pressable style={
            styles.deleteBtn
        } onPress={
            ()=>{
                deleteSwt(item)
               
            }
        }>
            <Text style={
                styles.deleteBtnText
            }>Delete</Text>
        </Pressable>
    </RView>
    </PanGestureHandler>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: "#fff",
    },
    modeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    emoji: {
        marginRight: 10,
        fontSize: 40 / Dimensions.get('window').fontScale
    },
    description: {
        fontSize: 12 / Dimensions.get('window').fontScale,
        fontWeight: '300',
        color: '#454C73',
        fontFamily: 'robotoSlabRegular',
        textTransform: 'capitalize'
    },
    date: {
        fontSize: 12 / Dimensions.get('window').fontScale,
        fontWeight: '500',
        color: '#777',
        fontFamily: 'robotoSlabLight'
    },
    deleteBtn: {

    },
    deleteBtnText: {
        fontSize: 12 / Dimensions.get('window').fontScale,
        fontFamily: 'robotoSlabRegular',
        textDecorationStyle: 'solid',
        textDecorationLine: 'underline',
        textShadowColor: '#454C73',
        color: '#454C73'
    }
});
export default ModeItem;