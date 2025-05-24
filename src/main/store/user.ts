import { defineStore } from "pinia";
import { Ref, ref } from "vue";

interface userProps {
    email: string
    name: string
}

export const userStore = defineStore("users", () => {
    const user: Ref<userProps> = ref({
        email: "",
        name: ""
    })

    const saveUser = (email: string, name: string) => {

        /* user.value = { ...user.value, email, name } */
        user.value.email = email
        user.value.name = name
    }

    return {
        user,
        saveUser
    }
})