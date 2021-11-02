# Auctionista

/rest/users/id
METHOD: GET
RESPONSE: 
{
    "id": 31,
    "fullName": "anna",
    "username": "boi",
    "email": "a@haha.se",
    "password": "$2a$10$9RhIyFjEG/1sOfVZaZ8ufu9/AzL1u1A9jtbW.4SYWp/Apgncq6oyC",
    "myAuctionItems": []
}

/api/register
METHOD: POST
RESPONSE: 
{
    "id": 36,
    "fullName": "test",
    "username": "test",
    "email": "test@gmail.com",
    "password": "$2a$10$aRAsD5XqRM7uluNSErqh7uN6Ls3Ar/nialWcpjbvcEgR90hZc2eO6",
    "myAuctionItems": null
}

/api/login
METHOD: POST
RESPONSE: 
{
    "id": 36,
    "fullName": "test",
    "username": "test",
    "email": "test@gmail.com",
    "password": "$2a$10$aRAsD5XqRM7uluNSErqh7uN6Ls3Ar/nialWcpjbvcEgR90hZc2eO6",
    "myAuctionItems": []
}

/api/whoami
METHOD: GET
RESPONSE: 
{
    "id": 36,
    "fullName": "test",
    "username": "test",
    "email": "test@gmail.com",
    "password": "$2a$10$aRAsD5XqRM7uluNSErqh7uN6Ls3Ar/nialWcpjbvcEgR90hZc2eO6",
    "myAuctionItems": []
}



/rest/bids
METHOD: POST
RESPONSE: 
{
    "id": 37,
    "amount": 22,
    "time": "2021-10-29T11:07:25.472",
    "user_id": "36",
    "auctionItem": {
        "id": 3,
        "title": "test2",
        "description": "sdcsc",
        "reservationPrice": 100,
        "deadline": "2021-11-01T13:59:59.298",
        "images": "/uploads/Food-Tank-28-Livestock-Farmers.jpeg",
        "sold": false,
        "startPrice": 121,
        "currentPrice": null,
        "minimumBid": 133,
        "primaryImgIndex": 0
    }
}



/rest/bids
METHOD: GET
RESPONSE:
{
    "id": 4,
    "amount": 22,
    "time": "2021-10-29T11:07:25.472",
    "user_id": "1",
    "auctionItem": {
        "id": 3,
        "title": "test2",
        "description": "sdcsc",
        "reservationPrice": 100,
        "deadline": "2021-11-01T13:59:59.298",
        "images": "/uploads/Food-Tank-28-Livestock-Farmers.jpeg",
        "sold": false,
        "startPrice": 121,
        "currentPrice": null,
        "minimumBid": 133,
        "primaryImgIndex": 0
    }
}




/rest/bids/id
METHOD: GET
RESPONSE: 
{
    "id": 4,
    "amount": 22,
    "time": "2021-10-29T11:07:25.472",
    "user_id": "1",
    "auctionItem": {
        "id": 3,
        "title": "test2",
        "description": "sdcsc",
        "reservationPrice": 100,
        "deadline": "2021-11-01T13:59:59.298",
        "images": "/uploads/Food-Tank-28-Livestock-Farmers.jpeg",
        "sold": false,
        "startPrice": 121,
        "currentPrice": null,
        "minimumBid": 133,
        "primaryImgIndex": 0
    }
}


/api/auction-items/search?title={title}
METHOD: GET
RESPONSE: 
 {
        "id": 3,
        "title": "test2",
        "description": "sdcsc",
        "reservationPrice": 100,
        "deadline": "2021-11-01T13:59:59.298",
        "images": "/uploads/Food-Tank-28-Livestock-Farmers.jpeg",
        "sold": false,
        "startPrice": 121,
        "currentPrice": 22,
        "minimumBid": 24,
        "primaryImgIndex": 0,
        "bids": [
            {
                "id": 4,
                "amount": 22,
                "time": "2021-10-29T11:07:25.472",
                "user_id": "1"
            },
            {
                "id": 5,
                "amount": 100,
                "time": "2021-10-29T11:07:52.61",
                "user_id": "1"
            },
            {
                "id": 6,
                "amount": 0,
                "time": "2021-10-29T11:19:55.889",
                "user_id": "1"
            },
            {
                "id": 7,
                "amount": 110,
                "time": "2021-10-29T11:22:08.328",
                "user_id": "1"
            },
            {
                "id": 14,
                "amount": 121,
                "time": "2021-10-29T11:34:56.443",
                "user_id": "1"
            },
            {
                "id": 37,
                "amount": 22,
                "time": "2021-10-29T11:07:25.472",
                "user_id": "36"
            }
        ],
        "owner": {
            "id": 1,
            "fullName": "anna",
            "username": "anna"
        }
    }

