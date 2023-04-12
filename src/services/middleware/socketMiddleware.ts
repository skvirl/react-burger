import type { Middleware } from "redux";
import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import { TFeedActions } from "../actions/orderFeed";
import { TFeedState } from "../../types/TOrderFeed";

export type TwsActionTypes = {
  connect: ActionCreatorWithPayload<string>,
  disconnect: ActionCreatorWithoutPayload,
  wsMessage: ActionCreatorWithPayload<TFeedState>,
  wsClose: ActionCreatorWithoutPayload,
}

const createSocketMiddleware = (wsActions: TwsActionTypes): Middleware => {
  let socket: WebSocket | null = null;

  return (store) => (next) => (action: TFeedActions) => {
    const { dispatch, getState } = store;
    const { type, payload } = action;
    const { connect, disconnect, wsMessage, wsClose } = wsActions;
    console.log(action);
    if (connect.match(action) &&   typeof payload === 'string') {
      const wsUrl: string = payload;
      
      socket = new WebSocket(payload);

      if (socket) {
        socket.onopen = (event) => {
          console.log('WS_CONNECTION_SUCCESS');
        };

        socket.onerror = (event) => {
          // console.log(`WS_CONNECTION_ERROR: `);
          dispatch(wsClose());
        };

        socket.onmessage = (event) => {
          // console.log(`WS_CONNECTION_MESSAGE: `);
          const { data } = event;
          dispatch(wsMessage(JSON.parse(data)));
        };

        socket.onclose = (event) => {
          // console.log('WS_CONNECTION_CLOSED');
          dispatch(wsClose());
        };
      }
    }

    // if (type === "socket/disconnect") {
    if (socket && wsClose.match(action)) {
      if (socket) {
        socket.close();
        socket = null;
        dispatch(wsClose());
      }
    }

    return next(action);
  };
};

export default createSocketMiddleware;
