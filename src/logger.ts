const initTime = Date.now();

let debugMode: boolean = false;

export function enableDebug() {
  if (debugMode) {
    return;
  }
  debugMode = true;
  logger.log("Debug mode enabled");
}

function timestamp() {
  const elasped = Date.now() - initTime;
  const pad = " ".repeat(5 - elasped.toString().length);
  return `[${pad}${elasped} ms]`;
}

function debug(...message: unknown[]) {
  if (!debugMode) return;
  console.debug(`${timestamp()} ${message}`);
}
function log(...message: unknown[]) {
  console.log(`${timestamp()} ${message}`);
}
function warn(...message: unknown[]) {
  console.warn(`${timestamp()} ${message}`);
}
function error(...message: unknown[]) {
  console.error(`${timestamp()} ${message}`);
}
function info(...message: unknown[]) {
  console.info(`${timestamp()} ${message}`);
}
function trace(...message: unknown[]) {
  console.trace(`${timestamp()} ${message}`);
}
function assert(condition: unknown, ...message: unknown[]) {
  console.assert(condition, `${timestamp()} ${message}`);
}
export const logger = {
  debug,
  log,
  warn,
  error,
  info,
  trace,
  assert,
};
