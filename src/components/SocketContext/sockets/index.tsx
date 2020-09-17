import { socketEvents } from "./events";

export const initSockets = ({ setValue }: SetSocketStateProps) => {
  socketEvents({ setValue });
};
