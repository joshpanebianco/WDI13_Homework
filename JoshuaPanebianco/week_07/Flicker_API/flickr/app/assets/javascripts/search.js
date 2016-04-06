$(document).ready(function () {

  var currentPage = 1;

  var searchFlickr = function (term) {
    var flickrURL = 'https://api.flickr.com/services/rest/?jsoncallback=?';
    $.getJSON(flickrURL, {
      // You can find additional params to add here in the docs
      method: 'flickr.photos.search',
      api_key: '2f5ac274ecfac5a455f38745704ad084',
      text: term,
      format: 'json',
      page: currentPage
      // page: 2
    }).done(function (data) {
      for (var i = 0; i < data.photos.photo.length; i++) {
        var url = generateURL(data.photos.photo[i]);
        displayPhoto(url);
      }
    });
  };

  var displayPhoto = function (url) {
    var $img = $('<img>', {src: url});
    $img.appendTo('#results');
  };

  var generateURL = function (photo) {
    return [
      'http://farm',
      photo.farm,
      '.static.flickr.com/',
      photo.server,
      '/',
      photo.id,
      '_',
      photo.secret,
      '_q.jpg' // Different codes here select different image sizes
    ].join('');
  };

  $('#search').on('submit', function (e) {
    e.preventDefault();

    var query = $('#query').val();
    $('#results').empty();
    searchFlickr(query);

  });

  $(window).on('scroll', function () {
    var pixelsFromBottom =
      $(document).height() -
      ( $(window).scrollTop() + $(window).height() );

    var fetchThreshold = 500;

    if (pixelsFromBottom < fetchThreshold) {
      console.log('near the bottom, HINT: SEARCH FLICKR MORE HERE');
      currentPage += 1;
      console.log( currentPage );
      searchFlickr( currentPage+1);
    };

  });

});
