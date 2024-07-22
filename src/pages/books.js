import dynamic from 'next/dynamic';

const BooksClientSide = dynamic(
    () => import('./books.client.js'),
    { ssr: false }
);

export default function Books() {
    return <BooksClientSide />
}