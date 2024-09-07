import axios from "axios";
import cheerio from "cheerio";

const rootURL = "https://lyric.tkaraoke.com";
const SOURCE = `[Nguồn: ${rootURL}]`;
const MODE_SEARCH_BY_SONG_NAME: number = 1;
const MODE_SEARCH_BY_LYRICS: number = 3;

interface Artist {
  name: string;
  url: string;
}

interface Song {
  title: string;
  songUrl: string;
  writer: Artist;
  singers: Artist[];
  lyrics: string;
}

export const searchLyricsBySong = async (songName: string, artist: string): Promise<string | null> => {
  let song = tryToMatchSongWithMetadata(
    await findSongs(songName, MODE_SEARCH_BY_SONG_NAME),
    songName,
    artist,
    MODE_SEARCH_BY_SONG_NAME,
  );
  return song ? await findSongLyrics(song) : null;
};

export const searchLyricsByLyrics = async (lyrics: string, artist: string) => {
  let song = tryToMatchSongWithMetadata(
    await findSongs(lyrics, MODE_SEARCH_BY_LYRICS),
    lyrics,
    artist,
    MODE_SEARCH_BY_LYRICS,
  );
  return song ? await findSongLyrics(song) : null;
};

const tryToMatchSongWithMetadata = (
  songs: Song[],
  songNameOrLyrics: string,
  artist: string,
  mode = MODE_SEARCH_BY_SONG_NAME,
): Song | null | undefined => {
  return songs.find((song) => {
    let songNameIsMatched =
      !!songNameOrLyrics &&
      song.title.toLowerCase() == songNameOrLyrics.toLowerCase();

    let lyricsIsMatched =
      !!songNameOrLyrics &&
      song.lyrics.toLowerCase().indexOf(songNameOrLyrics.toLowerCase()) !== -1;

    let artistIsSinger =
      !!artist &&
      song.singers.some((singer) => {
        if (Array.isArray(artist)) {
          return artist.some(
            (artistName) =>
              singer.name.toLowerCase() == artistName.name.toLowerCase() ||
              singer.name.toLowerCase().indexOf(artistName.name.toLowerCase()) !== -1
          );
        } else {
          return (
            singer.name.toLowerCase() == artist.toLowerCase() ||
            singer.name.toLowerCase().indexOf(artist.toLowerCase()) !== -1
          );
        }
      });

    let artistIsWriter =
      !!artist &&
      (Array.isArray(artist)
        ? artist.some(
          (artistName) =>
            song.writer.name.toLowerCase() == artistName.toLowerCase()
        )
        : song.writer.name.toLowerCase() == artist.toLowerCase());

    switch (mode) {
      case MODE_SEARCH_BY_SONG_NAME:
        return (
          songNameIsMatched && (!artist || artistIsSinger || artistIsWriter)
        );
      case MODE_SEARCH_BY_LYRICS:
        return lyricsIsMatched && (!artist || artistIsSinger || artistIsWriter);
    }
  });
};

const findSongLyrics = async (song: Song): Promise<string> => {
  let encodedURL = rootURL + song.songUrl;
  let resp = await axios.get(encodedURL);

  let $ = cheerio.load(resp.data);
  let title = $(".h3-title-song").text().trim();
  let author = $("div .div-author span").text().trim();
  let lyrics = $("div .div-content-lyric").html() as string;

  return (
    title +
    "\n" +
    author +
    "\n\n" +
    lyrics.replace(/<br>/g, "\n").trim() +
    "\n\n" +
    SOURCE
  );
};

const findSongs = async (songName: string, t: number) => {
  let encodedURL = rootURL + `/s.tim?q=${encodeURIComponent(songName)}&t=${t}`;
  let resp = await axios.get(encodedURL);

  let songs: Song[] = [];
  let $ = cheerio.load(resp.data);
  $("div .div-result-item").each((index, element) => {
    let title = $(element).find(".h4-title-song a").text();
    let songUrl = $(element).find(".h4-title-song a").prop("href") as string;
    let writerUrl = $(element).find(".p-author a").prop("href") as string;
    let writer = $(element).find(".p-author a").text();
    let lyrics = $(element).find(".p-lyrics").text();

    let singers: Artist[] = [];

    $(element)
      .find(".p-singer a")
      .each((index, element) => {
        singers.push({
          name: $(element).text(),
          url: $(element).prop("href") as string,
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
};
