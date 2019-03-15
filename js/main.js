// Initialize jquery for page
$(document).ready(function () {

  //Show light nav if not home page
  if(onPg("#the_basics")){
    var fbb = {
          facebook:{
            accounts: ['@OpenAirPub'],
            limit: 6,
            access_token: 'CAAUuQHFV7vIBAHBLiQwA98tXtXOMjaMGUOLcmQCS8uMfSCnpuSKeR1J29kVZCfvY21TKk3HFj4aPesOZBcPL9PGxMuXF8a89mL4n1UZAcOZAOXDVpAAES0aFW4sgpj9J2PrUaRIYfsY0PumCqWSoeto2ZC0ZBfF04F6di9b0xb0d9ZA5FIEUJrV' // APP_ID|APP_SECRET
          }
        };

    feed(fbb);
    smoothSkroll();
  }
  else{
    showLightNav();
    $('.navbar-brand').toggleClass("Op-1");
  }

  if(onPg("#get_involved")){
    initMap();
    smoothSkroll();
  }

  // Get date time if on lineup page
  if(onPg(".lineup-subnav")){
    smoothSkroll();
   
    var dt = new Date();
    var hour = dt.getHours();
    var date=dt.getDate();
 
    // Check if we are during the event
    if(dt > new Date('9/1/2015 12:00:00 AM') && dt < new Date('9/11/2015 11:59:59 PM') && hour>=16 && hour<=20){
      // Check that we are on the date corresponding to the week     
      if(date<5 && $("#week1").length>0 || date>7  && $("#week2").length>0){
          var timeslot = $(".artist-wrapper section:nth-child("+date+")");
          $(timeslot).find("div:nth-child("+(hour-15)+") p:last-child").addClass("Tc-a");
      }
    }

    $(".artist-article a").click(function(){
      $(".artist-article").find(".selected-artist").toggleClass("selected-artist");
      $(this).parent().toggleClass("selected-artist");
      $(".artist-article").find(".mh-show").toggleClass("mh-show mh-hide");
      $(this).closest(".artist-article").find(".artist-info").toggleClass("mh-show mh-hide");
    });
  }

  // Dont include smooth scroll in the_loop
  if(onPg("#the_loop")){
    //new W0W().init();

    var fbb = {
          facebook:{
            accounts: ['@OpenAirPub'],
            limit: 10,
            access_token: 'CAAUuQHFV7vIBAHBLiQwA98tXtXOMjaMGUOLcmQCS8uMfSCnpuSKeR1J29kVZCfvY21TKk3HFj4aPesOZBcPL9PGxMuXF8a89mL4n1UZAcOZAOXDVpAAES0aFW4sgpj9J2PrUaRIYfsY0PumCqWSoeto2ZC0ZBfF04F6di9b0xb0d9ZA5FIEUJrV' // APP_ID|APP_SECRET
          }
        };

   feed(fbb);
  }

  if(onPg("#media")){

    var igg = {
      instagram:{
        accounts: ['@openairpub'],
        limit:15,
        client_id: '76d6a346ea464b6597a559e1196888a0'
      }
    };

    feed(igg);
  }

  if(onPg("#FAQ")){
    smoothSkroll();
  }

});

// Reveal dropdown items for mobile view
$(".reveal-dropdown").hover(function(){
  $(this).find(".dropdown-submenu").toggleClass("mh-hide");
  $(this).find(".dropdown-submenu").toggleClass("mh-show");
});

$(".reveal-button").click(function(event) {
  event.preventDefault();
});


var drop = false; //Stop toggle when scrolling
$(".navbar-toggle").click(function(){
  if($(window).scrollTop()<100 && $("#the_basics").length>0){
    showLightNav();
  }     
  drop = !drop;
}); 

// Reveal darkened header when scrolling down page
var cnt = 0;
$(window).scroll(function() {
  var top = 100;
  var sk = $(window).scrollTop();
  if((sk>=top && cnt ==0 || sk<top && cnt ==1) && !drop && $("#the_basics").length>0 ){
    showLightNav();
    $('.navbar-brand').toggleClass("Op-1");
    cnt =(cnt==0)?1:0;
  }
});

// White nav styling on every page besides home
function showLightNav(){
  $(".icon-bar").toggleClass("bg-light")
  $(".icon-bar").toggleClass("bg-dark");
  $('.navbar').toggleClass("bg-light");
  $('.main-nav a span').toggleClass("Tc-c");
}

// Jquery Masonary tiling
function tile(){
  console.log("called");
  setTimeout(function() {
    $('.social-feed-container').masonry({
    itemSelector: '.social-feed-element'
      });
  }, 1000);
}

// Boolean webpage check
function onPg(element){return $(element).length>0;}

// Initialize Google Maps
function initMap() {
    var myLatlng = {lat: 45.504746, lng: -73.577068};

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 17,
      center: myLatlng,
      disableDefaultUI: true,
      // mapTypeId: google.maps.MapTypeId.SATELLITE,
      scrollwheel: false
    });

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      
      title: 'Lower Field West'
    });

    map.addListener('center_changed', function() {
      // 3 seconds after the center of the map has changed, pan back to the
      // marker.
      window.setTimeout(function() {
        map.panTo(marker.getPosition());
      }, 3000);
    });
}

// Post to Google Doc
function postToGD(){
  var email = $('#email').val();
  var first = $('#fn').val();
  var last = $('#ln').val();
  var phone = $('#tele').val();
  var txt = $('#txt').val()=="on"?"yes":"no";

  $.ajax({
    url: "https://docs.google.com/forms/d/1Y4bcB4p9yvPGMqkc2OMUkew8mHQ476C6FjlhFx5tbg0/formResponse",
    data: { 
      "entry.786768160": email,
      "entry.1089676029": first, 
      "entry.56585758": last, 
      "entry.1172822763": phone,
      "entry.2040325548": txt },
    type: "POST",
    dataType: "xml",
    statusCode: {
        0: function () {
            window.location.replace("ThankYou.html");
        },
        200: function () {
            window.location.replace("ThankYou.html");
        }
    }
  });
}

// Wrapper for smoothscroll
function smoothSkroll(){
  smoothScroll.init({
    speed: 500, // Integer. How fast to complete the scroll in milliseconds
    easing: 'easeInOutCubic', // Easing pattern to use
    updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
  });
}

// Wrapper for socialfeed.js
function feed(social_options){
    var empty = {} 
    var options = {
      length:400,
      show_media:true,
      // Moderation function - if returns false, template will have class hidden
      moderation: function(content){
          return  (content.text) ? content.text.indexOf('fuck') == -1 : true;
      },
      update_period: 5000,
      // When all the posts are collected and displayed - this function is evoked
      callback: function(){
        tile();
      }
    }; 
    var settings = $.extend(empty, social_options, options);

    console.log("insidefeed");
    console.log(settings);

    $('.social-feed-container').socialfeed(settings); 
}


