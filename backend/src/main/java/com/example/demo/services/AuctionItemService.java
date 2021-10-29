package com.example.demo.services;

import com.example.demo.entities.AuctionItem;
import com.example.demo.repositories.AuctionItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Optional;

@Service
public class AuctionItemService {

    @Autowired
    private AuctionItemRepository auctionItemRepository;


    public List<AuctionItem> getItemsInBatch(String offset) {return auctionItemRepository.getItemsInBatch(offset);}

    public List<AuctionItem> getAllAuctionItems(){
        return auctionItemRepository.findAll();
    }

    public Optional<AuctionItem> getAuctionItemById(Long id){
        return auctionItemRepository.findById(id);
    }

    public AuctionItem createAuctionItem(AuctionItem auctionItem){
        try{
            auctionItem.setMinimumBid((double) Math.round(auctionItem.getStartPrice() * 1.1));
            return auctionItemRepository.save(auctionItem);
        }

        catch(Exception e){
            e.printStackTrace();
            return null;
        }

    }

    public List<AuctionItem> getByTitle(String title){
        return auctionItemRepository.customFindAllByTitleIgnoreCase(title);
    }

}


