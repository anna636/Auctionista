package com.example.demo.entities;

import com.example.demo.sockets.ChatMessage;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "chatrooms")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ChatRoom {

    @Id // primary key
    @GeneratedValue // enables auto increment
    private long id;

    @Embedded
    private List<ChatMessage> messages;

    @ManyToMany
   @JsonIncludeProperties({"id", "username"})
    private List<User> users;


}