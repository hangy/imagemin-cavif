const {promisify} = require('util');
const fs = require('fs');
const path = require('path');
const FileType = require('file-type');
const test = require('ava');
const imageminCavif = require('.');

const readFile = promisify(fs.readFile);

async function isAvif(buffer) {
	const type = await FileType.fromBuffer(buffer);
	return type.ext === 'avif';
}

test('convert an image into an AVIF', async t => {
	const buf = await readFile(path.join(__dirname, 'fixtures/test.png'));
	const data = await imageminCavif()(buf);

	t.true(data.length < buf.length);
	t.true(await isAvif(data));
});

test('skip optimizing unsupported files', async t => {
	const buf = await readFile(path.join(__dirname, 'fixtures/test-unsupported.bmp'));
	const data = await imageminCavif()(buf);

	t.deepEqual(data, buf);
});
