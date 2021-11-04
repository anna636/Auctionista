package com.example.demo.services;

import com.example.demo.entities.ChatRoom;
import com.example.demo.repositories.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatRoomService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    public ChatRoom createChatRoom(ChatRoom chatRoom) {
        try{
        return chatRoomRepository.save(chatRoom);
        } catch(Exception e) {
            e.printStackTrace();
            return null;
        }

    }
}
