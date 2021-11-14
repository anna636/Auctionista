package com.example.demo.services;

import com.example.demo.controllers.MessageController;
import com.example.demo.entities.AuctionItem;
import com.example.demo.entities.Bid;
import com.example.demo.entities.User;
import com.example.demo.models.MessageModel;
import com.example.demo.repositories.AuctionItemRepository;
import com.example.demo.repositories.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private AuctionItemRepository auctionItemRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private MessageController messageController;

    public List<Bid> getAll(){
        return bidRepository.findAll();
    }
    public Optional<Bid> getById(long id){
        return bidRepository.findById(id);
    }



    public Bid saveBid(Bid bid){

        try{





            long auctionItemId = bid.getAuctionItem().getId();
            AuctionItem auctionItem = auctionItemRepository.getById(auctionItemId);


            User user = userService.getById(Long.valueOf(bid.getUser_id())).get(); //Finding owner of user

            //Building new message model to send
            MessageModel notif=MessageModel.builder().message("bid owner: "+user.getUsername() + " item id "+ bid.getAuctionItem().getId())
                    .type("notification").fromLogin(user.getEmail()).build();

            //Getting user who will receive outbidden notification
            Bid lastBid=auctionItem.getBids().get(auctionItem.getBids().size()-1);
            User lastBidOwner=userService.getById(Long.valueOf(lastBid.getUser_id())).get();

            //Sending notification
            messageController.sendMessage(lastBidOwner.getEmail(), notif);


            if( Long.parseLong(bid.getUser_id()) == auctionItem.getOwner().getId()) {
                System.out.println("User can't place bid on their own items");
                return null;
            }

            auctionItem.updateValues(bid);

            return bidRepository.save(bid);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }
}
