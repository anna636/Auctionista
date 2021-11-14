package com.example.demo.controllers;



import com.example.demo.entities.User;
import com.example.demo.models.MessageModel;
import com.example.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class MessageController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private UserRepository userRepository;

    @MessageMapping("/chat/{to}")
    public MessageModel sendMessage(@DestinationVariable String to, MessageModel message) {

        System.out.println("handling send message: " + message + " to: " + to);
        Optional<User> userToFind =userRepository.findByEmail(to);
        if(userToFind!=null){
            simpMessagingTemplate.convertAndSend("/topic/messages/" + to, message);
        }
        //Check if user reviecing message exists and send it then


        return message;
    }


    @MessageMapping("/chat")
    @SendTo("/topic/notifs/update")
    public MessageModel updateItems(MessageModel message) {

        System.out.println("recieveing msg for all");
        // simpMessagingTemplate.convertAndSend("/topic/messages", message);

        //Check if user reviecing message exists and send it then


        return message;
    }
}

