export enum TesloConstantKey {
  taxtRate = 'taxRate',
}

type TesloConstantValue = number;

export const tesloConstants = new Map<TesloConstantKey, TesloConstantValue>();
tesloConstants.set(TesloConstantKey.taxtRate, 0.15);
