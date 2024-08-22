import { FullVector3, Gamemode, IPredicate, RangeArg } from "@crafter-js/mc-schema";
import { asRange } from "../conversions";
import { NbtTag } from "../nbtTag";

interface EntitySelectorCommandIntrinsic {
  SingleEntity: boolean;
  PlayersOnly: boolean;
}
interface EntitySelectorArgs {
  distance?: RangeArg;
  bounds?: { from: FullVector3; to: FullVector3 };
  scores?: Record<string, RangeArg>;
  tags?: string[];
  team?: string;
  limit?: number;
  sort?: "nearest" | "furthest" | "random" | "arbitrary";
  level?: RangeArg;
  gameMode?: Gamemode;
  rotation?: { x: RangeArg; y: RangeArg };
  type?: string[];
  nbt?: string;
  advancements?: Record<string, boolean | Record<string, boolean>>;
  predicates?: IPredicate[];
}

export class EntitySelector<
  Intrinsics extends EntitySelectorCommandIntrinsic = EntitySelectorCommandIntrinsic
> {
  baseSelector: "@a" | "@e" | "@p" | "@r" | "@s" | "@n";
  selectors: EntitySelectorArgs = {};

  public build() {
    const params: string[] = [];
    if (this.selectors.distance) {
      params.push(`distance=${asRange(this.selectors.distance)}`);
    }
    if (this.selectors.bounds) {
      params.push(
        `x=${this.selectors.bounds.from[0]},y=${this.selectors.bounds.from[1]},z=${this.selectors.bounds.from[2]},dx=${this.selectors.bounds.to[0]},dy=${this.selectors.bounds.to[1]},dz=${this.selectors.bounds.to[2]}`
      );
    }
    if (this.selectors.scores) {
      params.push("scores={");
      for (const [key, value] of Object.entries(this.selectors.scores)) {
        params.push(`${key}=${asRange(value)}`);
      }
      params.push("}");
    }
    if (this.selectors.tags) {
      for (const tag of this.selectors.tags) {
        params.push(`tag=${tag}`);
      }
    }
    if (this.selectors.team) {
      params.push(`team=${this.selectors.team}`);
    }
    if (this.selectors.limit) {
      params.push(`limit=${this.selectors.limit}`);
    }
    if (this.selectors.sort) {
      params.push(`sort=${this.selectors.sort}`);
    }
    if (this.selectors.level) {
      params.push(`level=${asRange(this.selectors.level)}`);
    }
    if (this.selectors.gameMode) {
      params.push(`gamemode=${this.selectors.gameMode}`);
    }
    if (this.selectors.rotation) {
      params.push(
        `x_rotation=${asRange(this.selectors.rotation.x)},y_rotation=${asRange(
          this.selectors.rotation.y
        )}`
      );
    }
    if (this.selectors.type) {
      for (const type of this.selectors.type) {
        params.push(`type=${type}`);
      }
    }
    if (this.selectors.nbt) {
      params.push(`nbt=${this.selectors.nbt}`);
    }
    if (this.selectors.advancements) {
      params.push(`advancements=${this.selectors.advancements}`);
    }
    if (this.selectors.predicates) {
      for (const predicate of this.selectors.predicates) {
        params.push(`predicate=${predicate}`);
      }
    }
    return params.length > 0
      ? `${this.baseSelector}[${params.join(",")}]`
      : this.baseSelector;
  }

  private constructor(
    baseSelector: "@a" | "@e" | "@p" | "@r" | "@s" | "@n",
    selectors?: EntitySelectorArgs
  ) {
    this.baseSelector = baseSelector;
    this.selectors = selectors || {};
  }

  public static get allPlayers() {
    return new EntitySelector<{
      SingleEntity: false;
      PlayersOnly: true;
    }>("@a");
  }

  public static get allEntities() {
    return new EntitySelector<{
      SingleEntity: false;
      PlayersOnly: false;
    }>("@e");
  }

  public static get nearestPlayer() {
    return new EntitySelector<{
      SingleEntity: true;
      PlayersOnly: true;
    }>("@p");
  }

  public static get nearestEntity() {
    return new EntitySelector<{
      SingleEntity: true;
      PlayersOnly: false;
    }>("@n");
  }

  public static get randomPlayer() {
    return new EntitySelector<{
      SingleEntity: true;
      PlayersOnly: false;
    }>("@r");
  }

  public static get self() {
    return new EntitySelector<{
      SingleEntity: true;
      PlayersOnly: false;
    }>("@s");
  }

  public whereDistance(distance: RangeArg) {
    this.selectors.distance = distance;
    return this;
  }

  public whereInBounds(from: FullVector3, to: FullVector3) {
    this.selectors.bounds = { from, to };
    return this;
  }

  public whereScore({ key, value }: { key: string; value: RangeArg }) {
    if (!this.selectors.scores) this.selectors.scores = {};
    this.selectors.scores[key] = value;
    return this;
  }

  public whereTag(tag: NbtTag, absent: boolean = false) {
    if (!this.selectors.tags) this.selectors.tags = [];
    this.selectors.tags.push(absent ? `!${tag.tagName}` : tag.tagName);
    return this;
  }

  whereTeam(team: string, inverted: boolean = false) {
    this.selectors.team = inverted ? `!${team}` : team;
    return this;
  }

  whereLevel(level: RangeArg) {
    this.selectors.level = level;
  }

  whereGamemode(gamemode: Gamemode) {
    this.selectors.gameMode = gamemode;
    return this;
  }

  whereRotation(x: RangeArg, y: RangeArg) {
    this.selectors.rotation = { x, y };
    return this;
  }

  whereType(
    type: string,
    inverted: boolean = false
  ):
    | EntitySelector<Intrinsics>
    | EntitySelector<{
        SingleEntity: Intrinsics["SingleEntity"];
        PlayersOnly: true;
      }> {
    if (!this.selectors.type) this.selectors.type = [];
    this.selectors.type.push(inverted ? `!${type}` : type);
    if (!inverted && type == "player")
      return new EntitySelector<{
        SingleEntity: Intrinsics["SingleEntity"];
        PlayersOnly: true;
      }>("@p", this.selectors);

    return this;
  }

  whereNbt(nbt: string) {
    this.selectors.nbt = nbt;
    return this;
  }

  whereAdvancements(
    advancement: { key: string; value: { [key: string]: boolean } | boolean }[]
  ) {
    if (!this.selectors.advancements) this.selectors.advancements = {};
    const advancements = this.selectors.advancements;
    advancement.forEach((adv) => {
      advancements[adv.key] = adv.value;
    });
    return this;
  }

  wherePredicate(predicate: IPredicate) {
    if (!this.selectors.predicates) this.selectors.predicates = [];
    this.selectors.predicates.push(predicate);
    return this;
  }

  limit(limit: number) {
    this.selectors.limit = limit;
    if (limit == 1)
      return new EntitySelector<{
        SingleEntity: true;
        PlayersOnly: Intrinsics["PlayersOnly"];
      }>(this.baseSelector, this.selectors);
    return this;
  }

  sort(sort: "nearest" | "furthest" | "random" | "arbitrary") {
    this.selectors.sort = sort;
    return this;
  }

  toString() {
    const selectors = this.selectors;
    const base = this.baseSelector;
    let selector = base;
    selector += "[";

    if (selectors.distance) {
      selector += `distance=${selectors.distance}`;
    }

    if (selectors.bounds) {
      selector += `x=${selectors.bounds.from[0]},y=${selectors.bounds.from[1]},z=${selectors.bounds.from[2]},dx=${selectors.bounds.to[0]},dy=${selectors.bounds.to[1]},dz=${selectors.bounds.to[2]}`;
    }

    if (selectors.scores) {
      selector += "scores={";
      for (const [key, value] of Object.entries(selectors.scores)) {
        selector += `${key}=${asRange(value)}`;
      }
      selector += "}";
    }

    if (selectors.tags) {
      for (const tag of selectors.tags) {
        selector += `tag=${tag}`;
      }
    }

    if (selectors.team) {
      selector += `team=${selectors.team}`;
    }

    if (selectors.limit) {
      selector += `limit=${selectors.limit}`;
    }

    if (selectors.sort) {
      selector += `sort=${selectors.sort}`;
    }

    if (selectors.level) {
      selector += `level=${asRange(selectors.level)}`;
    }

    if (selectors.gameMode) {
      selector += `gamemode=${selectors.gameMode}`;
    }

    if (selectors.rotation) {
      selector += `x_rotation=${asRange(
        selectors.rotation.x
      )},y_rotation=${asRange(selectors.rotation.y)}`;
    }

    if (selectors.type) {
      for (const type of selectors.type) {
        selector += `type=${type}`;
      }
    }

    if (selectors.nbt) {
      selector += `nbt=${selectors.nbt}`;
    }

    if (selectors.advancements) {
      selector += "advancements={";
      for (const [key, value] of Object.entries(selectors.advancements)) {
        if (typeof value === "boolean") {
          selector += `${key}=${value}`;
          continue;
        }
        selector += `${key}={${Object.entries(value)
          .map(([key, value]) => `${key}=${value}`)
          .join(",")}}`;
      }
      selector += "}";
    }

    if (selectors.predicates) {
      for (const predicate of selectors.predicates) {
        selector += `predicate=${predicate}`;
      }
    }

    selector += "]";
    return selector;
  }
}
