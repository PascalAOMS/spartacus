import { ComponentData } from '../../../shared/utils/file-utils';
import { CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION } from './data/checkout-progress-mobile-top.component.migration';
import { CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT_MIGRATION } from './data/checkout-progress-mobile-bottom.component.migration';
import { CHECKOUT_PROGRESS_COMPONENT_MIGRATION } from './data/checkout-progress.component.migration';
import { DELIVERY_MODE_COMPONENT_MIGRATION } from './data/delivery-mode.component.migration';
import { PAYMENT_METHOD_COMPONENT_MIGRATION } from './data/payment-method.component.migration';

export const COMPONENT_DEPRECATION_DATA: ComponentData[] = [
  CHECKOUT_PROGRESS_MOBILE_TOP_COMPONENT_MIGRATION,
  CHECKOUT_PROGRESS_MOBILE_BOTTOM_COMPONENT_MIGRATION,
  CHECKOUT_PROGRESS_COMPONENT_MIGRATION,
  DELIVERY_MODE_COMPONENT_MIGRATION,
  PAYMENT_METHOD_COMPONENT_MIGRATION,
];
