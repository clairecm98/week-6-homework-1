// client-side js
// run by the browser each time your view template is loaded

// not sure how to fix this part
$(function() {
    
  fetch('/search-track').then(resp => resp.json()).then((data) => {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /search-track', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the track name
    var trackName = 
      '<h3><a href="' + data.external_urls.spotify + '" target="blank">' + data.name + '</a></h3>'
      //`<h3><a href="${data.external_urls.spotify}">${data.name}</a></h3>`
    ;
    trackName.appendTo('#search-track-container');
    
    // Display the artist name
    var artists = '';
    
    data.artists.forEach(function(item) {
      artists = artists + item.name + ' ';
    });
    
    let h5 = document.createElement('h5');
    h5.innerText = artists;
    document.getElementById('search-track-container').append(h5);
    
    // Display the album art
    //var img = $('<img/>');
    var img = $('<img/>'); // not sure how to change this either
    img.attr('src', data.album.images[0].url);
    img.appendTo('#search-track-container');
  });
  
  //$.get('/category-playlists', function(data) {
  fetch('/category-playlists').then( function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /category-playlists', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // Display the covers of the playlists
    data
      .forEach((c) => {
      //$('#category-playlists-container').append(`<br><h1>${c.name}</h1><br>`)
      var playlistName = '<br><h1>' + c.name + '</h1><br>';
      playlistName.appendTo('#category-playlists-container');
      c.data.playlists.items.map(function(playlist, i) {
      //var img = $('<img class="cover-image"/>');
      var img = document.getElementByClass("cover-image");
      img.attr('src', playlist.images[0].url);
      img.appendTo('#category-playlists-container');
    });
    })
  });
  
  //$.get('/audio-features', function(data) {
  fetch('/audio-features').then( function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /audio-features', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // The audio features we want to show
    var keys = ["danceability", "energy", "acousticness", "speechiness", "loudness"]
    
    // Display the audio features
    // keys.map(function(key, i) {
    //   if (data.hasOwnProperty(key)) {
    //     //var feature = $('<p><span class="big-number">' + data[key] + ' </span>'  + key + '</p>');
    //     var feature = '<p><span class="big-number">' + data[key] + ' </span>'  + key + '</p>';
    //     feature.appendTo('#audio-features-container');
    //   }
    // });
    
    data
      .forEach((a) => {
      var songName = '<br><h1>' + a.name + '</h1><br>';
      songName.appendTo('#audio-features-container');
      keys.map(function(key, i) {
      if (data.hasOwnProperty(key)) {
        //var feature = $('<p><span class="big-number">' + data[key] + ' </span>'  + key + '</p>');
        var feature = '<p><span class="big-number">' + data[key] + ' </span>'  + key + '</p>';
        feature.appendTo('#audio-features-container');
      }
    });
    
  });
  
  //$.get('/artist', function(data) {
  fetch('/artist').then( function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    data
      forEach((a) => {
        
      // Display the artist's image
      //var img = $('<img class="circle-image" />');
      var img = a.getElementByClass("circle-image");
      img.attr('src', a.images[0].url);
      img.appendTo('#artist-container');

      // Display the artist name
      var trackName = '<h3>' + a.name + '</h3>';
      trackName.appendTo('#artist-container');

      // Display the artist's genres
      a.genres.map(function(genre, i) {
      var genreItem = '<p>' + genre + '</p>';
      genreItem.appendTo('#artist-container');
    });
  });
  
  //$.get('/artist-top-tracks', function(data) {
  fetch('/artist-top-tracks').then( function(data) {
    // "Data" is the object we get from the API. See server.js for the function that returns it.
    console.group('%cResponse from /artist-top-tracks', 'color: #F037A5; font-size: large');
    console.log(data);
    console.groupEnd();
    
    // I'm at a loss
    
    // Display the audio features
    data.map(function(track, i) {
      var trackName = '<li>' + track.name + '</li>';
      trackName.appendTo('#top-tracks-container');
    });
  });
});