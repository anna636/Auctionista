package com.example.demo.repositories;


import com.example.demo.entities.AuctionItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuctionItemRepository extends JpaRepository<AuctionItem, Long> {

    @Query(value="SELECT * FROM auction_items LIMIT 2 OFFSET :offset", nativeQuery = true)
    List<AuctionItem> getItemsInBatch(String offset);
}
