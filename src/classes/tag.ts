import { Namespace } from "./namespace";
import {
  IBannerPatternRef,
  IBannerPatternTagRef,
  IBiomeRef,
  IBiomeTagRef,
  // IBlockTagRef,
  // ICatVariantTagRef,
  IDamageTypeRef,
  IDamageTypeTagRef,
  IEnchantmentRef,
  IEnchantmentTagRef,
  // IEntityTagRef,
  // IFlatLevelGeneratorPresetTagRef,
  // IFluidTagRef,
  IFunctionRef,
  IFunctionTagRef,
  IGameEventRef,
  IGameEventTagRef,
  // IInstrumentTagRef,
  IItemRef,
  IItemTagRef,
  IResourceRef,
  // IPaintingVariantTagRef,
  // IPointOfInterestTypeTagRef,
  IStructureRef,
  IStructureTagRef,
  ITagRef,
  // IWorldPresetTagRef,
  ResourceType,
  TagType,
} from "../schema";
import { ContentGenerator } from "./content";

interface ITagStructure<T extends ITagRef, ObjectRef extends string> {
  values: (T | ObjectRef)[];
  replace?: boolean;
}
class BaseTag<
  T extends ITagRef,
  ObjectRef extends IResourceRef
> extends ContentGenerator<T, ITagStructure<T, ObjectRef>> {
  constructor(tagType: TagType, name: string, namespace: Namespace) {
    super({
      type: [ResourceType.Tags, tagType],
      name,
      namespace,
      data: { values: [] },
      buildPriority: 100,
    });
  }

  protected generateRef(): T {
    return `#${super.generateRef()}` as T;
  }

  public addValue(
    ...value: (T | ObjectRef | ContentGenerator<ObjectRef,unknown>)[]
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

// export class BlockTag extends BaseTag<IBlockTagRef, > {
//   constructor(name: string, namespace: Namespace) {
//     super(TagType.Block, name, namespace);
//   }
// }

export class ItemTag extends BaseTag<IItemTagRef, IItemRef> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Item, name, namespace);
  }
}

// export class EntityTag extends BaseTag<IEntityTagRef, > {
//   constructor(name: string, namespace: Namespace) {
//     super(TagType.Entity, name, namespace);
//   }
// }

// export class FluidTag extends BaseTag<IFluidTagRef, > {
//   constructor(name: string, namespace: Namespace) {
//     super(TagType.Fluid, name, namespace);
//   }
// }
export class GameEventTag extends BaseTag<IGameEventTagRef, IGameEventRef> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.GameEvent, name, namespace);
  }
}

export class BiomeTag extends BaseTag<IBiomeTagRef, IBiomeRef> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Biome, name, namespace);
  }
}

export class StructureTag extends BaseTag<IStructureTagRef, IStructureRef> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Structure, name, namespace);
  }
}
// export class FlatLevelGeneratorPresetTag extends BaseTag<
//   IFlatLevelGeneratorPresetTagRef,

// > {
//   constructor(name: string, namespace: Namespace) {
//     super(TagType.FlatLevelGeneratorPreset, name, namespace);
//   }
// }

// export class WorldPresetTag extends BaseTag<IWorldPresetTagRef, > {
//   constructor(name: string, namespace: Namespace) {
//     super(TagType.WorldPreset, name, namespace);
//   }
// }

// export class CatVariantTag extends BaseTag<ICatVariantTagRef, > {
//   constructor(name: string, namespace: Namespace) {
//     super(TagType.CatVariant, name, namespace);
//   }
// }
export class BannerPatternTag extends BaseTag<
  IBannerPatternTagRef,
  IBannerPatternRef
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.BannerPattern, name, namespace);
  }
}
// export class PaintingVariantTag extends BaseTag<IPaintingVariantTagRef> {
//   constructor(name: string, namespace: Namespace) {
//     super(TagType.PaintingVariant, name, namespace);
//   }
// }
// export class InstrumentTag extends BaseTag<IInstrumentTagRef, > {
//   constructor(name: string, namespace: Namespace) {
//     super(TagType.Instrument, name, namespace);
//   }
// }
// export class PointOfInterestTypeTag extends BaseTag<IPointOfInterestTypeTagRef, > {
//   constructor(name: string, namespace: Namespace) {
//     super(TagType.PointOfInterestType, name, namespace);
//   }
// }
export class DamageTypeTag extends BaseTag<IDamageTypeTagRef, IDamageTypeRef> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.DamageType, name, namespace);
  }
}

export class EnchantmentTag extends BaseTag<
  IEnchantmentTagRef,
  IEnchantmentRef
> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Enchantment, name, namespace);
  }
}

export class FunctionTag extends BaseTag<IFunctionTagRef, IFunctionRef> {
  constructor(name: string, namespace: Namespace) {
    super(TagType.Function, name, namespace);
  }
}
