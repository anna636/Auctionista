package com.example.demo.services;

import com.example.demo.entities.AuctionItem;
import com.example.demo.entities.Bid;
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

    //postconstruct


    public List<Long> deleteExpiredItems(){

        List<Long> deletedItemIds=new ArrayList<>();

        LocalDateTime currentDate=LocalDateTime.now();

        List<AuctionItem> allItems= auctionItemRepository.findAll();

        for(AuctionItem item : allItems){
            if(item.getDeadline().isBefore(currentDate) || item.getDeadline().isEqual(currentDate)){


               /* auctionItemRepository.deleteById(item.getId());

                deletedItemIds.add(item.getId());*/

                if(item.getBids().size() > 0){

                    Bid lastBid=item.getBids().get(item.getBids().size()-1);

                    if(lastBid.getCurrentBid() >= item.getReservationPrice())
                    {

                        AuctionItem itemToModify=auctionItemRepository.findById(item.getId()).get();
                        itemToModify.setSold(true);
                        auctionItemRepository.save(itemToModify);
                    }
                }


            }
        }
        return  deletedItemIds;
    }





    public List<AuctionItem> getAllAuctionItems(){

        List<AuctionItem> allItems= auctionItemRepository.findBySold(false);

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
