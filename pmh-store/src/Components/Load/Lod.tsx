import React from "react";
import "./load.scss";

const Loading: React.FC = () => {
  return (
    <div className="loading-mask">
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
