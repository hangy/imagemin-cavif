'use strict';
const execBuffer = require('exec-buffer');
const cavif = require('cavif-bin');
const FileType = require('file-type');

async function isCavifReadable(buf) {
	const type = await FileType.fromBuffer(buf);
	if (!type) {
		return false;
	}

	const {ext} = type;

	return ext === 'png' || ext === 'jpg';
}

module.exports = (options = {}) => async input => {
	if (!Buffer.isBuffer(input)) {
		return Promise.reject(new TypeError(`Expected \`input\` to be of type \`Buffer\` but received type \`${typeof input}\``));
	}

	if (!(await isCavifReadable(input))) {
		return Promise.resolve(input);
	}

	const args = [
		'--quiet'
	];

	if (options.quality) {
		args.push('--quality', options.quality);
	}

	if (options.speed) {
		args.push('--speed', options.speed);
	}

	if (options.dirtyAlpha) {
		args.push('--dirty-alpha', options.dirtyAlpha);
	}

	if (options.color) {
		args.push('--color', options.color);
	}

	args.push('-o', execBuffer.output, execBuffer.input);

	return execBuffer({
		args,
		bin: cavif,
		input
	}).catch(error => {
		error.message = error.stderr || error.message;
		throw error;
	});
};
