import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import HomeScreen  from "../screens/Home.screen";
import HistoryScreen from "../screens/History.screen";
import AnalyticsScreen from "../screens/Analytics.screen";
import HomeIcon from "../components/HomeIcon.component";
import HistoryIcon from "../components/HistoryIcon.component";
import AnalyticsIcon from "../components/AnalyticsIcon.component";

const Tab = createBottomTabNavigator();

const TabsNavigator: React.FC = () => {
    return  <Tab.Navigator screenOptions={{
        tabBarItemStyle: {
                height: 40,
                marginTop: 12
        },
        tabBarStyle: {
                height: 60,
                backgroundColor: "#EFCB77",
                borderTopWidth: 0,
        },
        tabBarLabelStyle: {
                color: "#777"
        },
        tabBarShowLabel: false
    }}>
                <Tab.Screen name="Home" component={HomeScreen} options={{
                        headerShown: false,
                        tabBarIcon: (props) => <HomeIcon {...props}/>
                }} />
                <Tab.Screen name="History" component={HistoryScreen} options={{
                        tabBarIcon: (props) => <HistoryIcon {...props} />,
                        headerStyle: {
                                backgroundColor: '#EFCB77',
                        },
                        headerTitleStyle:  {
                                color:  "#121212",
                                fontFamily: 'robotoSlabBold'
                        },
                        title: 'Past Mood'
                }} />
                <Tab.Screen name="Analytics" component={AnalyticsScreen} options={{
                        tabBarIcon: (props)=> <AnalyticsIcon {...props} />,
                        headerStyle: {backgroundColor: '#EFCB77'},
                        headerTitleStyle: {color: '#121212', fontFamily: 'robotoSlabBold'},
                        title: 'Fancy Chart'
                }} />
        </Tab.Navigator>
}

export default TabsNavigator;