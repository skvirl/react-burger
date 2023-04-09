
import type { Middleware } from "redux";
 import { setOrderFeedData,setOrderFeedClose } from "../../services/slices/orderFeed";

const socketMiddleware = (wsUrl: string): Middleware => {
  let socket: WebSocket | null = null;

  return (store) => (next) => (action) => {
    const { dispatch, getState } = store;
    const { type } = action;

    switch (type) {
      case "socket/connect":
        socket = new WebSocket(wsUrl);

        if (socket) {
          
          socket.onopen = (event) => {
            // console.log('WS_CONNECTION_SUCCESS');
          };

          socket.onerror = (event) => {
            // console.log(`WS_CONNECTION_ERROR: `);
            dispatch(setOrderFeedClose());
          };

          socket.onmessage = (event) => {
            // console.log(`WS_CONNECTION_MESSAGE: `);
            const { data } = event;
            dispatch(setOrderFeedData(JSON.parse(data)));
          };

          socket.onclose = (event) => {
            // console.log('WS_CONNECTION_CLOSED');
            dispatch(setOrderFeedClose());
          };
        }
        break;

      case "socket/disconnect":
        if (socket) {
          socket.close();
          socket = null;
          dispatch(setOrderFeedClose());
        }
        break;

      default:
        break;
    }

    return next(action);
  };
};

export default socketMiddleware;

