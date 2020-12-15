import { User } from "../shared/model/user";
import { Message } from "../shared/model/message";
import { messageSend, messageDelete, userLeft, userSigned } from "./actions";
import { createReducer, on } from "@ngrx/store";

export const userFeatureKey = "user";
export const messageFeatureKey = "message";
export interface UserState {
  users: User[];
}

export interface MessageState {
  messages: Message[];
}

export const INIT_USER_STATE: UserState = {
  users: [],
};

export const INIT_MESSAGE_STATE: MessageState = {
  messages: [],
};

export const UserReducer = createReducer(
  INIT_USER_STATE,
  on(userSigned, (state, { payload: user }) => ({
    ...state,
    users: [...state.users, user],
  })),
  on(userLeft, (state, { payload: user }) => ({
    ...state,
    users: [...state.users.filter((usr) => usr.id !== user.id)],
  }))
);

export const MessageReducer = createReducer(
  INIT_MESSAGE_STATE,
  on(messageSend, (state, { payload: message }) => ({
    ...state,
    messages: [...state.messages, message],
  })),
  on(messageDelete, (state, { payload: message }) => ({
    ...state,
    messages: [...state.messages.filter((msg) => msg.id !== message.id)],
  }))
);
