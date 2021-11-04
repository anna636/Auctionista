package com.example.demo.sockets;

import com.example.demo.entities.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;

@Embeddable
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {

    @JsonIgnoreProperties({"myAuctionItems", "email"})
    private User user;

    private String message;
}

