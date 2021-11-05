package com.example.demo.controllers;

import com.example.demo.sockets.ChatMessage;
import com.example.demo.sockets.SocketModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @Autowired
    private SocketModule socketModule;

    @PostMapping("/api/message/{roomid}")
    public void message(@RequestBody Object chatMessage, @PathVariable String roomid) {
        socketModule.emitToRoom( roomid, "chat", chatMessage);
        socketModule.saveMessagesToRoom(roomid, chatMessage);
    }
}

