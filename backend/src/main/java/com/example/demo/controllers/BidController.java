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
@CrossOrigin
public class BidController {

    @Autowired
    private BidService bidService;

    @GetMapping("/bids")
    public ResponseEntity<List<Bid>> getAllBids() {

        List<Bid> allBids= bidService.getAll();
        if(allBids.size() > 0){
            return ResponseEntity.ok(allBids);
        }
        else{
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/bids/{id}")
    public ResponseEntity<Optional<Bid>> getBidById(@PathVariable long id) {
        Optional<Bid> bid = bidService.getById(id);
            if(bid.isPresent()){
                return ResponseEntity.ok(bid);
            }
            else{
                return ResponseEntity.noContent().build();
            }
    }

    @GetMapping("/bids/user-id/{userid}")
    public ResponseEntity<List<Bid>> getBidsByUserId(@PathVariable long userid) {
        List<Bid> bids = bidService.getBidsByUserId(String.valueOf(userid));
        if(bids != null){
            return ResponseEntity.ok(bids);
        }
        else{
            return ResponseEntity.noContent().build();
        }
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
