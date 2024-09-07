"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const rootURL = "https://lyric.tkaraoke.com";
const SOURCE = `[Nguồn: ${rootURL}]`;
const MODE_SEARCH_BY_SONG_NAME = 1;
const MODE_SEARCH_BY_LYRICS = 3;
const searchLyricsBySong = (songName, artist) => __awaiter(void 0, void 0, void 0, function* () {
    let song = tryToMatchSongWithMetadata(yield findSongs(songName, MODE_SEARCH_BY_SONG_NAME), songName, artist, MODE_SEARCH_BY_SONG_NAME);
    return song ? yield findSongLyrics(song) : null;
});
const searchLyricsByLyrics = (lyrics, artist) => __awaiter(void 0, void 0, void 0, function* () {
    let song = tryToMatchSongWithMetadata(yield findSongs(lyrics, MODE_SEARCH_BY_LYRICS), lyrics, artist, MODE_SEARCH_BY_LYRICS);
    return song ? yield findSongLyrics(song) : null;
});
const tryToMatchSongWithMetadata = (songs, songNameOrLyrics, artist, mode = MODE_SEARCH_BY_SONG_NAME) => {
    return songs.find((song) => {
        let songNameIsMatched = !!songNameOrLyrics &&
            song.title.toLowerCase() == songNameOrLyrics.toLowerCase();
        let lyricsIsMatched = !!songNameOrLyrics &&
            song.lyrics.toLowerCase().indexOf(songNameOrLyrics.toLowerCase()) !== -1;
        let artistIsSinger = !!artist &&
            song.singers.some((singer) => {
                if (Array.isArray(artist)) {
                    return artist.some((artistName) => singer.name.toLowerCase() == artistName.name.toLowerCase() ||
                        singer.name.toLowerCase().indexOf(artistName.name.toLowerCase()) !== -1);
                }
                else {
                    return (singer.name.toLowerCase() == artist.toLowerCase() ||
                        singer.name.toLowerCase().indexOf(artist.toLowerCase()) !== -1);
                }
            });
        let artistIsWriter = !!artist &&
            (Array.isArray(artist)
                ? artist.some((artistName) => song.writer.name.toLowerCase() == artistName.toLowerCase())
                : song.writer.name.toLowerCase() == artist.toLowerCase());
        switch (mode) {
            case MODE_SEARCH_BY_SONG_NAME:
                return (songNameIsMatched && (!artist || artistIsSinger || artistIsWriter));
            case MODE_SEARCH_BY_LYRICS:
                return lyricsIsMatched && (!artist || artistIsSinger || artistIsWriter);
        }
    });
};
const findSongLyrics = (song) => __awaiter(void 0, void 0, void 0, function* () {
    let encodedURL = rootURL + song.songUrl;
    let resp = yield axios_1.default.get(encodedURL);
    let $ = cheerio_1.default.load(resp.data);
    let title = $(".h3-title-song").text().trim();
    let author = $("div .div-author span").text().trim();
    let lyrics = $("div .div-content-lyric").html();
    return (title +
        "\n" +
        author +
        "\n\n" +
        lyrics.replace(/<br>/g, "\n").trim() +
        "\n\n" +
        SOURCE);
});
const findSongs = (songName, t) => __awaiter(void 0, void 0, void 0, function* () {
    let encodedURL = rootURL + `/s.tim?q=${encodeURIComponent(songName)}&t=${t}`;
    let resp = yield axios_1.default.get(encodedURL);
    let songs = [];
    let $ = cheerio_1.default.load(resp.data);
    $("div .div-result-item").each((index, element) => {
        let title = $(element).find(".h4-title-song a").text();
        let songUrl = $(element).find(".h4-title-song a").prop("href");
        let writerUrl = $(element).find(".p-author a").prop("href");
        let writer = $(element).find(".p-author a").text();
        let lyrics = $(element).find(".p-lyrics").text();
        let singers = [];
        $(element)
            .find(".p-singer a")
            .each((index, element) => {
            singers.push({
                name: $(element).text(),
                url: $(element).prop("href"),
            });
        });
        songs.push({
            title,
            songUrl,
            writer: {
                name: writer,
                url: writerUrl,
            },
            lyrics,
            singers,
        });
    });
    return songs;
});
