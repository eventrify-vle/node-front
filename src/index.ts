import express from "express"
import http from "http"
import { CommunicationProtocolEnum, DaprClient, DaprServer, HttpMethod } from "dapr-client"

const daprHost = "127.0.0.1"
const daprPort = "3500"

async function startDapr() {
  const client = new DaprClient(daprHost, daprPort, CommunicationProtocolEnum.GRPC)
  app.get("/:grpc", async (req, res) => {
    try {
      const result = await client.invoker.invoke("node-back", "status", HttpMethod.GET)
      console.log(JSON.stringify(result, null, 2))
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: "status invoker failed" })
    }
    res.status(200).json({ message: "status invoked successfully" })
  })
}

const app = express()
const server = new http.Server(app)

server.listen(4001)

startDapr().catch((e) => {
  console.error(e)
  process.exit(1)
})
