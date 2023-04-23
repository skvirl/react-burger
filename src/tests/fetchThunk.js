import { jest } from "@jest/globals";

export const resolvedResponse = ({
  fetchFunction,
  fetchFunctionName,
  response,
}) =>
  it(`should ${fetchFunctionName} with resolved response`, async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(response),
    });

    const dispatch = jest.fn();

    const thunk = fetchFunction([]);
    await thunk(dispatch, () => ({}));
    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [pendingCall, fulfilledCall] = calls;

    expect(pendingCall[0].type).toBe(fetchFunction.pending().type);
    expect(fulfilledCall[0].type).toBe(fetchFunction.fulfilled().type);
    expect(fulfilledCall[0].payload).toBe(response);
  });

export const rejectedResponse = ({ fetchFunction, fetchFunctionName }) =>
  it(`should ${fetchFunctionName} with rejected response`, async () => {
    
    const status = "404";
    const statusText = "page not found";
    const response = `Ошибка ${status}: ${statusText}`;

    fetch.mockResolvedValue({
      ok: false,
      status,
      statusText,
    });

    const dispatch = jest.fn();
    const thunk = fetchFunction();
    await thunk(dispatch, () => ({}));

    const { calls } = dispatch.mock;
    expect(calls).toHaveLength(2);
    const [pendingCall, rejectedCall] = calls;

    expect(pendingCall[0].type).toBe(fetchFunction.pending().type);
    expect(rejectedCall[0].type).toBe(fetchFunction.rejected().type);
    expect(rejectedCall[0].payload).toBe(response);
  });
