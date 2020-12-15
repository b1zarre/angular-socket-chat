import { User } from "./../shared/model/user";
import { Message } from "./../shared/model/message";
import { createAction, props } from "@ngrx/store";

export const messageSend = createAction(
  "[Messages] Send message",
  props<{ payload: Message }>()
);
export const messageDelete = createAction(
  "[Messages] Delete message",
  props<{ payload: Message }>()
);

export const userSigned = createAction(
  "[Users] User signed-in",
  props<{ payload: User }>()
);
export const userLeft = createAction(
  "[Users] User left",
  props<{ payload: User }>()
);
