(function($) {
    "use strict";
    /* TODO: Start your Javascript code here */
        var socket = io();
        $('form').submit(function(event) {
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

    // You may use this for updating new message
    // function messageTemplate(template) {
    //     var result = '<div class="user">' +
    //         '<div class="user-image">' +
    //         '<img src="' + template.user.photo + '" alt="">' +
    //         '</div>' +
    //         '<div class="user-info">' +
    //         '<span class="username">' + template.user.username + '</span><br/>' +
    //         '<span class="posted">' + template.posted + '</span>' +
    //         '</div>' +
    //         '</div>' +
    //         '<div class="message-content">' +
    //         template.message +
    //         '</div>';
    //     return result;
    // }
})($);
