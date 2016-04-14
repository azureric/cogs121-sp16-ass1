(function($) {
    "use strict";

    var socket = io();
    $('form#send_support_message').submit(function(event) {
        if(!validateForm()) {
            return false;
        }
        event.stopPropagation();
        var userInput = $('#user_input');
        socket.emit('support', userInput.val());
        userInput.val('');

        var radioForm = document.getElementById('#radio-form');
        radioForm.submit();
        window.reload;
        return false;
    });

    socket.on("support", function(data) {
        var parsedData = JSON.parse(data);
        console.log(parsedData);

        var supporterid = '';

        // if(document.getElementById('needSupport').checked) {
        //     var supporterid = 'needSupport';
        // }
        // if(document.getElementById('supporter').checked) {
        //     var supporterid = 'supporter';
        // }
        $('#messages').prepend($('<li class="'+ supporterid +'">').html(messageTemplate(parsedData)));

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

    function validateForm() {
        console.log("!!!");
        var a=document.forms["Form"]["field1"].value;
        if (a=="" ) {
          // alert("Please tell us your feeling");
            sweetAlert("Please tell us about your feelings.");
            return false;
        } else if(a.length > 1000) {
            sweetAlert("We know you have a lot to share. Try connecting with others privately or shorten your message so we can all share the space!" );
            return false;
        } else {
            return true;
        }
    }
})($);