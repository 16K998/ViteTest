import { createContext } from "react";

export let counterContext = createContext(0)

export default function CounterContextProvider(props){
    return<counterContext.Provider value={{}}>
        {props.children}
    </counterContext.Provider>
}