// types/index.d.ts

declare module 'tkaraoke-lyrics-searcher' {
    export function searchLyrics(songTitle: string): Promise<string>;
}