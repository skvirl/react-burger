
import type { Middleware } from "redux";
import { setOrderFeedData, setOrderFeedClose } from "../../services/slices/orderFeed";
import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit"

export type TwsActionTypes = {
  connect: ActionCreatorWithPayload<string>,
  disconnect: ActionCreatorWithoutPayload;


const socketMiddleware = (wsActions: TwsActionTypes): Middleware => {
  let socket: WebSocket | null = null;

  return (store) => (next) => (action) => {
    const { dispatch, getState } = store;
    const { type, payload } = action;

    const {
      connect, disconnect,
    } = wsActions

    if (type === "socket/connect") {
      const wsUrl: string = payload.wsUrl;

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
    }
    if (type === "socket/disconnect") {
      if (socket) {
        socket.close();
        socket = null;
        dispatch(setOrderFeedClose());
      }
    }


    return next(action);
  };
};

export default socketMiddleware;

