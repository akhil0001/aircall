import React, { useCallback } from "react";
import { CardGroup } from "./CardGroup.jsx";
import { ActionBtn } from "../components/index.js";
import { IconArchive, IconArchiveOff } from "@tabler/icons-react";
import { useSharedMachine } from "@simple-state-machine/react";
import { FetchingMachine, MODE_OF_VIEW } from "../state/fetchingMachine.js";

export const ActiveFeedContainer = ({ data }) => {
  const { send, state } = useSharedMachine(FetchingMachine);
  const archiveAll = useCallback(() => send("ARCHIVE_ALL"), [send]);
  const unArchiveAll = useCallback(() => send("UNARCHIVE_ALL"), [send]);
  const modeOfView = state.context.modeOfView;
  return (
    <div style={{ display: "flex", flexFlow: "column" }}>
      <ActionBtn
        onClick={modeOfView === MODE_OF_VIEW.ACTIVE ? archiveAll : unArchiveAll}
      >
        {modeOfView === MODE_OF_VIEW.ACTIVE ? (
          <>
            <IconArchive /> Archive All
          </>
        ) : (
          <>
            <IconArchiveOff /> Unarchive All
          </>
        )}
      </ActionBtn>
      {Object.keys(data).map((key) => (
        <CardGroup data={data[key]} date={key} key={key} />
      ))}
    </div>
  );
};
