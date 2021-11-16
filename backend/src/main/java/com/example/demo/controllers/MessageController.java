package com.example.demo.controllers;

import com.example.demo.services.MessageService;
import com.example.demo.sockets.ChatMessage;
import com.example.demo.sockets.Notification;
import com.example.demo.sockets.OutbiddenNotif;
import com.example.demo.sockets.SocketModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class MessageController {

    @Autowired
    private MessageService messageService;

    @Autowired
    private SocketModule socketModule;

    @PostMapping("/api/message/{roomid}")
    public ResponseEntity<ChatMessage> message(@RequestBody ChatMessage chatMessage, @PathVariable String roomid) {
        socketModule.emitToRoom( roomid, "chat", chatMessage);

        ChatMessage savedMessage = messageService.saveMessage(chatMessage);
        if(savedMessage != null) {
            return ResponseEntity.ok(savedMessage);
        }
        else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/api/bid-notifs")
    public Notification updateItem(@RequestBody Notification notif) {
        socketModule.emit("notifications", notif);
        System.out.println("Got notification about updating bid with id"+ notif.getUpdateItemId());
        return notif;

    }

    @PostMapping("/api/outbidden")
    public OutbiddenNotif sendOutbiddenNotif(@RequestBody OutbiddenNotif notif){
        socketModule.emit("outbidden", notif);
        System.out.println("user with id "+notif.getToWho() + " has been outbidden by " + notif.getFromLogin() + " on item with id " + notif.getAuctionItemid());
        return notif;
    }
}

