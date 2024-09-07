
<h2 align="center">
  <img src="logo.jpeg" alt="I love karaoke" width="320" height="320">

  Tkaraoke Lyrics Searcher
</h2>

<p align="center">
	<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
  <a href="https://www.npmjs.com/package/tkaraoke-lyrics-searcher"><img src="https://badge.fury.io/js/tkaraoke-lyrics-searcher.svg"></a>
	<a href="https://github.com/vuon9/tkaraoke-lyrics-searcher/issues"><img src="https://img.shields.io/github/issues/vuon9/tkaraoke-lyrics-searcher?colorA=363a4f&colorB=f5a97f"></a>
	<a href="https://github.com/vuon9/tkaraoke-lyrics-searcher/contributors"><img src="https://img.shields.io/github/contributors/vuon9/tkaraoke-lyrics-searcher?colorA=363a4f&colorB=a6da95"></a>

</p>

Simple module to search for lyrics of a song in the Tkaraoke database. Which mostly useful for Vietnamese songs.

# Usage

Install the module:

```bash
npm i tkaraoke-lyrics-searcher
```

Then use it in your code:

```js
import { searchSongLyrics, searchLyricsByLyrics } from 'tkaraoke-lyrics-searcher';

// Search for lyrics by song name
const lyrics1 = searchLyricsBySong("Chuyện nhỏ");
// Search for lyrics by song name and singer
const lyrics2 = searchLyricsBySong("Anh", "Mỹ Lệ");
// Search for lyrics by song name and singer 2
const lyrics3 = searchLyricsBySong("Anh", "Hồ Quỳnh Hương");
// Search for lyrics by song and multiple singers
const lyrics4 = searchLyricsBySong("Nơi Ấy", ["Phan Đinh Tùng", "Hà Okio"]);

console.log(await lyrics1, "\n");
console.log(await lyrics2, "\n");
console.log(await lyrics3, "\n");

const lyrics4 = searchLyricsByLyrics("Mùa đông trên thung lũng xa");
const lyrics5 = searchLyricsByLyrics("Phố sương mù, phố chưa lên đèn");

console.log(await lyrics4, "\n");
console.log(await lyrics5, "\n");
```

OR, with CommonJS:

```js
const { searchLyricsBySong } = require('tkaraoke-lyrics-searcher');

(async () => {
  try {
    const song = await searchLyricsBySong('Bohemian Rhapsody', 'Queen');
    console.log(song);
  } catch (error) {
    console.error('Error fetching lyrics:', error);
  }
})();
```

# Notes

The lyrics content is belong to the Tkaraoke database, and the module only search for the lyrics in the database.

The lyrics content is not guaranteed to be accurate, it could be wrong about the writer, the singer, or the lyrics itself.

# License

The MIT License (MIT)

Copyright (c) 2024 Vuong Bui

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
