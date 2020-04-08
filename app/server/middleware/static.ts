import express from 'express';
import path from 'path';


const dir = path.resolve(__dirname,'../../../public-assets');

console.notify(dir);

export default [
	express.static(dir)
];