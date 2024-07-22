import { hasToken } from "@/services/auth"
import { useEffect, useState } from "react"

export default function useIsAuthenticated() {
    const [isAuth, setIsAuth] = useState(false)
    useEffect(() => {
        setIsAuth(hasToken())
    })
    return isAuth;
}