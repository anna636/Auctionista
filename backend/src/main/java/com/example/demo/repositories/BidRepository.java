package com.example.demo.repositories;

import com.example.demo.entities.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {

    @Query(value="SELECT * FROM bids WHERE user_id = :userid", nativeQuery = true)
    ArrayList<Bid> getBidsByUserId(@Param("userid") String userId);
}
