"use client"

import store from "@/store/store"
import { Provider } from "react-redux"
import { wishstore } from "@/store/wishstore"


const StoreProvider = ({children}:{children:React.ReactNode})=>{
    return(
        <Provider store = {store }>{children}</Provider>
    )
}
export default StoreProvider;