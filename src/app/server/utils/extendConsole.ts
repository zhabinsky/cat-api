import chalk from 'chalk';

const extension = {
    notify: (...args: any[]) => {
        console.log(chalk.blue('Notification:'), args.join(', '));
    },
};

declare global {
    interface Console {
        notify: (...arguments: string[]) => void;
    }
}

Object.assign(console, extension);