/rest/auction-items
METHOD: GET
RESPONSE:
 {
        "id": 3,
        "title": "test2",
        "description": "sdcsc",
        "reservationPrice": 100,
        "deadline": "2021-11-01T13:59:59.298",
        "images": "/uploads/Food-Tank-28-Livestock-Farmers.jpeg",
        "sold": false,
        "startPrice": 121,
        "currentPrice": 22,
        "minimumBid": 24,
        "primaryImgIndex": 0,
        "bids": [
            {
                "id": 4,
                "amount": 22,
                "time": "2021-10-29T11:07:25.472",
                "user_id": "1"
            },
            {
                "id": 5,
                "amount": 100,
                "time": "2021-10-29T11:07:52.61",
                "user_id": "1"
            },
            {
                "id": 6,
                "amount": 0,
                "time": "2021-10-29T11:19:55.889",
                "user_id": "1"
            },
            {
                "id": 7,
                "amount": 110,
                "time": "2021-10-29T11:22:08.328",
                "user_id": "1"
            },
            {
                "id": 14,
                "amount": 121,
                "time": "2021-10-29T11:34:56.443",
                "user_id": "1"
            },
            {
                "id": 37,
                "amount": 22,
                "time": "2021-10-29T11:07:25.472",
                "user_id": "36"
            }
        ],
        "owner": {
            "id": 1,
            "fullName": "anna",
            "username": "anna"
        }
    }

/rest/auctionItems
METHOD: POST
RESPONSE:
{
    "id": 38,
    "title": "test22",
    "description": "sdcsc",
    "reservationPrice": 100,
    "deadline": "2021-11-01T13:59:59.298",
    "images": "/uploads/Food-Tank-28-Livestock-Farmers.jpeg",
    "sold": false,
    "startPrice": 121,
    "currentPrice": 121,
    "minimumBid": 133,
    "primaryImgIndex": 0,
    "bids": [],
    "owner": {
        "id": 1,
        "fullName": "anna",
        "username": "anna"
    }
}


/rest/auctionItem/{id}
METHOD: GET
RESPONSE:

{
    "id": 38,
    "title": "test22",
    "description": "sdcsc",
    "reservationPrice": 100,
    "deadline": "2021-11-01T13:59:59.298",
    "images": "/uploads/Food-Tank-28-Livestock-Farmers.jpeg",
    "sold": false,
    "startPrice": 121,
    "currentPrice": 121,
    "minimumBid": 133,
    "primaryImgIndex": 0,
    "bids": [],
    "owner": {
        "id": 1,
        "fullName": "anna",
        "username": "anna"
    }
}


/rest/auction-items/batch/{offset}
METHOD: GET
RESPONSE:

{
    "id": 38,
    "title": "test22",
    "description": "sdcsc",
    "reservationPrice": 100,
    "deadline": "2021-11-01T13:59:59.298",
    "images": "/uploads/Food-Tank-28-Livestock-Farmers.jpeg",
    "sold": false,
    "startPrice": 121,
    "currentPrice": 121,
    "minimumBid": 133,
    "primaryImgIndex": 0,
    "bids": [],
    "owner": {
        "id": 1,
        "fullName": "anna",
        "username": "anna"
    }
}



/api/upload
METHOD: GET
RESPONSE:
[/uploads/Food-Tank-28-Livestock-Farmers.jpeg]

