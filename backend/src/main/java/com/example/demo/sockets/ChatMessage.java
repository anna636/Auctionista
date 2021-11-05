package com.example.demo.sockets;

import com.example.demo.entities.ChatRoom;
import com.example.demo.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {

    @Id
    @GeneratedValue
    private long id;

    @ManyToOne
    @JsonIgnoreProperties({"messages", "users"})
    private ChatRoom chatroom;

// try to change back to user
    private String userId;

    private String message;
}

