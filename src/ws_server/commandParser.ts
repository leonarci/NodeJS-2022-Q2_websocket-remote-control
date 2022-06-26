import { RawData } from "ws";

type T = { command: string, argsNums: number[] }

export async function parseCommand(data: RawData): Promise<T> {
  const [command, ...args] = data
    .toString()
    .split(' ');
  const argsNums: number[] = args.map(el => +el)
  return { command, argsNums }
}
