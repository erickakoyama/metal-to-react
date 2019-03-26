const util = require('util');
const path = require('path');
const exec = util.promisify(require('child_process').exec);

const files = [
	'render-to-string',
	'replace-metal-render',
	'static-state-config',
	'add-store-to-props',
	'module-imports',
	'config-to-proptypes',
	'life-cycle-names',
	'jsx-class-to-classname',
	'jsx-style-attribute-comments',
	'other-props',
	'state-to-setstate',
	'anchor-to-router-link',
	'remove-static-state',
	'element-classes',
	'remove-setstate-from-constructor',
	'test-constructor-to-jsx'
];

async function run(file) {
	try {
		const {stdout, stderr} = await exec(
			'jscodeshift ' +
				process.cwd() +
				' -t ' +
				path.join(__dirname, file) +
				'.js --parser babel',
			{maxBuffer: 1024 * 500}
		);

		// console.log(stdout);
	} catch (err) {
		console.log('error in run:', file.toUpperCase(), ':', err);
	}
}

async function runAll() {
	console.log('RUNNING');

	for (const file of files) {
		console.log('Start Transform: ', file.toUpperCase());

		try {
			await run(file);
		} catch (err) {
			console.log('error in runAll for:', file.toUpperCase(), ':', err);
		}
	}

	console.log('COMPLETE');
}

runAll();
