import { useEffect,useState } from "react"
export const useDebounce=(value,delay=300)=>{
    const [debounce,setDebounce]=useState(value)

    useEffect(()=>{
        const bouncing=setTimeout(()=>{
            setDebounce(value)
        },delay)
        return ()=>clearInterval(bouncing)
    },[value,delay])
    return debounce
}