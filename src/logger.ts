const initTime = Date.now();

export function logger(debug: boolean, ...message: unknown[]) {
  if (!debug) return;
  const elasped = Date.now() - initTime;
  const pad = " ".repeat(5 - elasped.toString().length);
  console.log(`[${pad}${elasped} ms] ${message}`);
}
