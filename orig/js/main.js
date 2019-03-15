// Initialize jquery for page
$(document).ready(function () {

  //Show light nav if not home page
  if(onPg("#the_basics")){
    $('.social-feed-container').socialfeed({
      // FACEBOOK
      facebook:{
          accounts: ['@OpenAirPub'],
          limit: 3,
          access_token: 'CAAUuQHFV7vIBAIeUKeqVnxanlsahezGRErtyDxSRRKZC1ajaC1WMiwQxXZByLx6hn3oAdZAXRoRGx3g7jCmSoha7P8TFkorGvJGsJATrvsgrrBJJJRl8ZAWKDCIWNBrg1hk7eIZA4wAmVRjEOw4NL4kWoBkxaAGNdkr5fmlsoK2DwKKzDFiseIVLSKQeATAMZD' // APP_ID|APP_SECRET
      },
      // GENERAL SETTINGS
      length:400,
      show_media:false,
      // Moderation function - if returns false, template will have class hidden
      moderation: function(content){
          return  (content.text) ? content.text.indexOf('fuck') == -1 : true;
      },
      //update_period: 5000,
      // When all the posts are collected and displayed - this function is evoked
      callback: function(){
        tile();
      }
    }); 

    smoothScroll.init({
    speed: 500, // Integer. How fast to complete the scroll in milliseconds
    easing: 'easeInOutCubic', // Easing pattern to use
    updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
    });
  }
  else{
    showLightNav();
    $('.navbar-brand').toggleClass("Op-1");
  }

  if(onPg("#get_involved")){
    initMap();
    smoothScroll.init({
      speed: 500, // Integer. How fast to complete the scroll in milliseconds
      easing: 'easeInOutCubic', // Easing pattern to use
      updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
    });
  }
  // Get date time if on lineup page
  if(onPg(".lineup-subnav")){
    // var dt = new Date();
    var dt = new Date();
    var hour = dt.getHours();
    var date=dt.getDate();
 
    // Check if we are during the event
    if(dt > new Date('9/1/2015 12:00:00 AM') && 
    dt < new Date('9/11/2015 11:59:59 PM') && hour>=16 && hour<=20){
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
    $('.social-feed-container').socialfeed({
      // FACEBOOK
      facebook:{
          accounts: ['@OpenAirPub'],
          limit: 10,
          access_token: 'CAAUuQHFV7vIBAIeUKeqVnxanlsahezGRErtyDxSRRKZC1ajaC1WMiwQxXZByLx6hn3oAdZAXRoRGx3g7jCmSoha7P8TFkorGvJGsJATrvsgrrBJJJRl8ZAWKDCIWNBrg1hk7eIZA4wAmVRjEOw4NL4kWoBkxaAGNdkr5fmlsoK2DwKKzDFiseIVLSKQeATAMZD' // APP_ID|APP_SECRET
      },
      // GENERAL SETTINGS
      length:400,
      show_media:true,
      // Moderation function - if returns false, template will have class hidden
      moderation: function(content){
          return  (content.text) ? content.text.indexOf('fuck') == -1 : true;
      },
      //update_period: 5000,
      // When all the posts are collected and displayed - this function is evoked
      callback: function(){
        tile();
      }
    }); 
  }

  if(onPg("#media")){
    $('.social-feed-container').socialfeed({
      // INSTAGRAM
      instagram:{
          accounts: ['@openairpub'],
          limit:10,
          client_id: 'YOUR_INSTAGRAM_CLIENT_ID'
      },
      // GENERAL SETTINGS
      length:400,
      show_media:true,
      // Moderation function - if returns false, template will have class hidden
      moderation: function(content){
          return  (content.text) ? content.text.indexOf('fuck') == -1 : true;
      },
      //update_period: 5000,
      // When all the posts are collected and displayed - this function is evoked
      callback: function(){
        tile();
      }
    }); 
  }

  if(onPg("#FAQ")){
    smoothScroll.init({
      speed: 500, // Integer. How fast to complete the scroll in milliseconds
      easing: 'easeInOutCubic', // Easing pattern to use
      updateURL: true, // Boolean. Whether or not to update the URL with the anchor hash on scroll
    });
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

function showLightNav(){
  $(".icon-bar").toggleClass("bg-light")
  $(".icon-bar").toggleClass("bg-dark");
  $('.navbar').toggleClass("bg-light");
  $('.main-nav a span').toggleClass("Tc-c");
}
function tile(){
  setTimeout(function() {
    $('.social-feed-container').masonry({
    itemSelector: '.social-feed-element'
      });
  }, 1000);
}
function onPg(element){return $(element).length>0;}

function initMap() {
    var myLatlng = {lat: 45.504739, lng: -73.577176};

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
      
      title: 'Three Bares Park'
    });

    map.addListener('center_changed', function() {
      // 3 seconds after the center of the map has changed, pan back to the
      // marker.
      window.setTimeout(function() {
        map.panTo(marker.getPosition());
      }, 3000);
    });
}

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
