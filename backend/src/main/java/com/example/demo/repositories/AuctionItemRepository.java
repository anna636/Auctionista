package com.example.demo.repositories;


import com.example.demo.entities.AuctionItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;

import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface AuctionItemRepository extends JpaRepository<AuctionItem, Long> {

     @Query (value="SELECT rowid FROM auction_items WHERE id = :id", nativeQuery = true)
     String getRowId (String id);

     @Query(value="SELECT * FROM auction_items WHERE sold = false AND expired = false LIMIT 6 OFFSET :offset", nativeQuery = true)
     List<AuctionItem> getItemsInBatch(String offset);

     @Query(value = "SELECT * FROM auction_items WHERE  sold = false AND expired = false AND title COLLATE UTF8_GENERAL_CI LIKE %:title% COLLATE UTF8_GENERAL_CI", nativeQuery = true)
     List<AuctionItem> customFindAllByTitleIgnoreCase(@Param("title") String title);

     @Query(value="SELECT * FROM auction_items WHERE owner_id = :userId AND CASE " +
            "WHEN :sold=='2' THEN sold==0 OR sold==1 " +
            "WHEN :sold='1' THEN sold==1 " +
            "WHEN :sold=='0' THEN sold==0 " +
            "END " +
            "AND CASE WHEN :expired=='2' THEN expired==0 OR expired==1 " +
            "WHEN :expired=='1' THEN expired==1 " +
            "WHEN :expired=='0' THEN expired==0 " +
            "END " +
            "ORDER BY minimum_bid DESC", nativeQuery = true)
     List<AuctionItem> findUsersItems( String userId, String sold, String expired) ;

}
