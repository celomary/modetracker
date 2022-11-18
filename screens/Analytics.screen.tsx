import {View, Text} from 'react-native';
import React from 'react'
import {VictoryPie } from 'victory-native'
import { useContext, useEffect } from 'react';
import { Context } from '../appContext.provider';

const AnalyticsScreen: React.FC = () => {
    const {modeList} = useContext(Context);

    const parseData = () => {
        const s = Object();
        modeList[0].forEach(item => {
            if (item.mode.emoji in s)
                s[item.mode.emoji] += 1;
            else
                s[item.mode.emoji] = 1;
        })
        const list = [];
        for (let key in s)
            list.push({label: key, y: s[key]});
        return list;
    }

    useEffect(()=>{
        parseData();
    }, []);
    return <View style={{flex: 1, backgroundColor: '#D09E30',
    justifyContent: 'center'}}>
        <VictoryPie
  data={parseData()}
  style={{ labels: { fill: "white", fontSize: 20, fontWeight: "bold" } }}
  labelRadius={({ innerRadius }) => innerRadius + 60}
/>
    </View>
}


export default AnalyticsScreen;