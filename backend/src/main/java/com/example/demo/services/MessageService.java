package com.example.demo.services;

import com.example.demo.entities.AuctionItem;
import com.example.demo.entities.Bid;
import com.example.demo.repositories.MessageRepository;
import com.example.demo.sockets.ChatMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;


    public ChatMessage saveMessage(ChatMessage chatMessage){

        try{
            return messageRepository.save(chatMessage);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }
}
