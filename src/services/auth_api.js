import API from "./api.js";
import { useAuthStore } from "@/stores/auth_store.js";

export default (username, password) => {
    const authStore = useAuthStore();
    const headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': authStore.csrfToken
    }

    return API('http://localhost:8000/',true,headers).post(
        'login/', {username:username, password:password}
    )
    //JSON.stringify({username:username, password:password})})
}
