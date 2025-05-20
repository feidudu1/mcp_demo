# Prompt Server TypeScript

这是一个使用 TypeScript 实现的简单 MCP 服务器，用于演示基本的 MCP 功能。

## 功能

1. 加法工具：对两个数字进行实数域的加法
2. 问候资源：返回一个简单的问候语
3. 翻译提示：生成用于翻译的提示语

## 安装

```bash
# 安装依赖
npm install

# 构建项目
npm run build
```

## 使用方法

构建完成后，可以通过 MCP 客户端连接到此服务器使用其功能。

### 示例

1. 使用加法工具：

   ```typescript
   // 计算 1 + 2
   const result = await client.tool("add", { a: 1, b: 2 });
   ```

2. 使用问候资源：

   ```typescript
   // 获取问候语
   const greeting = await client.resource("greeting", { name: "World" });
   ```

3. 使用翻译提示：
   ```typescript
   // 获取翻译提示
   const prompt = await client.prompt("translate", { message: "Hello World" });
   ```
