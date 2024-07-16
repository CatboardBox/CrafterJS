import { Namespace } from "./namespace";
import { ResLocRef, ITag, TagRef, ResourceType, TagType } from "../schema";
import { ContentGenerator } from "./content";

class BaseTag<
  Type extends TagType,
  Res extends ResourceType
> extends ContentGenerator<TagRef[Type], ITag<Type, Res>> {
  constructor(tagType: TagType, name: string, namespace: Namespace) {
    super({
      type: [ResourceType.Tags, tagType],
      name,
      namespace,
      data: { values: [] },
      buildPriority: 100,
    });
  }

  public get ref(): TagRef[Type] {
    return `#${super.ref}` as TagRef[Type];
  }

  public addValue(
    ...value: (
      | TagRef[Type]
      | ResLocRef[Res]
      | ContentGenerator<ResLocRef[Res], unknown>
      | BaseTag<TagType, ResourceType>
    )[]
  ) {
    value.forEach((v) => {
      if (v instanceof BaseTag) {
        this.constructedData.values.push(v.ref);
      } else if (typeof v === "object" && "ref" in v) {
        this.constructedData.values.push(v.ref);
      } else {
        this.constructedData.values.push(v);
      }
    });
    return this;
  }
}

export class BlockTag extends BaseTag<TagType.Block, ResourceType.Block> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Block, name, namespace);
  }
}

export class ItemTag extends BaseTag<TagType.Item, ResourceType.Item> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Item, name, namespace);
  }
}

export class EntityTag extends BaseTag<TagType.Entity, ResourceType.Entity> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Entity, name, namespace);
  }
}

export class FluidTag extends BaseTag<TagType.Fluid, ResourceType.Fluid> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Fluid, name, namespace);
  }
}
export class GameEventTag extends BaseTag<
  TagType.GameEvent,
  ResourceType.GameEvent
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.GameEvent, name, namespace);
  }
}

export class BiomeTag extends BaseTag<TagType.Biome, ResourceType.Biome> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Biome, name, namespace);
  }
}

export class StructureTag extends BaseTag<
  TagType.Structure,
  ResourceType.Structure
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Structure, name, namespace);
  }
}
export class FlatLevelGeneratorPresetTag extends BaseTag<
  TagType.FlatLevelGeneratorPreset,
  ResourceType.FlatLevelGeneratorPreset
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.FlatLevelGeneratorPreset, name, namespace);
  }
}

export class WorldPresetTag extends BaseTag<
  TagType.WorldPreset,
  ResourceType.WorldPreset
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.WorldPreset, name, namespace);
  }
}

export class CatVariantTag extends BaseTag<
  TagType.CatVariant,
  ResourceType.CatVariant
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.CatVariant, name, namespace);
  }
}
export class BannerPatternTag extends BaseTag<
  TagType.BannerPattern,
  ResourceType.BannerPattern
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.BannerPattern, name, namespace);
  }
}
export class PaintingVariantTag extends BaseTag<
  TagType.PaintingVariant,
  ResourceType.PaintingVariant
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.PaintingVariant, name, namespace);
  }
}
export class InstrumentTag extends BaseTag<
  TagType.Instrument,
  ResourceType.Instrument
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Instrument, name, namespace);
  }
}
export class PointOfInterestTypeTag extends BaseTag<
  TagType.PointOfInterestType,
  ResourceType.PointOfInterestType
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.PointOfInterestType, name, namespace);
  }
}
export class DamageTypeTag extends BaseTag<
  TagType.DamageType,
  ResourceType.DamageType
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.DamageType, name, namespace);
  }
}

export class EnchantmentTag extends BaseTag<
  TagType.Enchantment,
  ResourceType.Enchantment
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Enchantment, name, namespace);
  }
}

export class FunctionTag extends BaseTag<
  TagType.Function,
  ResourceType.Function
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Function, name, namespace);
  }
}
