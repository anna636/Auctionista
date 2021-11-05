package com.example.demo.entities;

import com.example.demo.sockets.ChatMessage;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "chatrooms")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ChatRoom {

    @Id
    @GeneratedValue
    private long id;

    @ElementCollection
    @CollectionTable
    private List<ChatMessage> messages = new ArrayList<>();

    @ManyToMany
   @JsonIncludeProperties({"id", "username"})
    private List<User> users;


    public void addToMessages(Object data) {
        ObjectMapper objectMapper = new ObjectMapper();

        System.out.println("In addToMessages ***********");
        System.out.println("Data: " + data);


        ChatMessage chatMessage = objectMapper.convertValue(data, ChatMessage.class);
        System.out.println(chatMessage.toString());

        this.messages.add(chatMessage);
    }
}
