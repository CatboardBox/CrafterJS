export enum RelativeEntity {
  Attacker = "attacker",
  Victim = "victim",
  DamagingEntity = "damaging_entity",
}
export type EnchantedEntity = Exclude<
  RelativeEntity,
  RelativeEntity.DamagingEntity
>;
