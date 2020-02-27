var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $window, $http) {
    var self = $scope;

    self.sortType = ''; // set the default sort type
    self.sortReverse = null;  // set the default sort order
    self.searchMovie = '';     // set the default search/filter term    

    self.catalog = JSON.parse(data);
    self.currentEN = null;
    self.currentPT = null;
    self.currentMovie = null;
    self.currentTitle = null;
    self.tmdb = {
        overview: null,
        vote_average: null,
        genres: null,
        release_date: null,
        original_title: null,
        title: null
    };  

    self.changeMovie = function (folder, tmdb) {  
        self.currentTitle = folder;
        self.currentPT = url + folder + '/portugues.vtt';
        self.currentEN = url + folder + '/english.vtt';
        self.currentES = url + folder + '/espanol.vtt';
        self.currentFR = url + folder + '/francais.vtt';
        self.currentFP = url + folder + '/fp.vtt';
        self.currentMovieMP4 = url + folder + '/movie.mp4'; 
        self.currentMovieMKV = url + folder + '/movie.mkv';

        self.getTmdb(tmdb);
        self.loadVideos();        
    }

    self.getPoster = function (folder) {
        return url + folder + '/poster.jpg';
    }

    self.getTmdb = function (tmdb) {
        //$.ajax({
        //    url: 'https://api.themoviedb.org/3/movie/550?api_key=fab315859353736a9ceb15038771d35e&language=pt-BR',
        //    type: "GET",
        //    dataType: "jsonp",
        //    success: function (data) {
        //        self.tmdb = {
        //            overview: data.overview,
        //            vote_average: data.vote_average,
        //            genres: data.genres,
        //            release_date: data.release_date,
        //            original_title: data.original_title,
        //            title: data.title
        //        };
        //    }
        //});

        $http({
            method: 'GET',
            dataType: 'jsonp',
            url: 'https://api.themoviedb.org/3/movie/' + tmdb +'?api_key=fab315859353736a9ceb15038771d35e&language=pt-BR',                        
            headers: { "Accept": 'application/json', },
        }).then(function (response) {
            var data = response.data;
            self.tmdb = {
                overview: data.overview,
                vote_average: data.vote_average,
                genres: data.genres,
                release_date: data.release_date,
                original_title: data.original_title,
                title: data.title
            };
        }, function (error) {
            //
        });

    }

    self.loadVideos = function (){
        $("video").each(function () {
            $(this).get(0).load();

            $(this).get(0).addEventListener("canplaythrough", function () {
                this.play();
                this.pause();
            });
        });
    }

});

$(document).on('hide.bs.modal', '#myModal', function () {
    $("video").each(function () {
        $(this).get(0).load();

        $(this).get(0).addEventListener("canplaythrough", function () {
            this.play();
            this.pause();
        });
    });
});

app.directive("hermanoFlixTitle", function () {
    return {
        template: "<h1 style=\"color: #b00808; font-size: 100px; font-family: Britannic Bold\">HermanoFlix</h1>"
    };
});

