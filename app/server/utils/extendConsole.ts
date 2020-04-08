import chalk from 'chalk';

const extension = {
	ok: (...args: Array<any>) => {
		console.log(chalk.green('OK:'),args.map(String).join(', '));
	},
	notify: (...args: Array<any>) => {
		console.log(chalk.blue('Notification:'),args.map(String).join(', '));
	}
};

declare global {
	interface Console {
		ok: Function,
		notify: Function;
	}
}

Object.assign(console,extension);