var houseKeeping =[{"inventoryId":1,"name":"Mosquito Coil","details":"for security people","category":"House Keeping","addedBy":"Nitin Patil","quantityInstock":1,"reorderlevel":"Monthly","lastOrdered":"2020-04-30T18:30:00.000Z","needToOrder":"Yes","quantityRequired":10,"deadline":"2020-05-29T18:30:00.000Z","orderStatus":"Pending","ownerForPurhcase":"Nagraj"},{"inventoryId":10,"name":"buckets","category":"House Keeping","quantityInstock":1},{"inventoryId":11,"name":"harpic","category":"House Keeping","quantityInstock":2},{"inventoryId":12,"name":"lizol","category":"House Keeping","quantityInstock":2},{"inventoryId":13,"name":"colin","category":"House Keeping","quantityInstock":1,"needToOrder":"Yes"},{"inventoryId":14,"name":"soap oill","category":"House Keeping","quantityInstock":1,"needToOrder":"Yes"},{"inventoryId":15,"name":"floor serbber brush","category":"House Keeping","quantityInstock":4},{"inventoryId":16,"name":"floor mat cloth","category":"House Keeping","quantityInstock":4},{"inventoryId":17,"name":"dusting cloth","category":"House Keeping","quantityInstock":4},{"inventoryId":18,"name":"dust pan","category":"House Keeping","quantityInstock":4},{"inventoryId":19,"name":"floor wiper","category":"House Keeping","quantityInstock":2},{"inventoryId":20,"name":"plastic duster brush","category":"House Keeping","quantityInstock":4},{"inventoryId":21,"name":"cleaning moops","category":"House Keeping","quantityInstock":1,"needToOrder":"Yes"},{"inventoryId":22,"name":"grass brooms","category":"House Keeping","quantityInstock":0,"needToOrder":"Yes"},{"inventoryId":23,"name":"microfiber dustr","category":"House Keeping","quantityInstock":2},{"inventoryId":24,"name":"B.scrubber brush","category":"House Keeping","quantityInstock":4},{"inventoryId":25,"name":"cocont brooms","category":"House Keeping","quantityInstock":2},{"inventoryId":26,"name":"hand gloves","category":"House Keeping","quantityInstock":2}]
var electrical = [{"inventoryId":2,"name":"Lift lights","category":"Electrical","lastOrdered":"2020-02-29T18:30:00.000Z","needToOrder":"Yes","quantityRequired":2}]
var plumbing = [{"inventoryId":3,"name":"Aerol","details":"to fix some tiles","category":"Plumbing","needToOrder":"No","quantityRequired":0},{"inventoryId":27,"name":"kitchen rubber","category":"Plumbing","quantityInstock":2}]
var stationary = [{"inventoryId":4,"name":"Printer Cartrige","category":"Stationary","vendor":"https://www.amazon.in/dp/B06ZZ62BN7/ref=cm_sw_r_wa_apa_i_7zRTEbCR334ET","needToOrder":"Yes","quantityRequired":1,"deadline":"2020-05-29T18:30:00.000Z"},{"inventoryId":5,"name":"Printing paper","category":"Stationary","quantityInstock":2,"reorderlevel":"Monthly"},{"inventoryId":6,"name":"folding file","category":"Stationary","needToOrder":"yes","quantityRequired":10},{"inventoryId":9,"name":"wall clock cell","category":"Stationary","quantityInstock":"oooo","needToOrder":"Yes","quantityRequired":4}]
var swimming_pool = [{"inventoryId":28,"name":"copper sulphate ","category":"Swimming Pool","quantityInstock":"3 kg"}]
var others = [{"inventoryId":7,"name":"battery disleri water","category":"Other","needToOrder":"yes","quantityRequired":"10 ltr"},{"inventoryId":8,"name":"mask","category":"Other","quantityInstock":"oooo","needToOrder":"Yes","quantityRequired":20},{"inventoryId":29,"name":"fumigation gas can","category":"Other","quantityInstock":12}]

export default {houseKeeping,electrical,plumbing,stationary,swimming_pool,others}

