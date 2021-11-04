package com.example.demo.services;

import com.example.demo.entities.ChatRoom;
import com.example.demo.entities.User;
import com.example.demo.repositories.ChatRoomRepository;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatRoomService {

    @Autowired
    private ChatRoomRepository chatRoomRepository;

    @Autowired
    private UserRepository userRepository;

    public ChatRoom createChatRoom(ChatRoom chatRoom) {

        try{
            for(User user: chatRoom.getUsers()) {
                User userFromDB = userRepository.getById(user.getId());
                    userFromDB.updateChatrooms(chatRoom);
            }

        return  chatRoomRepository.save(chatRoom);
        } catch(Exception e) {
            e.printStackTrace();
            return null;
        }

    }
}
