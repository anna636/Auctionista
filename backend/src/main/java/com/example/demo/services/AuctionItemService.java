package com.example.demo.services;

import com.example.demo.entities.AuctionItem;
import com.example.demo.entities.Bid;
import com.example.demo.repositories.AuctionItemRepository;
import com.example.demo.repositories.BidRepository;
import com.example.demo.util.Utilities;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.annotation.PostConstruct;
import java.security.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class AuctionItemService {

    @Autowired
    private AuctionItemRepository auctionItemRepository;

    @Autowired
    private BidRepository bidRepository;

    public List<AuctionItem> getItemsInBatch(String offset, String id) {
        updateItems();
        List <AuctionItem> fetchedItems =new ArrayList<>();

         if(offset.equals("0")){
             fetchedItems =auctionItemRepository.getItemsInBatch(offset);
         }
           else{
               String rowId=auctionItemRepository.getRowId(id);
               fetchedItems=auctionItemRepository.getItemsInBatch(rowId);
         }

        return fetchedItems;
    }

    public void updateItems(){
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        LocalDateTime currentTime=LocalDateTime.now();
        String formattedDateTime = currentTime.format(formatter); //Creating current time
        List<AuctionItem> fetchedItems=auctionItemRepository.findAll();

        for(AuctionItem item : fetchedItems){
            LocalDateTime itemDeadlie = item.getDeadline().plusHours(1);
            if(itemDeadlie.isBefore(currentTime)){
                item.setExpired(true);
                if(item.getBids().size()>0 && item.getBids().get(item.getBids().size()-1).getAmount() >= item.getReservationPrice()){
                    item.setSold(true);
                }
            }
            auctionItemRepository.save(item);
        }
    }

    public Optional<AuctionItem> getAuctionItemById(long id){
        updateItems();
        return auctionItemRepository.findById(id);
    }

    public AuctionItem createAuctionItem(AuctionItem auctionItem){
        try{
            auctionItem.setMinimumBid((int) Math.round(auctionItem.getStartPrice() * 1.1));
            return auctionItemRepository.save(auctionItem);
        }
        catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public List<AuctionItem> getByTitle(String title){

        updateItems();
        List <AuctionItem> fetchedItems = auctionItemRepository.customFindAllByTitleIgnoreCase(title);

        return fetchedItems;
    }

    public List<AuctionItem> getUsersItems (String id, String sold, String expired, String orderBy){
        updateItems();
        return auctionItemRepository.findUsersItems(id, sold, expired);
    }

    public AuctionItem relist(long id){
        LocalDateTime relistingTime=LocalDateTime.now().plusDays(3);
        AuctionItem item=getAuctionItemById(id).get();
        item.setBids(new ArrayList<Bid>());
        item.setExpired(false);
        item.setSold(false);
        item.setMinimumBid(item.getStartPrice());
        item.setDeadline(relistingTime);
        List<Bid> bids=bidRepository.findAll();
        for(Bid bid:bids){
            if(bid.getAuctionItem().getId()==item.getId()){
                bidRepository.deleteById(bid.getId());
            }
        }
        return auctionItemRepository.save(item);
    }

    public AuctionItem updateAuctionItemById(long id, Map values){
        try{
           Optional<AuctionItem> auctionItemOptional = getAuctionItemById(id);
           if(auctionItemOptional.isPresent()){
               var auctionItem = auctionItemOptional.get();

               Utilities.updatePrivateFields(auctionItem, values);

               return auctionItemRepository.save(auctionItem);
           }
           else{
               return null;
           }
        }
        catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

}


