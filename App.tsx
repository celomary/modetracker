import { NavigationContainer } from "@react-navigation/native";
import TabsNavigator from "./tabNavigator/tabs.navigator";
import React, {useState, useEffect, useCallback } from "react";
import ContextProvider from "./appContext.provider";
import  {ModeWithTime, Mode} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar, Platform, SafeAreaView, Text, LayoutAnimation, UIManager } from "react-native";
import { useFonts } from "expo-font";
import 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const App: React.FC = ()=> {
  const [listMode, setListMode] = useState<ModeWithTime[]>([]);
  const [isFontLoaded] = useFonts({
    robotoSlabBlack: require('./assets/fonts/static/RobotoSlab-Black.ttf'),
    robotoSlabBold: require('./assets/fonts/static/RobotoSlab-Bold.ttf'),
    robotoSlabExtraBold: require('./assets/fonts/static/RobotoSlab-ExtraBold.ttf'),
    robotoSlabLight: require('./assets/fonts/static/RobotoSlab-Light.ttf'),
    robotoSlabRegular: require('./assets/fonts/static/RobotoSlab-Regular.ttf'),
    RobotoSlabThin: require('./assets/fonts/static/RobotoSlab-Thin.ttf')
  })

  const getSavedListMode: ()=> void = async (): Promise<void> => {
    try {
      const savedList: string | null = await AsyncStorage.getItem('@listMode');
      if (savedList)
        setListMode(JSON.parse(savedList));
    }
    catch (e) {
    }
  }

  const updateData = async (data: ModeWithTime[]) => {
    try {
      await AsyncStorage.setItem('@listMode', JSON.stringify(data));
    }
    catch (e)
    {

    }
  }
  const deleteSavesListMode: (mwt: ModeWithTime) => void =  (mwt: ModeWithTime): void => {
      setListMode((state)=> {
        const cleanedList: ModeWithTime[] = state.filter((item) =>  item.timestamp !== mwt.timestamp);
        updateData(cleanedList);
        return cleanedList
      });
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }

  const selectedMode: (mode: Mode)=>void = async (mode: Mode): Promise<void> =>  {
    const savedList = [{
      mode,
      timestamp: Date.now()
     }, ...listMode]
     setListMode(savedList);
     await AsyncStorage.setItem('@listMode', JSON.stringify(savedList));
  }

  useEffect(()=>{
    getSavedListMode();
  },  [getSavedListMode]);

 useEffect(()=>{
    const hideSplash  = async ()=>{
      await SplashScreen.hideAsync();
    }

    hideSplash();
  }, []);
  if (!isFontLoaded)
    return <SafeAreaView><Text>LOADING...</Text></SafeAreaView>
  return (
    <ContextProvider value={{
      modeList: [listMode, selectedMode],
      deleteSwt: deleteSavesListMode,
    }}>
      <StatusBar barStyle={Platform.OS === 'android' ? 'default':"dark-content" }/>
    <NavigationContainer>
        <TabsNavigator />
    </NavigationContainer>
    </ContextProvider>
  )
}

export default App;
