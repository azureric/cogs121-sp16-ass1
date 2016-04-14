(function($) {
	"use strict";

	var socket = io();
	$('form#send_anxious_message').submit(function(event) {
        event.stopPropagation();
        var userInput = $('#user_input');
        socket.emit('anxiety', userInput.val()); //get user input
        userInput.val('');                       //clear user input
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
})($);