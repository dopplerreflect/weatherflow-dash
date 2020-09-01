import SocketContext, { initialState } from "./context";
import React, { useState, useEffect } from "react";
import { initSockets } from "./sockets";

const SocketProvider = ({ children }: Props) => {
  const [value, setValue] = useState<SocketState>(initialState);

  useEffect(() => {
    initSockets({ setValue });
  }, []);

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
