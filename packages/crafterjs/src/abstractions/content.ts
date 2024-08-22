import { EventType, Namespace } from "./namespace";
import { IRef, IResLocRef, ITranslationKey, ResourceType } from "@crafter-js/mc-schema";
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
interface IDataGeneratorConstructor<DataType> {
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

// todo naming
export abstract class DataConstructor<
  LocRef extends IRef,
  DataType = Record<string, unknown>
> implements IReference
{
  protected readonly id: string;
  protected readonly _constructedData: DataType;
  public readonly displayName: string;
  protected readonly namespace: Namespace;

  constructor({
    name,
    id = name,
    namespace,
    data,
  }: IDataGeneratorConstructor<DataType>) {
    this.id = forceSnakeCase(id);
    this.namespace = namespace;
    this.displayName = name;
    this._constructedData = JSON.parse(JSON.stringify(data)) as DataType;
  }

  protected get constructedData(): DataType {
    return this._constructedData;
  }

  public get ref(): LocRef {
    const namespacePath = this.namespace.namespacePath;
    return `${namespacePath}${this.id}` as LocRef;
  }
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
> extends DataConstructor<LocRef, DataType> {
  private readonly resourceType: string[];
  /**
   * Skip unused content to reduce file size
   */
  protected skip: boolean = true;
  protected disabled: boolean = false;

  constructor({
    type,
    name,
    id = name,
    namespace,
    data,
    buildPriority,
  }: IContentGeneratorConstructor<DataType>) {
    const displaytype = type.join("/").toLocaleUpperCase();
    name = `[${prettyString(displaytype, 12)}] ${name}`;
    super({ name, id, namespace, data });
    this.resourceType = type;
    namespace.events[EventType.Build].addListener(
      () => this.build(),
      buildPriority
    );
  }
  protected validate(): void {}

  public get ref(): LocRef {
    this.skip = false;
    return super.ref;
  }

  public disable(): void {
    this.disabled = true;
    this.skip = false;
  }

  protected get constructedData(): DataType {
    this.skip = false;
    return super.constructedData;
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
    if (this.disabled) return "";
    // return inspect(this.constructedData, { depth: null, compact: false });
    return JSON.stringify(this.constructedData, null, 2);
  }
  protected build(): void {
    if (this.skip) {
      this.logSkipBuild();
      return;
    }
    logger.info(`${this.namespace.displayName} -> ${this.displayName}`);

    this.validate();
    this.writeContent();
  }
  protected logSkipBuild(): void {
    logger.info(
      `${this.namespace.displayName} -> ${prettyString(
        this.displayName,
        30,
        false
      )} [skipped]`
    );
    return;
  }

  private writeContent(): void {
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
