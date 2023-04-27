import { wsMessage, wsClose } from "../actions/orderFeed";
import { orderFeedReducer } from "../reducers/orderFeed";

describe("orderFeed reducer", () => {
  const initialState = {
    orders: null,
    success: null,
    total: null,
    totalToday: null,
  };

  it("should change state with incoming socket message", () => {
    const mockedOrders = [{ _id: "123", status: "created" }];
    const resultOrders = [{ _id: "123", status: "Создан" }];
    const mockedData = {
      success: true,
      total: 1,
      totalToday: 5,
    };

    const res = orderFeedReducer(initialState, {
      type: wsMessage,
      payload: { ...mockedData, orders: mockedOrders },
    });

    expect(res).toEqual({ ...mockedData, orders: resultOrders });
  });

  it("should change the status of the 'success' field to FALSE when the connection is closed", () => {
    const res = orderFeedReducer(
      { ...initialState, success: true },
      {
        type: wsClose,
      }
    );

    expect(res).toEqual({ ...initialState, success: false });
  });
});
