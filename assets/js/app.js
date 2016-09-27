function bookSearch(){

  var search = $('#titleInput').val().trim();
  // parseSearch adds the + sign in between search words, might not need it
  var parseSearch = search.split(" ").join("+");

  console.log(parseSearch);

  $.ajax({
    url: 'https://www.googleapis.com/books/v1/volumes?q=' + search,
    type: 'GET',
    dataType: 'JSON',
    data: {param1: 'value1'},
    success: function(data) {
      for (var i = 0; i < data.items.length; i++) {
      var images = data.items[i].volumeInfo.imageLinks.smallThumbnail;
      var titles = data.items[i].volumeInfo.title;
      var authors = data.items[i].volumeInfo.authors;
      var description = data.items[i].volumeInfo.description;
      var price = data.items[i].saleInfo.retailPrice;
      var bookTitle = $('<div>').addClass('thisBook');
      bookTitle.attr({'data-images': images}).attr({'data-description': description}).attr({'data-price': price}).attr({'data-title': titles}).attr({'data-author': authors});
      bookTitle.append("<h4>" + titles + "</h4>" + " <h5>" + authors + "</h5>");
      $('#searchResults').append(bookTitle);
    }

    }

    
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });
  
   $('#titleInput').val(" ");

  return false;


}


$(document).on('click', '#submit-titleAuthor', bookSearch);

// When user selects from Search Results
$(document).on('click', '.thisBook', function(){
  $('#searchResults').empty();
  console.log($(this).data('title'));
  var cover = $("<img height='200px'>");
  var img = $(this).data('images');

  cover.attr('src', img).addClass('coverCSS bookInfo');
  $('.bookshelf-panel').append(cover);
});

//Clicking books on shelf to grab info
$(document).on('click', '.bookInfo', function(){
  // var title2 = $(this).data('titles')
});

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBeB0EnQ2TZwhzZMhlN3361_lpqjD3Dtv4",
  authDomain: "book-shelf-e0c52.firebaseapp.com",
  databaseURL: "https://book-shelf-e0c52.firebaseio.com",
  storageBucket: "book-shelf-e0c52.appspot.com",
  messagingSenderId: "768420248928"
};
firebase.initializeApp(config);

var database = firebase.database();
console.log("Firebase");

// Set up empty array for star rating images
var ratingsArray = []

// Set global variables


// Takes user ISBN input from form and adds new book to virtual Bookshelf
$("#ISBN-form").on("submit", function(e){
  e.preventDefault();
  e.stopPropagation();
  var isbnInput = $('#isbninput').val().trim();
  // Auto pushes up to book shelf

  // Using ISBN # retrieve title author summary and possibly reviews
  database.ref().push({
    ISBN : isbnInput
  })

  // Calls to dreambooks API to get NY Times reviews and ratings
  var dreambooksURL = "http://api/books/reviews.json?q=" + isbnInput + "&key=da5e557ab077cd7d98bef194bedc0e000c1e75af"
  $.ajax({url: dreambooksURL, method: 'GET'}).done(function(reviews){
    var reviewLink = reviews.book.critic_reviews[0].review_link;
    var starRating = reviews.book.critic_reviews[0].star_rating;
    var snippet = reviews.book.critic_reviews[0].snippet;
    // jQuery for display when book is clicked on
  var reviewImg = $('<img>')
  var source = "/assets/images/Stars-"
  var j = ratingsArray.indexOf(starRating);
  source = source + ratingsArray[j];
  reviewImg.attr('src', source);
  //might change later
  $('#display').append(reviewImg);
  });

  // Conditionals for star Ratings

})


// Takes user Author/Title input from form and adds new book to virtual Bookshelf
$("#TA-form").on("submit", function(e){
  e.preventDefault();
  e.stopPropagation();
  var titleInput = $('#titleInput').val().trim()
  var authorInput = $('#authorInput').val().trim()
  // Gives person options based on author or title, then click to send up info

  // Calls to dreambooks API to get NY Times book reviews and ratings
  var dreambooksURL = "http://api/books/reviews.json?q=" + titleInput + "&key=da5e557ab077cd7d98bef194bedc0e000c1e75af"
  $.ajax({url: dreambooksURL, method: 'GET'}).done(function(reviews){
    var reviewLink = reviews.book.critic_reviews[0].review_link;
    var starRating = reviews.book.critic_reviews[0].star_rating;
    var snippet = reviews.book.critic_reviews[0].snippet;
    console.log()


    
    var reviewImg = $('<img>')
    var source = "/assets/images/Stars-"
    var j = ratingsArray.indexOf(starRating);
    source = source + ratingsArray[j];
    reviewImg.attr('src', source);
    //might change later
    $('#display').append(reviewImg);
  });
  // Conditionals for star ratings
  
  
});

  

