import { EventType, Namespace } from "./namespace";
import { IResLocRef, ITranslationKey, ResourceType } from "../schema";
import { forceSnakeCase, prettyString } from "../util";
import { createFile } from "../filegen";
import { logger } from "../logger";

export interface IReference {
  ref: string;
}

interface IContentGeneratorConstructor<DataType> {
  type: [ResourceType, ...string[]];
  id?: string;
  name: string;
  namespace: Namespace;
  data: DataType;
  /**
   * The priority of the build event;
   * should not effect on build result, mainly for debug order
   */
  buildPriority?: number;
}
/**
 * When creating content, please ensure that the file in which the content is generated gets imported eventually
 *
 * pros : stuff that you dont need (unused references) are not generated
 *
 * cons : you have to import the file manually (or use a script to do it for you)
 */
export abstract class ContentGenerator<
  LocRef extends IResLocRef,
  DataType = Record<string, unknown>
> implements IReference
{
  protected readonly id: string;
  private readonly _constructedData: DataType;
  public readonly displayName: string;
  private readonly resourceType: string[];
  protected readonly namespace: Namespace;
  protected hasData: boolean = false;

  constructor({
    type,
    name,
    id = name,
    namespace,
    data,
    buildPriority,
  }: IContentGeneratorConstructor<DataType>) {
    this.id = forceSnakeCase(id);
    this.namespace = namespace;
    this.resourceType = type;
    const displaytype = type.join("/").toLocaleUpperCase();
    this.displayName = `[${prettyString(displaytype, 12)}] ${name}`;
    this._constructedData = JSON.parse(JSON.stringify(data)) as DataType;
    namespace.events[EventType.Build].addListener(
      (debug) => this.build(debug),
      buildPriority
    );
  }
  protected validate(): void {}

  protected get constructedData(): DataType {
    this.hasData = true;
    return this._constructedData;
  }

  public get ref(): LocRef {
    const namespacePath = this.namespace.namespacePath;
    return `${namespacePath}${this.id}` as LocRef;
  }

  protected get translationKey(): ITranslationKey {
    const namespaceKey = this.namespace.namespaceKey;
    const typePrefix = this.resourceType.join(".");
    return `${typePrefix}.${namespaceKey}${this.id}` as ITranslationKey;
  }

  private get folderPath(): string {
    const resourcePath = this.resourceType.join("/");
    return this.namespace.folderPath(resourcePath);
  }

  protected get fileExt(): string {
    return "json";
  }
  protected compileContent(): string {
    // return inspect(this.constructedData, { depth: null, compact: false });
    return JSON.stringify(this._constructedData, null, 2);
  }
  protected build(debug: boolean): void {
    if (!this.hasData) {
      logger(
        debug,
        `${this.namespace.displayName} -> ${prettyString(
          this.displayName,
          30,false
        )} [skipped]`
      );
      return;
    }
    logger(debug, `${this.namespace.displayName} -> ${this.displayName}`);

    this.validate();
    const fileExtension = this.fileExt;
    const content = this.compileContent();
    createFile(
      "datapack",
      this.folderPath,
      `${this.id}.${fileExtension}`,
      content
    );
  }
}
