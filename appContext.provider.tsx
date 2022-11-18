import React, { createContext } from "react";
import { ModeWithTime, Mode } from "./types";

export const Context = createContext<{
    modeList:  [ModeWithTime[], (mode:Mode)=> void],
    deleteSwt: (mwt: ModeWithTime) => void,
}>({
    modeList: [[], (mode: Mode)=> {}],
    deleteSwt: (mwt: ModeWithTime) => {}
})




const ContextProvider: React.FC<{
    children: any,
    value: {
        modeList: [ModeWithTime[], (mode:Mode)=> void],
        deleteSwt: (mwt: ModeWithTime) => void,
    }
}> = ({children, value})=> {
    return <Context.Provider value={value}>
        {
            children
        }
    </Context.Provider>
}

export default ContextProvider;