package com.example.demo.services;

import com.example.demo.entities.AuctionItem;
import com.example.demo.repositories.AuctionItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.annotation.PostConstruct;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AuctionItemService {

    @Autowired
    private AuctionItemRepository auctionItemRepository;

    private LocalDateTime currentTime=LocalDateTime.now();


    public List<AuctionItem> getAllAuctionItems(){





        List<AuctionItem> allItems= auctionItemRepository.findAll();
        for(AuctionItem item :allItems){
            System.out.println(item.getDeadline());
            if(item.getDeadline() == currentTime){

            }
        }
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
}
