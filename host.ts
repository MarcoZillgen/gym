import { spawn } from "node:child_process";

const child = spawn("cloudflared", [
  "tunnel",
  "--url",
  "http://localhost:3000",
]);

child.stderr.on("data", (chunk: Buffer) => {
  const text = chunk.toString();
  const match = text.match(/https:\/\/[^\s]+\.trycloudflare\.com/);

  if (match) {
    console.log(match[0]);
  }
});

child.on("error", (err) => {
  console.error("Failed to start cloudflared:", err.message);
});
