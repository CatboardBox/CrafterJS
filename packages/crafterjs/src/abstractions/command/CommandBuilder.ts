import { CommandInstance } from "./commandInstance";

// CommandBuilder helps in constructing command strings with a fluent API.
export class CommandBuilder {
  private commandString: string;
  private isMacro: boolean;

  constructor(builder?: CommandBuilder) {
    this.commandString = builder ? builder.commandString : "";
    this.isMacro = builder ? builder.isMacro : false;
  }

  append(command: string): this {
    this.commandString += ` ${command}`;
    return this;
  }

  appendMacro(key: string): this {
    this.commandString += ` $(${key})`;
    return this;
  }

  toCommandInstance(): CommandInstance {
    return new CommandInstance(this.commandString.trim(), this.isMacro);
  }
}

// Base class for command factories providing access to CommandBuilder.
export abstract class CommandFactory {
  protected commandBuilder: CommandBuilder;

  constructor(commandBuilder: CommandBuilder | string) {
    this.commandBuilder =
      typeof commandBuilder === "string"
        ? new CommandBuilder().append(commandBuilder)
        : commandBuilder;
  }
}
