package com.example.demo.sockets;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OutbiddenNotif {

    private String fromLogin;
    private String toWho;
    private String auctionItemid;
    private String auctionItemTitle;
    private int lastBidAmount;


    public String getFromLogin() {
        return fromLogin;
    }

    public void setFromLogin(String fromLogin) {
        this.fromLogin = fromLogin;
    }

    public String getToWho() {
        return toWho;
    }

    public void setToWho(String toWho) {
        this.toWho = toWho;
    }

    public String getAuctionItemid() {
        return auctionItemid;
    }

    public void setAuctionItemid(String auctionItemid) {
        this.auctionItemid = auctionItemid;
    }



    public String getAuctionItemTitle() {
        return auctionItemTitle;
    }

    public void setAuctionItemTitle(String auctionItemTitle) {
        this.auctionItemTitle = auctionItemTitle;
    }

    public int getLastBidAmount() {
        return lastBidAmount;
    }

    public void setLastBidAmount(int lastBidAmount) {
        this.lastBidAmount = lastBidAmount;
    }


}
