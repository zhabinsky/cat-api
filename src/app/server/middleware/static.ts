import express from 'express'
import path from 'path'

export default [express.static(path.resolve(__dirname, '../../../../public-assets'))]
