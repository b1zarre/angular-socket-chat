import {
  Component,
  OnInit,
  ViewChildren,
  ViewChild,
  AfterViewInit,
  QueryList,
  ElementRef,
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatList, MatListItem } from "@angular/material/list";
import { Event } from "./shared/model/event";
import { Message } from "./shared/model/message";
import { User } from "./shared/model/user";
import { SocketService } from "./shared/services/socket.service";

import { TranslateService } from "@ngx-translate/core";

import { Store, select } from "@ngrx/store";
import {
  userSigned,
  userLeft,
  messageSend,
  messageDelete,
} from "./store/actions";
import { adjectives } from "../../assets/adjectives.js";
import { nouns } from "../../assets/nouns.js";
import { Observable } from "rxjs";
import { selectMessages, selectUsers } from "./store/selectors";

const AVATAR_URL = "https://avatars.dicebear.com/4.5/api/jdenticon";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"],
})
export class ChatComponent implements OnInit, AfterViewInit {
  user: User;
  files: any;
  users: User[] = [];
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;
  public messagesState$: Observable<Message[]>;
  public usersState$: Observable<User[]>;

  private getRandomId(): number {
    return Math.floor(Math.random() * 1000000) + 1;
  }
  private getRandomName(): string {
    return (
      adjectives[Math.trunc(Math.random() * adjectives.length - 1)] +
      " " +
      nouns[Math.trunc(Math.random() * nouns.length - 1)]
    );
  }

  @ViewChild(MatList, { read: ElementRef, static: true }) matList: ElementRef;

  @ViewChildren(MatListItem, { read: ElementRef })
  matListItems: QueryList<MatListItem>;

  constructor(private socketService: SocketService, private store: Store) {}

  ngOnInit(): void {
    this.initModel();
    this.loadUsers();
    this.sendMessage("Я вошел в чат!");
  }
  loadUsers() {
    const randomId = this.getRandomId();
    this.user = {
      id: randomId,
      name: this.getRandomName(),
      avatar: `${AVATAR_URL}/${randomId}.svg`,
    };
    this.store.dispatch(
      userSigned({
        payload: {
          id: this.user.id,
          name: this.user.name,
          avatar: this.user.avatar,
        },
      })
    );
    this.usersState$ = this.store.pipe(select(selectUsers));
  }
  ngAfterViewInit(): void {
    this.matListItems.changes.subscribe((elements) => {
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    try {
      this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
    } catch (err) {}
  }
  onFileChanges(files) {
    return this.sendMessage(this.files[0].base64);
  }
  private initModel(): void {
    this.socketService.initSocket();
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService
      .onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
        this.store.dispatch(
          messageSend({
            payload: {
              from: this.user,
              content: message,
              id: this.user.id + Math.random(),
            },
          })
        );
        this.messagesState$ = this.store.pipe(select(selectMessages));
      });

    this.socketService.onEvent(Event.CONNECT).subscribe(() => {
      console.log("connected");

      this.users.push(this.user);
    });

    this.socketService.onEvent(Event.DISCONNECT).subscribe(() => {
      console.log("disconnected");
      this.store.dispatch(
        userLeft({
          payload: {
            id: this.user.id,
            name: this.user.name,
            avatar: this.user.avatar,
          },
        })
      );

      console.log(selectUsers);
    });
  }

  public sendMessage(message: string): void {
    if (!message) {
      return;
    }

    this.socketService.send({
      from: this.user,
      content: message,
      id: this.user.id + Math.random(),
    });

    this.messageContent = null;
  }
}
