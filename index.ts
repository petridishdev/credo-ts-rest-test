import type { InitConfig } from "@credo-ts/core";
import { Agent } from "@credo-ts/core";
import { agentDependencies as dependencies } from "@credo-ts/node";
import { AskarModule } from "@credo-ts/askar";
import { ariesAskar } from "@hyperledger/aries-askar-nodejs";
import { HttpOutboundTransport, WsOutboundTransport } from "@credo-ts/core";
import { HttpInboundTransport } from "@credo-ts/node";

const config: InitConfig = {
  label: "test-agent-ts",
  walletConfig: {
    id: "test-wallet-id",
    key: "testkey0000000000000000000000000",
  },
};

const modules = {
  // Register the Askar module on the agent
  askar: new AskarModule({ ariesAskar }),
};

const agent = new Agent({ config, dependencies, modules });

// Register the HTTP transports
agent.registerOutboundTransport(new HttpOutboundTransport());
agent.registerOutboundTransport(new WsOutboundTransport());
agent.registerInboundTransport(new HttpInboundTransport({ port: 3000 }));

agent
  .initialize()
  .then(() => {
    console.log("Agent initialized");
  })
  .catch((e) => {
    console.error(
      `Something went wrong while setting up the agent! Message: ${e}`
    );
  });
