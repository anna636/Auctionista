package com.example.demo.entities;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class User {

    @Id // primary key
    @GeneratedValue // enables auto increment
    private long id;

    private String fullName;

    @Column(unique=true)
    private String username;
    private String email;

    @JsonIgnore
    @JsonProperty(value = "password")
    public String getPassword() {
        return password;
    }

    private String password;

    @OneToMany(mappedBy="owner")
    @JsonIgnoreProperties({"owner"})
    private List<AuctionItem> myAuctionItems;

    @Enumerated(EnumType.STRING)
    private AuthProvider provider;

    private String providerId;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "user_chatrooms",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "chatroom_id")
    )
    private List<ChatRoom> chatrooms;

    public AuthProvider getProvider() {
        return provider;
    }

    public void setProvider(AuthProvider provider) {
        this.provider = provider;
    }

    public String getProviderId() {
        return providerId;
    }

    public void setProviderId(String providerId) {
        this.providerId = providerId;
    }

    public void updateChatrooms(ChatRoom chatRoom) {
       this.chatrooms.add(chatRoom);
   }


}
