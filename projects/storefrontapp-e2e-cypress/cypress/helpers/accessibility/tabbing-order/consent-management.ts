import { checkAllElements, TabElement } from '../tabbing-order';

export function consentManagementTabbingOrder(config: TabElement[]) {
  cy.visit('/my-account/consents');
  cy.get('.BodyContent input[type=checkbox]')
    .first()
    .focus(); // focus the first element

  checkAllElements(config);
}