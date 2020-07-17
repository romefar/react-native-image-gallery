import {AnyAction} from 'redux'

interface IRequestHandler<TState, TAction extends AnyAction> {
  handleRequest: (state: TState) => TState
  handleSuccess: (state: TState, action: TAction) => TState
  handleFailure: (state: TState, action: TAction) => TState
}

export const requestHandler = <TState = any>(): IRequestHandler<
  TState,
  AnyAction
> => ({
  handleRequest: (state: TState & {[key: string]: any}): TState => ({
    ...state,
    error: null,
    isLoading: true
  }),
  handleSuccess: (
    state: TState & {[key: string]: any},
    action: AnyAction
  ): TState => ({
    ...state,
    error: null,
    items: action.payload || [],
    isLoading: false
  }),
  handleFailure: (
    state: TState & {[key: string]: any},
    action: AnyAction
  ): TState => ({
    ...state,
    error: action.error,
    isLoading: false
  })
})
