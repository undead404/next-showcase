import { getToken } from "./auth";

export async function getBooks() {
    const authToken = await getToken();
    if (!authToken) {
        throw new Error('Unauthenticated')
    }
    const response = await fetch('/api/books', {
        headers: {
            'Accept': 'application/json',
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
        },
    })
    const data = await response.json();
    return data;
}