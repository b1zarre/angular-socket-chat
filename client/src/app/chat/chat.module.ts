import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MaterialModule } from "../shared/material/material.module";
import { AlifeFileToBase64Module } from "alife-file-to-base64";
import { ChatComponent } from "./chat.component";
import { CrystalLightboxModule } from "@crystalui/angular-lightbox";
import { SocketService } from "./shared/services/socket.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    AlifeFileToBase64Module,
    CrystalLightboxModule,
  ],
  declarations: [ChatComponent],
  providers: [SocketService],
})
export class ChatModule {}
