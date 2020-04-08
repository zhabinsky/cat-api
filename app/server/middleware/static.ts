import express from 'express';
import path from 'path';

const dir = path.resolve(__dirname,process.env.NODE_ENV === "production" ? '../../../../public-assets' : '../../../public-assets');

console.notify(dir);

export default [
	express.static(dir)
];