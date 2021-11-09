# Auctionista API

## /rest/users/id
### METHOD: GET
RESPONSE: 
```json
{
    "id": 4,
    "fullName": "anna tch",
    "username": "anna2",
    "email": "anna@gmail.com",
    "myAuctionItems": null
}
```

## /api/register
### METHOD: POST

REQUEST:
```json
{
    "id": 4,
    "fullName": "anna tch",
    "username": "anna2",
    "email": "anna@gmail.com",
    "password": "123"
}
```

RESPONSE: 
```json
{
    "id": 4,
    "fullName": "anna tch",
    "username": "anna2",
    "email": "anna@gmail.com",
    "myAuctionItems": null
}
```

## /api/login
### METHOD: POST
REQUEST:

```json
{
    "username": "test",
    "password":"123"
}
```

RESPONSE: 
```json
{
    "id": 36,
    "fullName": "test",
    "username": "test",
    "email": "test@gmail.com",
    "myAuctionItems": []
}
```

## /api/whoami
### METHOD: GET
RESPONSE: 
```json
{
    "id": 36,
    "fullName": "test",
    "username": "test",
    "email": "test@gmail.com",
    "myAuctionItems": []
}
```



## /rest/bids
### METHOD: POST

REQUEST:
```json
{
   
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
```

RESPONSE: 
```json
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
```


## /rest/bids
### METHOD: GET
RESPONSE:
```json
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
```



## /rest/bids/id
### METHOD: GET
RESPONSE: 
```json
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

```


## /api/auction-items/search?title={title}
### METHOD: GET
RESPONSE: 
```json
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
```



## /rest/auction-items
### METHOD: GET
RESPONSE:
```json
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
```

## /rest/auction-items
### METHOD: POST
REQUEST:

```json
{
    
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
```
RESPONSE:
```json
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

```


## /rest/auction-items/{id}
### METHOD: GET
RESPONSE:
```json

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
```

## /rest/auction-items/batch/{offset}
### METHOD: GET
RESPONSE:
```json

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
```



## /api/upload
### METHOD: GET
RESPONSE:
```json
[/uploads/Food-Tank-28-Livestock-Farmers.jpeg]
```

