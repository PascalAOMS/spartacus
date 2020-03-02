import { isDevMode, ModuleWithProviders, NgModule, Type } from '@angular/core';
import { CxEventSource, provideEventSources } from '../event-sources';
import { ActionToEvent, ACTION_TO_EVENT } from './action-to-event';
import { StateEvent } from './state-event.model';
import { StateEventService } from './state-event.service';

// private
export function validateMapping(
  actionType: string,
  eventType: Type<StateEvent<any>>
) {
  if (isDevMode()) {
    if (
      typeof actionType !== 'string' ||
      !(eventType.prototype instanceof StateEvent)
    ) {
      console.warn(
        'ACTION_TO_EVENT mapping invalid. Action type:',
        actionType,
        '. Event type: ',
        eventType
      );
    }
  }
}

// private
export function eventSourcesFactory(
  stateEventService: StateEventService,
  mappingChunks: ActionToEvent[][]
): CxEventSource<any>[] {
  const result = [];
  mappingChunks.forEach(mappingChunk =>
    mappingChunk.forEach(mapping => {
      const actionType = mapping[0];
      const eventType = mapping[1];
      validateMapping(actionType, eventType);

      result.push({
        type: eventType,
        source$: stateEventService.getFromAction(eventType, actionType),
      });
    })
  );
  return result;
}

@NgModule()
export class StateEventModule {
  static forRoot(): ModuleWithProviders<StateEventModule> {
    return {
      ngModule: StateEventModule,
      providers: [
        provideEventSources(eventSourcesFactory, [
          StateEventService,
          ACTION_TO_EVENT,
        ]),
      ],
    };
  }

  static fromActions(
    mappings: ActionToEvent[]
  ): ModuleWithProviders<StateEventModule> {
    return {
      ngModule: StateEventModule,
      providers: [
        {
          provide: ACTION_TO_EVENT,
          multi: true,
          useValue: mappings,
        },
      ],
    };
  }
}