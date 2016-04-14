(function($) {
    "use strict";

    var socket = io();
    $('form#send_support_message').submit(function(event) {
        event.stopPropagation();
        var userInput = $('#user_input');
        socket.emit('support', userInput.val()); //get user input
        userInput.val('');                            //clear user input
        return false;
    });

    socket.on("support", function(data) {
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
                '</div>' +
                '<div class="messsage"><i class="fa fa-envelope-o" aria-hidden="true"></i>' +
                "<a href='https://Twitter.com/" + parsedData.user + "'> Contact Me</a></div>";
            return result;
        }
    });
})($);