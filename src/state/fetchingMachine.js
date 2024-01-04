import {
  MachineConfig,
  createContext,
  createEvents,
  createStates,
} from "@simple-state-machine/core";

import { dateWiseDivision } from "../utils";

const states = createStates(
  "makingAnAPICall",
  "idle",
  "error",
  "patchingData",
  "patchAllData",
  "checkIfAllPatchingIsDone"
);

const events = createEvents(
  "FETCH_ALL_CALLS",
  "FETCH_CALL",
  "UN_ARCHIVE_CALL",
  "ARCHIVE_CALL",
  "ARCHIVE_ALL",
  "UNARCHIVE_ALL",
);

export const MODE_OF_VIEW = {
  ARCHIVED: "archived",
  ACTIVE: "active",
};

const context = createContext({
  baseUrl: "https://cerulean-marlin-wig.cyclic.app",
  route: "/activities",
  archivedCalls: {},
  activeCalls: {},
  error: null,
  apiComData: {},
  modeOfView: MODE_OF_VIEW.ACTIVE,
  archivedCallIds: [],
  activeCallIds: [],
});


export const FetchingMachine = new MachineConfig(states, context, events);

const { whenIn } = FetchingMachine;

const { onDone, onError } = whenIn("makingAnAPICall").invokeAsyncCallback(
  (context) => {
    return fetch(context.baseUrl + context.route).then((res) => res.json());
  }
);

onDone()
  .moveTo("idle")
  .updateContext((_, event) => ({
    archivedCalls: dateWiseDivision(
      event.data.filter((el) => {
        return el.is_archived;
      })
    ),
    activeCalls: dateWiseDivision(event.data.filter((el) => !el.is_archived)),
    archivedCallIds: event.data
      .filter((el) => el.is_archived)
      .map((el) => el.id),
    activeCallIds: event.data
      .filter((el) => !el.is_archived)
      .map((el) => el.id),
  }))

onError()
  .moveTo("error")
  .updateContext((_, event) => ({
    error: event.data,
  }));

whenIn("patchingData")
  .invokeAsyncCallback((context) => {
    return fetch(context.baseUrl + context.route, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify(context.apiComData),
    });
  })
  .onDone()
  .moveTo("makingAnAPICall");

// idle states
whenIn("idle")
  .on("FETCH_ALL_CALLS")
  .moveTo("makingAnAPICall")
  .updateContext((_, event) => ({
    route: "/activities",
    modeOfView: event.data.modeOfView,
  }));

whenIn("idle")
  .on("FETCH_CALL")
  .moveTo("makingAnAPICall")
  .updateContext((_, event) => ({
    route: "/activities/" + event.data.callId,
  }));

whenIn("idle")
  .on("UN_ARCHIVE_CALL")
  .moveTo("patchingData")
  .updateContext((_, event) => ({
    route: "/activities/" + event.data.callId,
    apiComData: {
      is_archived: false,
    },
  }));

whenIn("idle")
  .on("ARCHIVE_CALL")
  .moveTo("patchingData")
  .updateContext((_, event) => ({
    route: "/activities/" + event.data.callId,
    apiComData: {
      is_archived: true,
    },
  }));

whenIn("idle")
  .on("ARCHIVE_ALL")
  .moveTo("patchAllData")
  .updateContext(() => ({
    apiComData: {
      is_archived: true,
    },
  }));

whenIn("idle")
  .on("UNARCHIVE_ALL")
  .moveTo("patchAllData")
  .updateContext(() => ({
    apiComData: {
      is_archived: false,
    },
  }));

// error

whenIn("error").after(3000).moveTo("idle").updateContext({
  error: null,
});

// patching All data

const patchAllData = whenIn("patchAllData").invokeAsyncCallback((context) => {
  const callId =
    context.modeOfView === MODE_OF_VIEW.ACTIVE
      ? context.activeCallIds[0]
      : context.archivedCallIds[0];
  return fetch(context.baseUrl + "/activities/" + callId, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    referrerPolicy: "no-referrer",
    body: JSON.stringify(context.apiComData),
  });
});

patchAllData
  .onDone()
  .moveTo("checkIfAllPatchingIsDone")
  .updateContext({
    activeCallIds: (context) => {
      const [_, ...rest] = context.activeCallIds;
      if (context.modeOfView === MODE_OF_VIEW.ACTIVE) return rest;
      return context.activeCallIds;
    },
    archivedCallIds: (context) => {
      const [_, ...rest] = context.archivedCallIds;
      if (context.modeOfView === MODE_OF_VIEW.ARCHIVED) return rest;
      return context.archivedCallIds;
    },
  });

patchAllData.onError().moveTo('error').updateContext({
  error: (_, event) => event.data
})

whenIn("checkIfAllPatchingIsDone")
  .always()
  .if((context) =>
    context.modeOfView === MODE_OF_VIEW.ACTIVE
      ? context.activeCallIds.length === 0
      : context.archivedCallIds.length === 0
  )
  .moveTo("makingAnAPICall");

whenIn("checkIfAllPatchingIsDone").always().moveTo("patchAllData");
