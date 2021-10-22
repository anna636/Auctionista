package com.example.demo.entities;
import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // enables auto increment
    private long id;
    private String fullName;
    private String userName;
    private String email;
    private String password;
    //private List<Object> myAuctionItems;

    // mappedBy is the variable in the other class
    //auctionItem relation later!
    //@OneToMany(mappedBy = "owner")
    //private List<Pet> pets;

    // getters and setters
}
