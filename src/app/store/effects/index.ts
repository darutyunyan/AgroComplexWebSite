import { ProductTypeEffects } from '../effects/admin/productType.effects';
import { AccountEffects } from './admin/account.effects';
import { ColumnTypeEffects } from './admin/columnType.effects';
import { ProductEffects } from './admin/product.effects';
import { ProductNameEffects } from './admin/productName.effects';

export const adminEffects = [
    ProductTypeEffects,
    ColumnTypeEffects,
    ProductNameEffects,
    ProductEffects,
    AccountEffects
];
