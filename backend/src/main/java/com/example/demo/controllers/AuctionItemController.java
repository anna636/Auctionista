package com.example.demo.controllers;

import com.example.demo.entities.AuctionItem;
import com.example.demo.entities.Bid;
import com.example.demo.repositories.AuctionItemRepository;
import com.example.demo.services.AuctionItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin

public class AuctionItemController {

    @Autowired
    private AuctionItemService auctionItemService;




    @GetMapping("/rest/auction-items/batch/{offset}/{id}")
    public ResponseEntity<List<AuctionItem>> getItemsInBatch(@PathVariable String offset, @PathVariable  String id)
    {
        List<AuctionItem> itemList= auctionItemService.getItemsInBatch(offset, id);
        if(itemList.size() ==0){
            return ResponseEntity.noContent().build();
        }
        else{
            return ResponseEntity.ok(itemList);
        }
    }




    //Get auction item by id
    @GetMapping("/rest/auction-items/{id}")
    public ResponseEntity<Optional<AuctionItem>>getById(@PathVariable long id){

        Optional<AuctionItem> auctionItem=auctionItemService.getAuctionItemById(id);

        if(auctionItem.isPresent()){
            return ResponseEntity.ok(auctionItem);
        }

        else{
            return ResponseEntity.noContent().build();
        }

    }

    @GetMapping("/api/relist/{id}")
    public ResponseEntity<AuctionItem> relistAuctionItem(@PathVariable long id){
        AuctionItem item=auctionItemService.relist(id);
        if(item!=null){
            return ResponseEntity.ok(item);
        }
        else{
            return ResponseEntity.badRequest().build();
        }
    }


    //Create new auction item
    @PostMapping("/rest/auction-items")
    //sätta not null på alla fält av auctionItem
    public ResponseEntity<AuctionItem> createAuctionItem(@RequestBody AuctionItem auctionItem){

        AuctionItem auctionItemToSave=auctionItemService.createAuctionItem(auctionItem);
        if(auctionItemToSave!=null && auctionItem.getImages().split(",").length>0){
            return ResponseEntity.ok(auctionItemToSave);
        }
        else{
            return ResponseEntity.badRequest().build();
        }

    }

    @GetMapping("/api/auction-items/search")
    public ResponseEntity<List<AuctionItem>>getAuctionItemByTitle(@RequestParam(required = true) String title){

        List<AuctionItem> auctionItems=auctionItemService.getByTitle(title);
        System.out.println(title);

        if(!auctionItems.isEmpty()){
            return ResponseEntity.ok(auctionItems);
        }

        else{
            return ResponseEntity.noContent().build();
        }

    }

    @GetMapping("/api/my-auction-items")
    public ResponseEntity<List<AuctionItem>> getUsersItems(@RequestParam (required = true) String userId,
                                                           @RequestParam (required = true) String sold,
                                                           @RequestParam(required = true) String expired,
                                                           @RequestParam(required = true) String orderBy


    )
    {
        List<AuctionItem> auctionItems = auctionItemService.getUsersItems(userId, sold, expired, orderBy);
        if(auctionItems.size() >0){
            return ResponseEntity.ok(auctionItems);
        }
        else{
            return ResponseEntity.noContent().build();
        }
    }

    @PutMapping("/rest/auction-items/{id}")
    public AuctionItem updateAuctionItem(@PathVariable long id, @RequestBody Map values){
        System.out.println("values " + values);
        return auctionItemService.updateAuctionItemById(id, values);
    }





}
