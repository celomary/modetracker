import { SafeAreaView, Text, FlatList, View } from "react-native";
import React,{useContext} from "react";
import { Context } from "../appContext.provider";
import ModeItem from "../components/modeItem.component";


const HistoryScreen : React.FC = () => {
    const modeList = useContext(Context).modeList;
    return <SafeAreaView style={{flex: 1, backgroundColor: "#D09E30"}}>
                <FlatList
        data={modeList[0]}
        renderItem={
            ({item})=>{
                return <ModeItem item={item} />
            }
        }
        keyExtractor= {(item)=> item.timestamp.toString()}
        ItemSeparatorComponent= {
            ()=> <View style={{height: 10}} />
        }
        style={{
            width: '100%'
        }}
        ListEmptyComponent={<View><Text>There is nothing to show!</Text></View>}
        showsVerticalScrollIndicator={false}
        />
    </SafeAreaView>
}

export default HistoryScreen;