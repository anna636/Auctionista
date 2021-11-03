package com.example.demo.repositories;


import com.example.demo.entities.AuctionItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;

import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface AuctionItemRepository extends JpaRepository<AuctionItem, Long> {



     @Query (value="SELECT rowid, * FROM auction_items WHERE id = :id", nativeQuery = true)
     ArrayList<String> getRowId (String id);


    @Query(value="SELECT * FROM auction_items WHERE sold = false LIMIT 6 OFFSET :offset", nativeQuery = true)
    List<AuctionItem> getItemsInBatch(String offset);



    @Query(value = "SELECT * FROM auction_items WHERE title COLLATE UTF8_GENERAL_CI LIKE %:title% COLLATE UTF8_GENERAL_CI", nativeQuery = true)
    List<AuctionItem> customFindAllByTitleIgnoreCase(@Param("title") String title);

}
