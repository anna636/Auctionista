package com.example.demo.controllers;

import com.example.demo.services.MessageService;
import com.example.demo.sockets.ChatMessage;
import com.example.demo.sockets.SocketModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
}

