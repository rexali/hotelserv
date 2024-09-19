# CURLs

1.  Get csrf token
    
    * curl -X GET localhost:3030/csrf
   
    * {
      "status":"success",
      "data":{
         "token":"nWv0nr2y-suz5cJBwzB6GU7xwTt8Ll0JCvXc"
         },
      "message":"Valid token"
      }

2. Register new user

   * curl -d '{"username":"alybaba2009@gmail.com", "password":"12345678", "role":"user", "permission":["read","write"], "status":"no", "token":"nWv0nr2y-suz5cJBwzB6GU7xwTt8Ll0JCvXc"}' -H "Content-Type:application/json" -X POST localhost:3030/auth/register
   

3. Login a user
    
    *  curl \
        -d '{"username":"alybaba2009@gmail.com", "password":"12345678"}' 
        -H "Content-Type:application/json" 
        -X POST localhost:3030/auth/login/local
    

4. Verify token

   *  curl \
   -d '{
      "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJ1c2VyIiwidXNlcm5hbWUiOiJhbHliYWJhMjAwOUBnbWFpbC5jb20iLCJwZXJtaXNzaW9uIjpbInJlYWQiLCJ3cml0ZSJdLCJpYXQiOjE3MjU0Mzc5MTcsImV4cCI6MTcyNTQ0MTUxN30.pC4-Gm-ucLaeM4rdN9lyEkojYBc0eRR56lxQbfHPr98asdfgh"
      }' 
   -H "Content-Type:application/json" 
   -X POST localhost:3030/auth/verify-token
   
   

5. Create a profile

   * curl \
     -F "firstName=Aliyu" \
     -F "lastName=Bello" \
     -F "dateOfBirth=01-09-1978" \
     -F "phone=08065899144" \
     -F "address=28A Enyinare" \
     -F "localGovt=Okene" \
     -F "state=Kano" \
     -F "country=Nigeria" \
     -F "image=@C:/Users/almub/OneDrive/Pictures/2024-03-22 p-21-test2/p-21-test2 001.png" \
     -H "Content-Type: multipart/form-data" \
     -X POST localhost:3030/profiles
   
   
6. Update profile 
   
   * curl \
     -F "firstName=Aliyu" \
     -F "lastName=Bello" \
     -F "dateOfBirth=01-09-1978" \
     -F "phone=08065899144" \
     -F "address=28A Enyinare" \
     -F "localGovt=Okene" \
     -F "state=Kano" \
     -F "country=Nigeria" \
     -F "image=@C:/Users/almub/OneDrive/Pictures/2024-03-22 p-21-test2/p-21-test2 001.png" \
     -H "Content-Type: multipart/form-data" \
     -X PATCH localhost:3030/profiles/1


7. Get profile

   * curl -X GET localhost:3030/profiles/1


8. Get all profiles

   *  curl -X GET localhost:3030/profiles


9. Remove a profile 

   *  curl -X DELETE localhost:3030/profiles/2

10. Create hotel 

   * curl -F "name=HAMCO" -F "photo=@C:/Users/almub/OneDrive/Documents/MyProjects/MyImages/zakat-1.jpg" -F "email=aybaba@yahoo.com" -F "phone=08065788144" -F "address=Idogi" -F "description=Good one to patronise" -F "localGovt=Kumbotso" -F "state=Kano" -F "country=Nigeria" -F "document=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\zakat-2.jpg" -H "Content-Type: multipart/form-data" -X POST localhost:3030/hotels

11. Update Hote1
   *  curl -F "name=HAMCO" -F "photo=@C:/Users/almub/OneDrive/Documents/MyProjects/MyImages/zakat-1.jpg" -F "email=aybaba@yahoo.com" -F "phone=08065788144" -F "address=Idogi" -F "description=Good one to patronise" -F "localGovt=Kumbotso" -F "state=Kano" -F "country=Nigeria" -F "document=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\zakat-2.jpg" -F "UserId=1" -H "Content-Type: multipart/form-data" -X PATCH localhost:3030/hotels/1
    

