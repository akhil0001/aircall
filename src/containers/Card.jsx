import React, { useCallback, useState } from "react";
import {
  MiniActionBtn,
  CallCard,
  FromGroup,
  Time,
  Number,
  Description,
  FromGroupRow,
  NumberOfCalls,
  CallCardMainContent,
  CallCardDetailsContent,
  CallCardDetails,
  Hr,
} from "../components";
import { convertSecondsInMinAndHour } from "../utils";
import {
  IconPhoneIncoming,
  IconPhoneOutgoing,
  IconArchiveOff,
  IconArchive,
  IconInfoCircle,
} from "@tabler/icons-react";
import {
  FetchingMachine,
} from "../state/fetchingMachine";
import { useSharedMachine } from "@simple-state-machine/react";

const FromGroupContainer = ({ isMissedCall, numberOfCalls, from, via }) => {
  return (
    <FromGroup>
      <FromGroupRow>
        <Number>{from || "Unknown"}</Number>
        {numberOfCalls > 1 && <NumberOfCalls>{numberOfCalls}</NumberOfCalls>}
      </FromGroupRow>
      <Description>
        {isMissedCall ? "tried to call" : "called you"} on {via}
      </Description>
    </FromGroup>
  );
};

export const Card = ({ data }) => {
  const { created_at, direction, from, call_type, via, is_archived } = data[0];
  const [open, setOpen] = useState(false);
  const isMissedCall = call_type === "missed";
  const { send } = useSharedMachine(FetchingMachine);
  const archiveCall = useCallback(
    (id) =>
      send({
        type: "ARCHIVE_CALL",
        data: {
          callId: id,
        },
      }),
    [send]
  );
  const unArchiveCall = useCallback(
    (id) =>
      send({
        type: "UN_ARCHIVE_CALL",
        data: {
          callId: id,
        },
      }),
    [send]
  );
  return (
    <CallCard className={open && "card-open"}>
      <CallCardMainContent>
        {direction === "inbound" ? (
          <IconPhoneIncoming
            style={{ color: isMissedCall ? "red" : "grey", fontWeight: 300 }}
          />
        ) : (
          <IconPhoneOutgoing style={{ color: "grey", fontWeight: 300 }} />
        )}
        <FromGroupContainer
          from={from}
          via={via || "-"}
          isMissedCall={isMissedCall}
          numberOfCalls={data.length}
        />
        <Time>
          {String(new Date(created_at).getHours()).padStart(2, "0")}:
          {String(new Date(created_at).getMinutes()).padStart(2, "0")}
        </Time>
        {data.length === 1 && (
          <MiniActionBtn
            onClick={() =>
              is_archived ? unArchiveCall(data[0].id) : archiveCall(data[0].id)
            }
          >
            {is_archived ? (
              <IconArchiveOff size={16} />
            ) : (
              <IconArchive size={16} />
            )}
          </MiniActionBtn>
        )}
        <MiniActionBtn onClick={() => setOpen((a) => !a)}>
          <IconInfoCircle size={16} />
        </MiniActionBtn>
      </CallCardMainContent>
      <CallCardDetailsContent className={open ? "visible" : "hidden"}>
        {data.map((el) => (
          <CallCardDetails key={el.id}>
            <Hr />
            <div>Call Id: {el.id}</div>
            <div>Duration: {convertSecondsInMinAndHour(el.duration)}</div>
            <div>To: {el.to || "-"}</div>
            <MiniActionBtn
              onClick={() =>
                is_archived ? unArchiveCall(el.id) : archiveCall(el.id)
              }
            >
              {is_archived ? (
                <IconArchiveOff size={16} />
              ) : (
                <IconArchive size={16} />
              )}
            </MiniActionBtn>
          </CallCardDetails>
        ))}
      </CallCardDetailsContent>
    </CallCard>
  );
};
