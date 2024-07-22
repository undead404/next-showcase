import React from "react";
import styles from "./Header.module.css";
import Link from "next/link";
import { signOut } from "@/services/auth";
import useIsAuthenticated from "@/hooks/use-is-authenticated";

function Header() {
    const isAuth = useIsAuthenticated();
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <ul>
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    {isAuth && (
                        <li>
                            <Link href="/books">Books</Link>
                        </li>
                    )}
                    {!isAuth && (
                        <li>
                            <Link href="/login">Login</Link>
                        </li>
                    )}
                    {isAuth && (
                        <li>
                            <button onClick={signOut}>Sign out</button>
                        </li>
                    )}

                </ul>
            </nav>
        </header>
    );
}

export default Header;
