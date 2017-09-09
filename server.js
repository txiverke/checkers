import express from 'express'
import path from 'path'
import { WEB_PORT } from './src/utils/Constants'

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(WEB_PORT, () => {
  console.log(`Server running on port ${String(WEB_PORT)} '(development). \nKeep "yarn dev:wds" running in an other terminal'.`)
})
