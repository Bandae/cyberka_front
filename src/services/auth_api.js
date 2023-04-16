import API from "./api.js";
import { useAuthStore } from "@/stores/auth_store.js";

export default () => {
    const authStore = useAuthStore();
    const headers = {
        'Content-Type': 'application/json',
        'X-CSRFToken': authStore.csrfToken
    }

    return API(true,headers)
}
