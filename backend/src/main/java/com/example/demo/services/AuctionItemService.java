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


            //If item has exceeded deadline and got desirable reservation price, set sold to true

            Boolean ifDeadlineIsExceeded = item.getDeadline().isBefore(currentDate) || item.getDeadline().isEqual(currentDate);

            if(item.getBids().size() > 0  && ifDeadlineIsExceeded) {

                Bid lastBid = item.getBids().get(item.getBids().size() - 1);



                if (lastBid.getCurrentBid() >= item.getReservationPrice()) {

                    AuctionItem itemToModify = auctionItemRepository.findById(item.getId()).get();
                    itemToModify.setSold(true);
                    auctionItemRepository.save(itemToModify);


                }

                //else if deadline is exceeded but reservation price has not been achieved, delete item

                else if(lastBid.getCurrentBid() < item.getReservationPrice()){

                    deletedItemIds.add(item.getId());
                    auctionItemRepository.deleteById(item.getId());

                }
            }

            //If time has exceeded but there are no bids, delete item
            
            else if (ifDeadlineIsExceeded){
                deletedItemIds.add(item.getId());
                auctionItemRepository.deleteById(item.getId());

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
