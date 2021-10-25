package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Entity
@Table(name="auctionItems")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class AuctionItem {

    @Id
    @GeneratedValue
    private long id;

    private String title;
   private String description;
    private Integer reservationPrice;
    private LocalDateTime deadline;
    //Here we have to have cross table?
   private String images;
    private Boolean sold;
    private Integer startPrice;
    private Double minimumBid;

    @OneToMany(mappedBy = "auctionItem")
    @JsonIgnoreProperties({"auctionItem"})
    public List<Bid> bids;

   @ManyToOne()
   @JsonIgnoreProperties({"email", "password", "myAuctionItems"})
    private User owner;

}
