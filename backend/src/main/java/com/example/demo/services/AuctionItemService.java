package com.example.demo.services;

import com.example.demo.entities.AuctionItem;
import com.example.demo.repositories.AuctionItemRepository;
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
import java.util.Optional;

@Service
public class AuctionItemService {

    @Autowired
    private AuctionItemRepository auctionItemRepository;


    public List<AuctionItem> getItemsInBatch(String offset, String id)

    {
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

            if(item.getDeadline().isBefore(currentTime)){

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
            // Sets the minimumBid depending on the startPrice
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
        List <AuctionItem> fetchedItems=auctionItemRepository.customFindAllByTitleIgnoreCase(title);

        return fetchedItems;
    }


    public List<AuctionItem> getUsersItems (String id, String sold){
        updateItems();

        return auctionItemRepository.findUsersItems(id, sold);
    }
}


