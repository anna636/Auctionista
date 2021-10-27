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
import java.util.ArrayList;
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
    private Integer primaryImgIndex;

    @OneToMany(mappedBy = "auctionItem")
    @JsonIgnoreProperties({"auctionItem"})
    private List<Bid> bids = new ArrayList<>();

   @ManyToOne()
   @JsonIgnoreProperties({"email", "password", "myAuctionItems"})
    private User owner;

   public void addBid(Bid bid) {
       this.bids.add(bid);
       this.startPrice = bid.getAmount();
   }

}
