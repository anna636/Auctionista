package com.example.demo.entities;

import com.example.demo.sockets.ChatMessage;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;

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

    @OneToMany(mappedBy = "chatroom")
    private List<ChatMessage> messages = new ArrayList<>();

    @ManyToMany
   @JsonIncludeProperties({"id", "username"})
    private List<User> users;


}
