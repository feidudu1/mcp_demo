import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create server instance
const server = new McpServer({
  name: "锦恢的 MCP Server",
  version: "11.45.14",
}, {
  capabilities: {
      resources: {}
    }
});

// Add tool
server.tool(
  "add",
  "对两个数字进行实数域的加法",
  {
    a: z.number().describe("第一个数字"),
    b: z.number().describe("第二个数字"),
  },
  async ({ a, b }: { a: number, b: number }) => {
    return {
      content: [
        {
          type: "text",
          text: `${a + b}`,
        },
      ],
    };
  }
);

// 列出available resources
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (request) => {
    const name = request.toString().replace("greeting://", "");
    return {
      contents: [
        {
          uri: request.toString(),
          mimeType: "text/plain",
          text: `你好，${name}！`
        }
      ]
    };
  }
);

// Add prompt
server.prompt(
  "translate",
  "进行翻译的prompt",
  {
    message: z.string().describe("要翻译的消息"),
  },
  async ({ message }: { message: string }, extra: any) => {
    return {
      messages: [
        {
          role: "user" as const,
          content: {
            type: "text" as const,
            text: `请将下面的话语翻译成中文：\n\n${message}`,
          }
        },
      ],
      description: "翻译请求"
    };
  }
); 

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});