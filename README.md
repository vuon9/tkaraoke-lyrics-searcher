# Tkaraoke lyrics searcher

Simple module to search for lyrics of a song in the Tkaraoke database. Which mostly useful for Vietnamese songs.

# Installation

```bash
npm i tkaraoke-lyrics-searcher
```

# How to use

```js
import { searchSongLyrics } from 'tkaraoke-lyrics-searcher';

const lyrics1 = searchLyricsBySong("Chuyện nhỏ");
const lyrics2 = searchLyricsBySong("Anh", "Mỹ Lệ");
const lyrics3 = searchLyricsBySong("Anh", "Hồ Quỳnh Hương");

console.log(await lyrics1, "\n");
console.log(await lyrics2, "\n");
console.log(await lyrics3, "\n");

const lyrics4 = searchLyricsByLyrics("Mùa đông trên thung lũng xa");
const lyrics5 = searchLyricsByLyrics("Phố đêm đèn mờ giăng giăng");

console.log(await lyrics4, "\n");
console.log(await lyrics5, "\n");
```

OR

```js
const ts = require("tkaraoke-lyrics-searcher");
const test = async () => {
  const lyrics1 = await searchLyricsBySong("Chuyện nhỏ");
  console.log(lyrics1, "\n");
};

test();
```

# Note

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
