import React, { useCallback } from "react";
import { ActiveFeedContainer } from "./ActiveFeedContainer.jsx";
import { useSharedMachine } from "@simple-state-machine/react";
import { FetchingMachine, MODE_OF_VIEW } from "../state/fetchingMachine.js";
import { Loading } from "../components/Loading.jsx";

export const ActivityContainer = () => {
  const { state, send } = useSharedMachine(FetchingMachine);
  const { archivedCalls, activeCalls, modeOfView } = state.context;
  const isLoading = state.value === "makingAnAPICall";
  const fetchCalls = useCallback(
    (type) =>
      send({
        type: "FETCH_ALL_CALLS",
        data: {
          modeOfView: type,
        },
      }),
    [send]
  );
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        height: "calc(100% - 80px)",
      }}
    >
      <div
        className="header-tabs"
        style={{
          display: "flex",
          flexFlow: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          disabled={isLoading}
          onClick={() => fetchCalls(MODE_OF_VIEW.ACTIVE)}
        >
          Activity Feed
        </button>
        <button
          disabled={isLoading}
          onClick={() => fetchCalls(MODE_OF_VIEW.ARCHIVED)}
        >
          Archived Feed
        </button>
      </div>
      <div
        className="header-tab-info"
        style={{
          display: "flex",
          flexFlow: "column",
          border: "1px solid red",
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <ActiveFeedContainer
            data={
              modeOfView === MODE_OF_VIEW.ACTIVE ? activeCalls : archivedCalls
            }
          />
        )}
      </div>
    </div>
  );
};
