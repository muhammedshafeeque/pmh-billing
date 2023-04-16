
import React from "react";
import "./loading.scss";
import { Spinner } from "@chakra-ui/react";
function Loading() {
  return (
    <div className="loadding_screen">
      <Spinner color='red.500' />
    </div>
  );
}

export default Loading;