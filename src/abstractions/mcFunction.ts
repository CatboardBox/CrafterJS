import { Namespace } from "./namespace";
import { ResLocRef, ResourceType } from "../schema/minecraft/ref";
import { CommandInstance } from "./command/commandInstance";
import { ContentGenerator } from "./content";
import { minecraft } from "../providedNamespaces";

interface IFunctionConstructor {
  name: string;
  id?: string;
  namespace: Namespace;
  buildPriority?: number;
}

export class McFunction extends ContentGenerator<ResLocRef[ResourceType.Function], string[]> {
  constructor(values: IFunctionConstructor) {
    super({
      type: [ResourceType.Function],
      data: [],
      ...values,
    });
  }

  private addLine(line: string): McFunction {
    this.constructedData.push(line);
    return this;
  }

  /***
   * @warning This function adds the line directly without any validation
   */
  public addLineDirect(line: string): McFunction {
    return this.addLine(line);
  }

  public addCommand(command: CommandInstance): McFunction {
    return this.addLine(command.command);
  }

  public addComment(comment: string): McFunction {
    return this.addLine(`# ${comment}`);
  }

  protected compileContent(): string {
    return this.constructedData.join("\n");
  }

  protected get fileExt(): string {
    return "mcfunction";
  }

  public runOnLoad(){
    minecraft.tags.function.onLoad.addValue(this);
  }

  public runOnTick(){
    minecraft.tags.function.onTick.addValue(this);
  }
}
