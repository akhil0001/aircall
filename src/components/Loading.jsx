import React from "react";
import { IconLoader } from "@tabler/icons-react";
import { Loader } from ".";

export const Loading = () => (
  <Loader>
    <IconLoader className="loading-icon" />
    <div>Fetching your data ...</div>
  </Loader>
);
