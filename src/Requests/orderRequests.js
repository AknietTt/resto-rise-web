import axios from "axios"


export const getAllOrders = async () =>{
    try {
        const accessToken = getCookieValue("access_token");
        await axios.get(
        host + ``
        )
    } catch (error) {
        
    }
}