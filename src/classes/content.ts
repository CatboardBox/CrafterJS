import { EventType, Namespace } from "./namespace";
import { IResLocRef, ITranslationKey, ResourceType } from "../schema";
import { forceSnakeCase, prettyString } from "../util";
import { createFile } from "../filegen";
import { logger } from "../logger";
import { inspect } from "node:util";

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
  protected readonly constructedData: DataType;
  public readonly displayName: string;
  private readonly resourceType: string[];
  protected readonly namespace: Namespace;

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
    this.constructedData = JSON.parse(JSON.stringify(data)) as DataType;
    namespace.events[EventType.Build].addListener(
      (debug) => this.build(debug),
      buildPriority
    );
  }
  protected validate(): void {}

  public get ref(): LocRef {
    const namespacePath = this.namespace.namespacePath;
    return `${namespacePath}${this.id}` as LocRef;
  }

  protected get translationKey(): ITranslationKey {
    const namespaceKey = this.namespace.namespaceKey;
    const typePrefix = this.resourceType.join(".");
    return `${typePrefix}.${namespaceKey}.${this.id}` as ITranslationKey;
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
    return JSON.stringify(this.constructedData, null, 2);
  }
  protected build(debug: boolean): void {
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
