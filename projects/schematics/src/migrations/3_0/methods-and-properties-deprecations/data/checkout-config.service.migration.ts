import {
  CHECKOUT_CONFIG_SERVICE,
  SPARTACUS_STOREFRONTLIB,
  GET_CHECKOUT_STEP,
  CHECKOUT_STEP_SERVICE,
  GET_CHECKOUT_STEP_ROUTE,
  GET_FIRST_CHECKOUT_STEP_ROUTE,
  GET_NEXT_CHECKOUT_STEP_URL,
  GET_PREVIOUS_CHECKOUT_STEP_URL,
  GET_CURRENT_STEP_INDEX,
  TODO_SPARTACUS,
} from '../../../../shared/constants_3.0';
import { MethodPropertyDeprecation } from '../../../../shared/utils/file-utils';

// projects/storefrontlib/src/cms-components/checkout/services/checkout-config.service.ts
export const CHECKOUT_CONFIG_SERVICE_MIGRATION: MethodPropertyDeprecation[] = [
  {
    class: CHECKOUT_CONFIG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: GET_CHECKOUT_STEP,
    newNode: GET_CHECKOUT_STEP,
    comment: `// ${TODO_SPARTACUS} Method '${GET_CHECKOUT_STEP}' was removed from '${CHECKOUT_CONFIG_SERVICE}'. Instead use new method '${GET_CHECKOUT_STEP}' from '${CHECKOUT_STEP_SERVICE}'.`,
  },
  {
    class: CHECKOUT_CONFIG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: GET_CHECKOUT_STEP_ROUTE,
    newNode: GET_CHECKOUT_STEP_ROUTE,
    comment: `// ${TODO_SPARTACUS} Method '${GET_CHECKOUT_STEP_ROUTE}' was removed from '${CHECKOUT_CONFIG_SERVICE}'. Instead use new method '${GET_CHECKOUT_STEP_ROUTE}' from '${CHECKOUT_STEP_SERVICE}'.`,
  },
  {
    class: CHECKOUT_CONFIG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: GET_FIRST_CHECKOUT_STEP_ROUTE,
    newNode: GET_FIRST_CHECKOUT_STEP_ROUTE,
    comment: `// ${TODO_SPARTACUS} Method '${GET_FIRST_CHECKOUT_STEP_ROUTE}' was removed from '${CHECKOUT_CONFIG_SERVICE}'. Instead use new method '${GET_FIRST_CHECKOUT_STEP_ROUTE}' from '${CHECKOUT_STEP_SERVICE}'.`,
  },
  {
    class: CHECKOUT_CONFIG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: GET_NEXT_CHECKOUT_STEP_URL,
    newNode: GET_NEXT_CHECKOUT_STEP_URL,
    comment: `// ${TODO_SPARTACUS} Method '${GET_NEXT_CHECKOUT_STEP_URL}' was removed from '${CHECKOUT_CONFIG_SERVICE}'. Instead use new method '${GET_NEXT_CHECKOUT_STEP_URL}' from '${CHECKOUT_STEP_SERVICE}'.`,
  },
  {
    class: CHECKOUT_CONFIG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: GET_PREVIOUS_CHECKOUT_STEP_URL,
    newNode: GET_PREVIOUS_CHECKOUT_STEP_URL,
    comment: `// ${TODO_SPARTACUS} Method '${GET_PREVIOUS_CHECKOUT_STEP_URL}' was removed from '${CHECKOUT_CONFIG_SERVICE}'. Instead use new method '${GET_PREVIOUS_CHECKOUT_STEP_URL}' from '${CHECKOUT_STEP_SERVICE}'.`,
  },
  {
    class: CHECKOUT_CONFIG_SERVICE,
    importPath: SPARTACUS_STOREFRONTLIB,
    deprecatedNode: GET_CURRENT_STEP_INDEX,
    newNode: GET_CURRENT_STEP_INDEX,
    comment: `// ${TODO_SPARTACUS} Method '${GET_CURRENT_STEP_INDEX}' was removed from '${CHECKOUT_CONFIG_SERVICE}'. Instead use new method '${GET_CURRENT_STEP_INDEX}' from '${CHECKOUT_STEP_SERVICE}'.`,
  },
];
