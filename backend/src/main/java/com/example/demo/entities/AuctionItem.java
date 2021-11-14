package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
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
    private int reservationPrice;
    private LocalDateTime deadline;
    private String images;
    private boolean sold;
    private int startPrice;
    private int minimumBid;
    private int primaryImgIndex;


    public boolean isExpired() {
        return expired;
    }

    public void setExpired(boolean expired) {
        this.expired = expired;
    }

    private boolean expired=false;

    @OneToMany(mappedBy = "auctionItem")
    @JsonIgnoreProperties({"auctionItem"})

    private List<Bid> bids = new ArrayList<>();

   @ManyToOne()
   @JsonIgnoreProperties({"email", "password", "myAuctionItems"})
    private User owner;

   public void updateValues(Bid bid) {
       // Updates next minimum bid
       this.minimumBid = (int) Math.round(bid.getAmount() * 1.1);
   }

}
