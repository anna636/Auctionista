package com.example.demo.controllers;

import com.example.demo.entities.AuctionItem;
import com.example.demo.services.AuctionItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;

@RestController

public class AuctionItemController {

    @Autowired
    private AuctionItemService auctionItemService;



    //Get all auction items in db
    @GetMapping("/rest/auctionItems")
    public ResponseEntity<List<AuctionItem>> getAll(){
        List<AuctionItem> auctionItems=auctionItemService.getAllAuctionItems();

        if(auctionItems.size()>0){
            return ResponseEntity.ok(auctionItems);
        }
        else{
            return ResponseEntity.noContent().build();
        }

    }


    //Get auction item by id
    @GetMapping("/rest/auctionItems/{id}")
    public ResponseEntity<Optional<AuctionItem>>getById(@PathVariable Long id){

        Optional<AuctionItem> auctionItem=auctionItemService.getAuctionItemById(id);

        if(auctionItem.isPresent()){
            return ResponseEntity.ok(auctionItem);
        }

        else{
            return ResponseEntity.noContent().build();
        }

    }


    //Create new auction item
    @PostMapping("/rest/auctionItem")
    //sätta not null på alla fält av auctionItem
    public ResponseEntity<AuctionItem> createAuctionItem(@RequestBody AuctionItem auctionItem){

        AuctionItem auctionItemToSave=auctionItemService.createAuctionItem(auctionItem);
        if(auctionItemToSave!=null){
            return ResponseEntity.ok(auctionItemToSave);
        }
        else{
            return ResponseEntity.badRequest().build();
        }

    }



    //Request Bid object and id of an auctionItem
    //Add bid into auctionItem list of bids and save auctionItem into db
  /*@PostMapping ("/api/auctionItem/{id}")
   public ResponseEntity<AuctionItem> addBidIntoAuctionItem(@PathVariable Long id, @RequestBody Bid bid){


      AuctionItem auctionItemToChange=auctionItemService.getAuctionItemById(id).get();

      if (auctionItemToChange!=null && bid !=null) {

          auctionItemToChange.bids.add(bid);
          createAuctionItem(auctionItemToChange);

          return  ResponseEntity.ok(auctionItemToChange);
      }

      else {

          return ResponseEntity.badRequest().build();

          }



  }*/
}
