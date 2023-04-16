import { createAction } from '@reduxjs/toolkit'
 import { TFeedState } from '../../types/TOrderFeed';  

export const connect = createAction<string, 'FEED_CONNECT'>('FEED_CONNECT')
export const disconnect = createAction('FEED_DISCONNECT');
export const wsMessage = createAction<TFeedState, 'FEED_WS_MESSAGE'>('FEED_WS_MESSAGE');
export const wsClose = createAction('FEED_WS_CLOSE');

export type TFeedActions = ReturnType<typeof connect>
                                | ReturnType<typeof disconnect> 
                                | ReturnType<typeof wsMessage> 
                                | ReturnType<typeof wsClose> 
