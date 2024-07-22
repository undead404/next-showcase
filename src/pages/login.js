import dynamic from 'next/dynamic';

const LoginClientSide = dynamic(
    () => import('./login.client.js'),
    { ssr: false }
);

export default function Login() {
    return <LoginClientSide></LoginClientSide>
}