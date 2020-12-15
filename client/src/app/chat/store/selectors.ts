import {
  MessageState,
  UserState,
  userFeatureKey,
  messageFeatureKey,
} from "./reducers";
import { createFeatureSelector, createSelector } from "@ngrx/store";
export interface AppState {
  user: UserState;
  message: MessageState;
}
export const selectUserFeature = createFeatureSelector<AppState, UserState>(
  userFeatureKey
);
export const selectMessageFeature = createFeatureSelector<
  AppState,
  MessageState
>(messageFeatureKey);

export const selectUsers = createSelector(
  selectUserFeature,
  (state: UserState) => state.users
);
export const selectMessages = createSelector(
  selectMessageFeature,
  (state: MessageState) => state.messages
);
