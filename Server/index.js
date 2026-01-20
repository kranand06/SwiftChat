import express from "express"
import http from "http"
import cors from "cors"

//Create Express and Http server
const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 3000


//Creating middlewares
app.use(express.json({ limit: '5mb' }))
app.use(cors())


//Sample Route
app.use('/api/status', (req, res) => {
  res.send('Hello World!')
})

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})