12. Get hotels

    * curl -X GET localhost:3030/hotels


13. Get one hotel

   * curl -X GET localhost:3030/hotels/1

14. Create a room

    *  curl -F "photos=@C:/Users/almub/OneDrive/Documents/MyProjects/MyImages/zakat-1.jpg" -F "roomNumber=1" -F "roomType=duplex" -F "availability=true" -F "price=2000" -F "photos=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\zakat-2.jpg" -H "Content-Type: multipart/form-data" -X POST localhost:3030/rooms


15. Update a room 

   * curl -F "photos=@C:/Users/almub/OneDrive/Documents/MyProjects/MyImages/zakat-1.jpg" -F "roomNumber=1" -F "roomType=duplex" -F "availability=true" -F "price=2000" -F "photos=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\zakat-2.jpg" -H "Content-Type: multipart/form-data" -X POST localhost:3030/rooms

16. Get rooms

   *  curl -X GET localhost:3030/rooms

17. Get a room

   * $ curl -X GET localhost:3030/rooms/1

18. Update a room

    curl -F "photos=@C:/Users/almub/OneDrive/Documents/MyProjects/MyImages/zakat-1.jpg" -F "roomNumber=1" -F "roomType=duplex" -F "availability=false" -F "price=2000" -F "photos=@C:\Users\almub\OneDrive\Documents\MyProjects\MyImages\zakat-2.jpg" -H "Content-Type: multipart/form-data" -X PATCH localhost:3030/rooms/1 | json


19. Create booking

   curl -d @data.json -H "Content-Type:application/json" -X POST localhost:3030/bookings | json


20. Get notifications
    
    curl -X GET localhost:3030/notifications

21. Create notification

   curl -d '{"title":"testing","message":"How are you?","type":"Sch","recipient":["alybaba2009@gmail.com"],"status":"unread"}' -H "Content-Type:application/json" -X POST localhost:3030/notifications | json

22. Get messages
    
    curl -X GET localhost:3030/messages

23. Create messages

   curl -d '{"title":"testing","message":"How are you?","type":"Sch","recipient":"alybaba2009@gmail.com","sender":"alybaba2009@gmail.com","UserId":1}' -H "Co
   ntent-Type:application/json" -X POST localhost:3030/messages | json

24. Create Cart

    curl -d '{"quantity":1,"price":5000, "subtotal":5000,"RoomId":1,"UserId":1}' -H "Content-Type:application/json" -X POST localhost:3030/carts | json 

25. Get user cart
    
    curl -X GET localhost:3030/carts/1

25. Create favorite
    
    curl -d '{"RoomId":1,"UserId":1}' -H "Content-Type:application/json" -X POST localhost:3030/favorites | json

26. Get user favourites

    curl -X GET localhost:3030/favorites/1

26. Create promotion

    curl -d '{"RoomId":1,"UserId":1,"name": "Affordable Housing","endDate":"02-09-2024","startDate":"02-09-2024", "description":"Get one buy one","minPurchase":1,"maxPurchase":2,"status": "pending"}' -H "Content-Type:application/json" -X POST localhost:3030/promotions | json

27. Get promotions

    curl -X GET localhost:3030/promotions | json

28. Create a review

    curl -d '{"RoomId":1,"UserId":1,"title":"Not goood","content":"It is not that good","rating":4,"status":"approved"}' -H "Content-Type:application/json" -X POST localhost:3030/reviews | json

29. Get reviews

    curl -X GET localhost:3030/reviews | json

30. Create a wallet

    curl -d '{"UserId":1,"currencyType":"NGN","balance":1000}' -H "Content-Type:application/json" -X POST localhost:3030/wallets | json

31. Get a wallet
    
    curl -X GET localhost:3030/wallets | json