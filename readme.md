# imagemin-cavif [![Build Status](https://travis-ci.org/imagemin/imagemin-cavif.svg?branch=master)](https://travis-ci.org/imagemin/imagemin-cavif)

> AVIF [imagemin](https://github.com/imagemin/imagemin) plugin


## Install

```
$ npm install imagemin-cavif
```


## Usage

```js
const imagemin = require('imagemin');
const imageminCavif = require('imagemin-cavif');

(async () => {
	await imagemin(['images/*.{jpg,png}'], {
		destination: 'build/images',
		plugins: [
			imageminCavif({quality: 50})
		]
	});

	console.log('Images optimized');
})();
```


## API

### imageminCavif(options?)(buffer)

Returns a `Promise<Buffer>` with the optimized image.

#### options

Type: `object`

##### quality

Type: `number`<br>
Default: `80`

Quality from `1` (worst) to `100` (best).

##### speed

Type: `number`<br>
Default: `1`

Encoding speed from `1` (best) to `10` (fst but ugly).

##### dirtyAlpha

Type: `boolean`<br>
Default: `false`

Keep RGB colors of fully-transparent pixels.

##### color

Type: `string | string[]`<br>
Default: `ycbcr`<br>
Values: `ycbcr` `rgb`

Color mode to use.

#### buffer

Type: `Buffer`

Buffer to optimize.
