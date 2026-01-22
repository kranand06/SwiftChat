import express from "express"
import http from "http"
import cors from "cors"
import 'dotenv/config';
import connectDB from './lib/db.js';

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


//Now connecting the mongo db
await connectDB();



//Starting the server
server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})