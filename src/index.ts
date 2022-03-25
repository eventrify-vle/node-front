import express from "express"
import http from "http"
import { CommunicationProtocolEnum, DaprClient, DaprServer, HttpMethod } from "dapr-client"

const daprHost = "127.0.0.1"
const daprPort = "3500"

async function startDapr() {
  const client = new DaprClient(daprHost, daprPort, CommunicationProtocolEnum.HTTP)
  app.get("/:invoke", async (req, res) => {
    try {
      const result = await client.invoker.invoke("node-back", "status", HttpMethod.GET)
      res.status(200).json(result)
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: "status invoker failed" })
    }
  })
}

const app = express()
const server = new http.Server(app)

server.listen(4001)

startDapr().catch((e) => {
  console.error(e)
  process.exit(1)
})

// az containerapp create \
//   --name app-node-front \
//   --resource-group $RESOURCE_GROUP \
//   --environment $CONTAINERAPPS_ENVIRONMENT \
//   --image emplregistry.azurecr.io/node-front \
//   --target-port 4001 \
//   --ingress 'external' \
//   --min-replicas 1 \
//   --max-replicas 1 \
//   --enable-dapr \
//   --dapr-app-port 3500 \
//   --dapr-app-id node-front \
//   --registry-login-server $REGISTRY_LOGIN_SERVER \
//   --registry-username $REGISTRY_USERNAME \
//   --registry-password $REGISTRY_PASSWORD
