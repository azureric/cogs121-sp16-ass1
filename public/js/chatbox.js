(function($) {
    "use strict";
    /* TODO: Start your Javascript code here */
        var socket = io();
        $('form#send_message').submit(function(event) {
            event.stopPropagation();
            var userInput = $('#user_input');
            socket.emit('newsfeed', userInput.val()); //get user input
            userInput.val('');                            //clear user input
            return false;
        });

        socket.on("newsfeed", function(data) {
        var parsedData = JSON.parse(data);
        // grab and parse data and assign it to the parsedData variable.

        // other possible solution(s) here.
        $('#messages').prepend($('<li>').html(messageTemplate(parsedData)));

        function messageTemplate(parsedData) {
          // generate HTML text based on some data to be prepended into the list
          var result = '<div class="user">' +
                '<div class="user-image">' +
                '<img src="' + parsedData.photo + '" alt="">' +
                '</div>' +
                '<div class="user-info">' +
                '<span class="username">' + parsedData.user + '</span><br/>' +
                '<span class="posted">' + parsedData.posted + '</span>' +
                '</div>' +
                '</div>' +
                '<div class="message-content">' +
                parsedData.message +
                '</div>';
            return result;
        }
    });

    // var socket = io();
    $('form#send_anxious_message').submit(function(event) {
        event.stopPropagation();
        var userInput = $('#user_input');
        socket.emit('anxiety', userInput.val()); //get user input
        userInput.val('');                            //clear user input
        return false;
    });
  
    socket.on("anxiety", function(data) {
        var parsedData = JSON.parse(data);

        $('#messages').prepend($('<li>').html(messageTemplate(parsedData)));

        function messageTemplate(parsedData) {
            var result = '<div class="user">' +
                '<div class="user-image">' +
                '<img src="' + parsedData.photo + '" alt="">' +
                '</div>' +
                '<div class="user-info">' +
                '<span class="username">' + parsedData.user + '</span><br/>' +
                '<span class="posted">' + parsedData.posted + '</span>' +
                '</div>' +
                '</div>' +
                '<div class="message-content">' +
                parsedData.message +
                '</div>';
            return result;
        }
    });

    // var socket = io();
    $('form#send_depressed_message').submit(function(event) {
        event.stopPropagation();
        var userInput = $('#user_input');
        socket.emit('depressed', userInput.val()); //get user input
        userInput.val('');                            //clear user input
        return false;
    });

    socket.on("depressed", function(data) {
        var parsedData = JSON.parse(data);

        $('#messages').prepend($('<li>').html(messageTemplate(parsedData)));

        function messageTemplate(parsedData) {
            var result = '<div class="user">' +
                '<div class="user-image">' +
                '<img src="' + parsedData.photo + '" alt="">' +
                '</div>' +
                '<div class="user-info">' +
                '<span class="username">' + parsedData.user + '</span><br/>' +
                '<span class="posted">' + parsedData.posted + '</span>' +
                '</div>' +
                '</div>' +
                '<div class="message-content">' +
                parsedData.message +
                '</div>';
            return result;
        }
    });

    // var socket = io();
    $('form#send_stressed_message').submit(function(event) {
        event.stopPropagation();
        var userInput = $('#user_input');
        socket.emit('stressed', userInput.val()); //get user input
        userInput.val('');                            //clear user input
        return false;
    });

    socket.on("stressed", function(data) {
        var parsedData = JSON.parse(data);

        $('#messages').prepend($('<li>').html(messageTemplate(parsedData)));

        function messageTemplate(parsedData) {
            var result = '<div class="user">' +
                '<div class="user-image">' +
                '<img src="' + parsedData.photo + '" alt="">' +
                '</div>' +
                '<div class="user-info">' +
                '<span class="username">' + parsedData.user + '</span><br/>' +
                '<span class="posted">' + parsedData.posted + '</span>' +
                '</div>' +
                '</div>' +
                '<div class="message-content">' +
                parsedData.message +
                '</div>';
            return result;
        }
    });
})($);
