package com.example.demo.entities;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    private String username;
    private String email;
    private String password;
    

   @OneToMany(mappedBy="owner")
    @JsonIgnoreProperties({"owner"})
    private List<AuctionItem> myAuctionItems;

}
