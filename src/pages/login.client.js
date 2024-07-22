import useInput from "@/hooks/use-input";
import { authenticate, hasToken } from "@/services/auth";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import styles from './login.module.css';

export default function Login() {
    const [error, setError] = useState(null);
    const [email, handleEmailChange] = useInput("");
    const [pw, handlePwChange] = useInput("");
    const router = useRouter()
    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        try {
            await authenticate(email, pw);
            setError(null);
            router.push('/');
        } catch (error) {
            setError(error);
        }
    }, [email, pw, router]);
    useEffect(() => {
        if (hasToken()) {
            router.push('/')
        }
    }, [router])
    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.h1}>Auth</h1>
            {error && <p className={styles.error}>Something went wrong.</p>}
            <p className={styles.label}>
                Email
                <input name="email" onChange={handleEmailChange} value={email} className={styles.input} />
            </p>
            <p className={styles.label}>
                Password
                <input name="password" onChange={handlePwChange} value={pw} className={styles.input} />
            </p>
            <p><button type="submit" className={styles.button}>Submit</button></p>
        </form>
    );
}
