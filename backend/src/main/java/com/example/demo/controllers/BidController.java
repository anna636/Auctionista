package com.example.demo.controllers;

import com.example.demo.entities.Bid;
import com.example.demo.repositories.BidRepository;
import com.example.demo.services.AuctionItemService;
import com.example.demo.services.BidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rest")
public class BidController {

    @Autowired
    private BidService bidService;



    @GetMapping("/bids")
    public List<Bid> getAllBids() {
        return bidService.getAll();
    }

    @GetMapping("/bids/{id}")
    public Optional<Bid> getBidById(@PathVariable long id) {
        Optional<Bid> bid = bidService.getById(id);

        return bid;
    }

    @PostMapping("/bids")
    public ResponseEntity<Bid> createBid(@RequestBody Bid bid) {
        Bid savedBid = bidService.saveBid(bid);
        if(savedBid != null) {
            return ResponseEntity.ok(savedBid);
        } else {
            return  ResponseEntity.badRequest().build();
        }
    }



}
