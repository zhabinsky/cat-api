import chalk from 'chalk';

const extension = {
    ok: (...args: any[]) => {
        console.log(chalk.green('OK:'), args.join(', '));
    },
    notify: (...args: any[]) => {
        console.log(chalk.blue('Notification:'), args.join(', '));
    },
};

declare global {
    interface Console {
        ok: (...arguments: string[]) => void;
        notify: (...arguments: string[]) => void;
    }
}

Object.assign(console, extension);
