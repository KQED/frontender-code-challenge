// Can be run directly by node. No transpilation needed

const express = require('express')
const path = require('path')
const app = express()
const port = 3000
const config = {
  baseUrl: '/'
}

// Deliver static files
const staticFiles = [
  'favicon.ico',
  'robot.txt',
  'humans.txt'
]

staticFiles.forEach((fileName) => {
  app.use(`/${fileName}`, express.static(`./static/${fileName}`))
})

app.use('/dist', express.static(path.join(__dirname, '/../static/dist')))

const indexRouter = express.Router()
indexRouter.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/../static/dist/index.html'))
})

indexRouter.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../static/dist/index.html'))
})

app.use(config.baseUrl, indexRouter)

app.listen(port, () => {
  console.log(`CSR Mode: App listening on port ${port}`)
})
