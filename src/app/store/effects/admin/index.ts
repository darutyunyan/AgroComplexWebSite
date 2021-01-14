import { ProductTypeEffects } from './productType.effects';
import { AccountEffects } from './account.effects';
import { ColumnTypeEffects } from './columnType.effects';
import { ProductEffects } from './product.effects';
import { ProductNameEffects } from './productName.effects';

export const adminEffects = [
    ProductTypeEffects,
    ColumnTypeEffects,
    ProductNameEffects,
    ProductEffects,
    AccountEffects,
];
