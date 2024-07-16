import { logger } from "../logger";
import { forceSnakeCase, prettyString } from "../util";

type EventListener<T extends unknown[]> = (...values: T) => void;

class Emitter<T extends unknown[]> {
  public emit: EventListener<T> = undefined as unknown as EventListener<T>;
}

let eventQueueNext: { callback: () => void } | undefined = undefined;
let isQueueDirty = false;
const eventQueue: { priority: number; callback: () => void }[] = [];

function processQueue() {
  if (eventQueueNext) return;
  do {
    // use is dirty to batch sort
    if (isQueueDirty) {
      eventQueue.sort((a, b) => b.priority - a.priority);
      isQueueDirty = false;
    }
    eventQueueNext = eventQueue.shift();
    if (eventQueueNext) eventQueueNext.callback();
  } while (eventQueueNext);
}

class Event<T extends unknown[]> {
  private readonly listeners: {
    priority: number;
    listener: EventListener<T>;
  }[] = [];
  public addListener(
    listener: EventListener<T>,
    priority: number = 0
  ): Event<T> {
    this.listeners.push({ listener, priority });
    return this;
  }

  public removeListener(listener: EventListener<T>): Event<T> {
    const index = this.listeners.findIndex((l) => l.listener === listener);
    this.listeners.splice(index, 1);
    return this;
  }

  constructor(emitter: Emitter<T>) {
    emitter.emit = (...value: T) => {
      this.listeners.forEach((l) => {
        eventQueue.push({
          priority: l.priority,
          callback: () => l.listener(...value),
        });
      });
      isQueueDirty = true;
      processQueue();
    };
  }
}

export enum EventType {
  Build,
  ContentAdded,
}

export abstract class Namespace {
  public readonly id: string;
  public abstract rootNamespace: RootNamespace;
  public abstract readonly displayName: string;
  public abstract readonly namespacePath: string;
  public abstract readonly namespaceKey: string;
  public abstract readonly events: {
    [EventType.Build]: Event<[]>;
  };

  constructor(name: string) {
    this.id = forceSnakeCase(name);
  }
  public abstract folderPath(resourcePath?: string): string;
}

export class RootNamespace extends Namespace {
  public displayName: string;
  public rootNamespace: RootNamespace = this;
  public namespacePath: string = `${this.id}:`;
  public namespaceKey: string = `${this.id}.`;

  private readonly emitters = {
    [EventType.Build]: new Emitter<[]>(),
    // [EventType.ContentAdded]: new Emitter<{ sta: string; end: string }>(),
  };
  public events = {
    [EventType.Build]: new Event(this.emitters[EventType.Build]),
    // [EventType.ContentAdded]: new Event(this.emitters[EventType.ContentAdded]),
  };

  constructor(name: string) {
    super(name);
    this.displayName = `[${prettyString(name, 15)}]`;
  }

  public folderPath(resourcePath?: string) {
    if (!resourcePath) return `${this.id}/`;
    return `${this.rootNamespace.id}/${resourcePath}/`;
  }

  public build() {
    logger.info(`Building: ${this.displayName}`);
    this.emitters[EventType.Build].emit();
  }
}

export class NestedNamespace extends Namespace {
  public displayName: string;
  public rootNamespace: RootNamespace;
  public namespacePath: string;
  public namespaceKey: string;
  private readonly parent: Namespace;

  constructor(name: string, parent: Namespace) {
    super(name);
    this.parent = parent;
    this.displayName = `${parent.displayName} -> ${prettyString(name, 15)}`;
    this.rootNamespace = parent.rootNamespace;
    this.namespacePath = `${parent.namespacePath + this.id}/`;
    this.namespaceKey = `${parent.namespaceKey + this.id}.`;
  }

  public get events() {
    return this.rootNamespace.events;
  }

  public folderPath(resourcePath?: string) {
    return this.parent.folderPath(resourcePath) + this.id + "/";
  }
}

// export class Namespace {
//   private readonly name: string;
//   private readonly emitters = {
//     [EventType.Build]: new Emitter<boolean>(),
//     // [EventType.ContentAdded]: new Emitter<{ sta: string; end: string }>(),
//   };

//   public readonly id: string;
//   public readonly rootNamespace: Namespace;
//   public readonly path?: string;
//   public readonly events = {
//     [EventType.Build]: new Event(this.emitters[EventType.Build]),
//     // [EventType.ContentAdded]: new Event(this.emitters[EventType.ContentAdded]),
//   };

//   constructor(name: string, parent?: Namespace) {
//     this.id = forceSnakeCase(name);
//     this.rootNamespace = parent ? parent.rootNamespace : this;
//     const type = parent ? `(${parent.name})` : "[root]";
//     this.name = `${name} ${type}`;

//     if (parent) {
//       const buildEvent = parent.events[EventType.Build];
//       buildEvent.addListener((debug) => Namespace.build(this, debug), 100);
//       this.path = parent.path === "" ? name : `${parent.path}/${name}`;
//     }

//     console.log(`Registering namespace ${name}`);
//     const namespaceFullPath = `${this.rootNamespace.id}:${this.path}`;
//     if (loadedNamespaces.has(namespaceFullPath))
//       console.error(`Namespace ${namespaceFullPath} already registered`);
//     loadedNamespaces.add(namespaceFullPath);
//   }

//   public static build(namespace: Namespace, debug = false) {
//     if (debug) {
//       console.log(`Building ${namespace.name}`);
//     }
//     namespace.emitters[EventType.Build].emit(debug);
//   }
// }
