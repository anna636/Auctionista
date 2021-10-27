package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bids")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder  //-- not sure if needed. Nulls @Id and @GeneratedValue?
public class Bid {

    @Id
    @GeneratedValue
    private long id;

    private int currentBid;
    private LocalDateTime time;
    private String user_id;

    @ManyToOne
    @JsonIgnoreProperties({"bids", "owner"})
    private AuctionItem auctionItem;



}
