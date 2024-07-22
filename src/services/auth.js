import { addSeconds, formatISO, isPast, parseISO } from "date-fns";

const TOKEN_KEY = "auth:token";
const REFRESH_TOKEN_KEY = 'auth:refresh_token'
const EXPIRY_KEY = 'auth:expiry';

export async function authenticate(email, password) {
    const response = await fetch("/api/login", {
        body: JSON.stringify({ email, password }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",

    });
    const data = await response.json();
    setToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setExpiry(addSeconds(new Date(), data.expiresIn));
}

export async function getToken() {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
        return null;
    }
    const expiry = getExpiry();
    if (isPast(expiry)) {
        await refreshToken();
        return getToken();
    }
    return token;
}

export function hasToken() {
    return !!localStorage.getItem(TOKEN_KEY)
}

async function refreshToken() {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        signOut()
        return;
    }
    const response = await fetch("/api/refresh", {
        body: JSON.stringify({ refreshToken }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
    });
    const data = await response.json();
    setToken(data.accessToken);
    setRefreshToken(data.refreshToken);
    setExpiry(addSeconds(new Date(), data.expiresIn));
}

function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
}

function setExpiry(expiryDate) {
    localStorage.setItem(EXPIRY_KEY, formatISO(expiryDate));
}
function getExpiry() {
    const expiryString = localStorage.getItem(EXPIRY_KEY);
    if (!expiryString) {
        return null;
    }
    return parseISO(expiryString);
}
function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}
function setRefreshToken(refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function signOut() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(EXPIRY_KEY);
    window.location.reload()
}