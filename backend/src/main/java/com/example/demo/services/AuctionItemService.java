package com.example.demo.services;

import com.example.demo.entities.AuctionItem;
import com.example.demo.repositories.AuctionItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AuctionItemService {

    @Autowired
    private AuctionItemRepository auctionItemRepository;

    private LocalDateTime currentTime=LocalDateTime.now();



    public List<Long> deleteExpiredItems(){

        List<Long> deletedItemIds=new ArrayList<>();

        LocalDateTime currentDate=LocalDateTime.now();

        List<AuctionItem> allItems= auctionItemRepository.findAll();

        for(AuctionItem item : allItems){
            if(currentDate.isAfter(item.getDeadline()) || item.getDeadline().isEqual(currentDate)){


                auctionItemRepository.deleteById(item.getId());

                deletedItemIds.add(item.getId());


            }
        }
        return  deletedItemIds;
    }





    public List<AuctionItem> getAllAuctionItems(){

        List<AuctionItem> allItems= auctionItemRepository.findAll();

        return allItems;
    }

    public Optional<AuctionItem> getAuctionItemById(Long id){
        return auctionItemRepository.findById(id);
    }

    public AuctionItem createAuctionItem(AuctionItem auctionItem){
        try{
            return auctionItemRepository.save(auctionItem);
        }

        catch(Exception e){
            e.printStackTrace();
            return null;
        }

    }

    public void deleteItem(Long id){
         auctionItemRepository.deleteById(id);
    }
}
