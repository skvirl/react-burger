import { createAction } from '@reduxjs/toolkit'
// import { LiveTableActions } from '../../types/live-table';

export const connect = createAction<string, 'LIVE_TABLE_CONNECT'>('LIVE_TABLE_CONNECT')
export const disconnect = createAction('LIVE_TABLE_DISCONNECT');
export type TLiveTableActions = ReturnType<typeof connect>
                                | ReturnType<typeof disconnect> 
