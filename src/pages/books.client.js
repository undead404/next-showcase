import { getBooks } from "@/services/books";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from './books.module.css';

export default function Books() {
    const [error, setError] = useState(null);
    const [books, setBooks] = useState(null);
    const router = useRouter()
    useEffect(() => {
        getBooks().then(setBooks).catch(setError);
    }, []);
    useEffect(() => {
        if (error && error.message.includes('Unauthenticated')) {
            router.push('/login')
        }
    }, [error, router]);
    return (
        <main>
            {error && <p>Something went wrong</p>}
            <div>
                {books.map((book, index) => (
                    <div key={index} className={styles.book}>
                        <h2 className={styles.title}>{book.title}</h2>
                        <p className={styles.isbn}>ISBN: {book.isbn}</p>
                        {book.forms.map((form, formIndex) => (
                            <div key={formIndex} className={styles.form}>
                                <p>Issued Date: {new Date(form.issuedDate).toLocaleDateString()}</p>
                                <p>Return Date: {new Date(form.returnDate).toLocaleDateString()}</p>
                                <p className={styles.reader}>Reader: {form.reader.name}</p>
                                <p>Address: {form.reader.address}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </main>
    );
}
