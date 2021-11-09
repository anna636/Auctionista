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
        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        LocalDateTime currentTime=LocalDateTime.now();
        String formattedDateTime = currentTime.format(formatter); //Creating current time

        List <AuctionItem> items=new ArrayList<>();
        List <AuctionItem> fetchedItems =new ArrayList<>();

         if(offset.equals("0")){
             fetchedItems =auctionItemRepository.getItemsInBatch(offset);
         }
           else{
               String rowId=auctionItemRepository.getRowId(id);
               fetchedItems=auctionItemRepository.getItemsInBatch(rowId);
         }

        for(AuctionItem item : fetchedItems){

            LocalDateTime itemDeadlie = item.getDeadline().plusHours(1);  //Adding +1 hour to item deadline

            if(itemDeadlie.isAfter(currentTime)){      //If deadline is after current date, then push it to list
                items.add(item);
            }
        }
        return items;
    }

    public List<AuctionItem> getAllAuctionItems(){
        return auctionItemRepository.findAll();
    }

    public Optional<AuctionItem> getAuctionItemById(long id){
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

        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
        LocalDateTime currentTime=LocalDateTime.now();
        String formattedDateTime = currentTime.format(formatter); //Creating current time

        List <AuctionItem> items=new ArrayList<>();

        List <AuctionItem> fetchedItems=auctionItemRepository.customFindAllByTitleIgnoreCase(title);

        for(AuctionItem item : fetchedItems){

            LocalDateTime itemDeadlie = item.getDeadline().plusHours(1);  //Adding +1 hour to item deadline

            if(itemDeadlie.isAfter(currentTime)){      //If deadline is after current date, then push it to list
                items.add(item);
            }
        }


        return items;
    }

}