/*

[
  {
    "inventoryId": 1,
    "name": "Mosquito Coil",
    "details": "for security people",
    "category": "House Keeping",
    "addedBy": "Nitin Patil",
    "quantityInstock": 1,
    "reorderlevel": "Monthly",
    "lastOrdered": "2020-04-30T18:30:00.000Z",
    "needToOrder": "Yes",
    "quantityRequired": 10,
    "deadline": "2020-05-29T18:30:00.000Z",
    "orderStatus": "Pending",
    "ownerForPurhcase": "Nagraj"
  },
  {
    "inventoryId": 2,
    "name": "Lift lights",
    "category": "Electrical",
    "lastOrdered": "2020-02-29T18:30:00.000Z",
    "needToOrder": "Yes",
    "quantityRequired": 2
  },
  {
    "inventoryId": 3,
    "name": "Aerol",
    "details": "to fix some tiles",
    "category": "Plumbing",
    "needToOrder": "No",
    "quantityRequired": 0
  },
  {
    "inventoryId": 4,
    "name": "Printer Cartrige",
    "category": "Stationary",
    "vendor": "https://www.amazon.in/dp/B06ZZ62BN7/ref=cm_sw_r_wa_apa_i_7zRTEbCR334ET",
    "needToOrder": "Yes",
    "quantityRequired": 1,
    "deadline": "2020-05-29T18:30:00.000Z"
  },
  {
    "inventoryId": 5,
    "name": "Printing paper",
    "category": "Stationary",
    "quantityInstock": 2,
    "reorderlevel": "Monthly"
  },
  {
    "inventoryId": 6,
    "name": "folding file",
    "category": "Stationary",
    "needToOrder": "yes",
    "quantityRequired": 10
  },
  {
    "inventoryId": 7,
    "name": "battery disleri water",
    "category": "Other",
    "needToOrder": "yes",
    "quantityRequired": "10 ltr"
  },
  {
    "inventoryId": 8,
    "name": "mask",
    "category": "Other",
    "quantityInstock": "oooo",
    "needToOrder": "Yes",
    "quantityRequired": 20
  },
  {
    "inventoryId": 9,
    "name": "wall clock cell",
    "category": "Stationary",
    "quantityInstock": "oooo",
    "needToOrder": "Yes",
    "quantityRequired": 4
  },
  {
    "name": "Housekeeping material.s"
  },
  {
    "inventoryId": 10,
    "name": "buckets",
    "category": "House Keeping",
    "quantityInstock": 1
  },
  {
    "inventoryId": 11,
    "name": "harpic",
    "category": "House Keeping",
    "quantityInstock": 2
  },
  {
    "inventoryId": 12,
    "name": "lizol",
    "category": "House Keeping",
    "quantityInstock": 2
  },
  {
    "inventoryId": 13,
    "name": "colin",
    "category": "House Keeping",
    "quantityInstock": 1,
    "needToOrder": "Yes"
  },
  {
    "inventoryId": 14,
    "name": "soap oill",
    "category": "House Keeping",
    "quantityInstock": 1,
    "needToOrder": "Yes"
  },
  {
    "inventoryId": 15,
    "name": "floor serbber brush",
    "category": "House Keeping",
    "quantityInstock": 4
  },
  {
    "inventoryId": 16,
    "name": "floor mat cloth",
    "category": "House Keeping",
    "quantityInstock": 4
  },
  {
    "inventoryId": 17,
    "name": "dusting cloth",
    "category": "House Keeping",
    "quantityInstock": 4
  },
  {
    "inventoryId": 18,
    "name": "dust pan",
    "category": "House Keeping",
    "quantityInstock": 4
  },
  {
    "inventoryId": 19,
    "name": "floor wiper",
    "category": "House Keeping",
    "quantityInstock": 2
  },
  {
    "inventoryId": 20,
    "name": "plastic duster brush",
    "category": "House Keeping",
    "quantityInstock": 4
  },
  {
    "inventoryId": 21,
    "name": "cleaning moops",
    "category": "House Keeping",
    "quantityInstock": 1,
    "needToOrder": "Yes"
  },
  {
    "inventoryId": 22,
    "name": "grass brooms",
    "category": "House Keeping",
    "quantityInstock": 0,
    "needToOrder": "Yes"
  },
  {
    "inventoryId": 23,
    "name": "microfiber dustr",
    "category": "House Keeping",
    "quantityInstock": 2
  },
  {
    "inventoryId": 24,
    "name": "B.scrubber brush",
    "category": "House Keeping",
    "quantityInstock": 4
  },
  {
    "inventoryId": 25,
    "name": "cocont brooms",
    "category": "House Keeping",
    "quantityInstock": 2
  },
  {
    "inventoryId": 26,
    "name": "hand gloves",
    "category": "House Keeping",
    "quantityInstock": 2
  },
  {
    "inventoryId": 27,
    "name": "kitchen rubber",
    "category": "Plumbing",
    "quantityInstock": 2
  },
  {
    "inventoryId": 28,
    "name": "copper sulphate ",
    "category": "Swimming Pool",
    "quantityInstock": "3 kg"
  },
  {
    "inventoryId": 29,
    "name": "fumigation gas can",
    "category": "Other",
    "quantityInstock": 12
  }
]*/
