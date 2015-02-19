$(function() {

    var getGeo = function() {
        var geo = {};

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            alert('Geolocation is not supported');
        }

        function error(ex) {
            console.log("We couldn't find you!", ex);
        }

        function success(position) {
            geo.lat = position.coords.latitude;
            geo.lng = position.coords.longitude;

            var apiKey = '0aea82cb2d20d5dc';

            var userCoordinates = 'http://api.wunderground.com/api/' + apiKey + '/forecast/geolookup/conditions/q/' + geo.lat + ',' + geo.lng + '.json';

              $.ajax(userCoordinates, {
                  type: 'GET',
                  dataType: 'jsonp',
                  success: function(data) {

                      // if user doesn't enter in both city and province/state
                      if (data.current_observation === undefined) {
                          $('.weather-content').hide();
                          $('.error').text('Please be more specific by entering the city and province.');
                          // return false;
                      } else {

                          //empty out the error string
                          $('.error').text('');

                          //storing the data in variable
                          var w = data.current_observation;

                          var forecast = w.weather;
                          var location = w.display_location.full;
                          var date = w.local_time_rfc822;
                          var dateTime = date.slice(0,16);
                          var temp = w.temp_c;
                          var tempRounded = Math.round(temp);
                          var feelsLike = w.feelslike_c;
                          var feelsRounded = Math.round(feelsLike);
                          var windDirection = w.wind_dir;
                          var windSpeed = w.wind_kph;
                          var windGust = w.wind_gust_kph;
                          var humidity = w.relative_humidity;
                          var precipitation = w.precip_today_metric;

                          // dump string into the divs
                          $('.forecast h2').text(forecast);
                          $('.location h3').text(location);
                          $('.date h3').text(dateTime);
                          $('.degrees').text(tempRounded + '\u2103');
                          $('.feels-like').text('Feels like ' + feelsRounded + '\u2103');
                          $('.details .wds').text('Wind: ' + windDirection + ' ' + windSpeed + ' km/h');
                          $('.details .wg').text('Wind Gust: ' + windGust);
                          $('.details .h').text('Humidity: ' + humidity);
                          $('.details .p').text('Precipitation: ' + precipitation);

                          // display weather icons
                          var getIcons = function(){
                              var iconURL = 'assets/icons/' + forecast.replace(/\s+/g,'').toLowerCase() + '.svg';
                              var icon = $('.icon img').attr('src', iconURL);
                          };

                          // run function to get icons
                          getIcons();
                      }
                  } // end success

              }); // end ajax

        } // end success

    }; // end getGeo

    var getWeather = function(city) {

        var encodedCity = encodeURI(city);
        var apiKey = '0aea82cb2d20d5dc';

        var apiURL = 'http://api.wunderground.com/api/' + apiKey + '/conditions/q/' + encodedCity + '.json';

        $.ajax(apiURL, {
            type: 'GET',
            dataType: 'jsonp',
            success: function(data) {

                // if user doesn't enter in both city and province/state
                if (data.current_observation === undefined) {
                    $('.weather-content').hide();
                    $('.error').text('Please be more specific by entering the city and province.');
                    // return false;
                } else {

                    //empty out the error string
                    $('.error').text('');

                    //storing the data in variable
                    var w = data.current_observation;

                    var forecast = w.weather;
                    var location = w.display_location.full;
                    var date = w.local_time_rfc822;
                    var dateTime = date.slice(0,16);
                    var temp = w.temp_c;
                    var tempRounded = Math.round(temp);
                    var feelsLike = w.feelslike_c;
                    var feelsRounded = Math.round(feelsLike);
                    var windDirection = w.wind_dir;
                    var windSpeed = w.wind_kph;
                    var windGust = w.wind_gust_kph;
                    var humidity = w.relative_humidity;
                    var precipitation = w.precip_today_metric;

                    // dump string into the divs
                    $('.forecast h2').text(forecast);
                    $('.location h3').text(location);
                    $('.date h3').text(dateTime);
                    $('.degrees').text(tempRounded + '\u2103');
                    $('.feels-like').text('Feels like ' + feelsRounded + '\u2103');
                    $('.details .wds').text('Wind: ' + windDirection + ' ' + windSpeed + ' km/h');
                    $('.details .wg').text('Wind Gust: ' + windGust);
                    $('.details .h').text('Humidity: ' + humidity);
                    $('.details .p').text('Precipitation: ' + precipitation);

                    // display weather icons
                    var getIcons = function(){
                        var iconURL = 'assets/icons/' + forecast.replace(/\s+/g,'').toLowerCase() + '.svg';
                        var icon = $('.icon img').attr('src', iconURL);
                    };

                    // run function to get icons
                    getIcons();
                }
            } // end success

        }); // end ajax

    }; // end getWeather


    // get user's geo location, display weather info
    $('.search-current-location').on('click', function(e){
        e.preventDefault();
        getGeo();
        $('header').css('margin', '0 auto');
        $('.weather-content').show();
    });

    // run the function in the form to get city's weather
    $('form.weather-form').on('submit', function(e) {
        e.preventDefault();
        // grabbing the city value from the input in body
        var city = $('input[name="city"]').val();
        getWeather(city);
        // remove margin on header
        $('header').css('margin', '0 auto');
        // display weather info
        $('.weather-content').show();
    }); // end form

}); // end doc ready