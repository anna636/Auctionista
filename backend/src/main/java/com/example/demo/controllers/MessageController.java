package com.example.demo.controllers;

import com.example.demo.sockets.ChatMessage;
import com.example.demo.sockets.SocketModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {

    @Autowired
    private SocketModule socketModule;

    @PostMapping("/api/message")
    public void message(@RequestBody ChatMessage chatMessage) {
        socketModule.emit("chat", chatMessage);
    }
}

