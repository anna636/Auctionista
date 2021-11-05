package com.example.demo.controllers;

import com.example.demo.entities.Bid;
import com.example.demo.entities.ChatRoom;
import com.example.demo.services.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/rest")
public class ChatRoomController {

    @Autowired
    private ChatRoomService chatRoomService;

    @GetMapping("/chatroom/{id}")
    public ResponseEntity<Optional<ChatRoom>> getRoomById(@PathVariable long id) {
        Optional<ChatRoom> chatRoom = chatRoomService.getById(id);

        if(chatRoom.isPresent()) {
            return ResponseEntity.ok(chatRoom);
        }
        else{
            return ResponseEntity.noContent().build();
        }
    }

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
