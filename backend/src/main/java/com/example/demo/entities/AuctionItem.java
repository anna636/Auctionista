package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import javax.annotation.PostConstruct;
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
    private String images;
    private Boolean sold;
    private Integer startPrice;
    private Integer minimumBid;
    private Integer primaryImgIndex;

    @OneToMany(mappedBy = "auctionItem")
    @JsonIgnoreProperties({"auctionItem"})
    private List<Bid> bids = new ArrayList<>();

   @ManyToOne()
   @JsonIgnoreProperties({"email", "password", "myAuctionItems"})
    private User owner;

   public void updateValues(Bid bid) {
       // Updates the startprice to the latest bid
       this.startPrice = bid.getAmount();
       // Updates next minimum bid
       this.minimumBid = (double) Math.round(this.startPrice * 1.1);
   }

}
