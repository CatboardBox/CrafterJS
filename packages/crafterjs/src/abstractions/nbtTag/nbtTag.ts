import { CommandInstance } from "../command";
import { EntitySelector } from "../entitySelector";
import { Namespace } from "../namespace";

export class NbtTag {
  public readonly tagName: string;
  constructor(name: string, namespace?: Namespace) {
    this.tagName = namespace ? `${namespace.namespaceKey}${name}` : name;
  }

  addTo(entity: EntitySelector) {
    return new CommandInstance(`tag ${entity.build()} add ${this.tagName}`);
  }

  removeFrom(entity: EntitySelector) {
    return new CommandInstance(`tag ${entity.build()} remove ${this.tagName}`);
  }
}