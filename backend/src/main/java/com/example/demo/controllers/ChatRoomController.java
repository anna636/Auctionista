package com.example.demo.controllers;

import com.example.demo.entities.ChatRoom;
import com.example.demo.services.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest")
public class ChatRoomController {

    @Autowired
    private ChatRoomService chatRoomService;

    @PostMapping("/chatroom")
    public ResponseEntity<ChatRoom> createChatRoom(@RequestBody ChatRoom chatRoom) {
        ChatRoom newChatRoom = chatRoomService.createChatRoom(chatRoom);
        if(newChatRoom != null) {
            return ResponseEntity.ok(newChatRoom);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
