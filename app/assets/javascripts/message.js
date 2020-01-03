$(function() {
  var reloadMessages = function() {
    last_message_id = $('.main-contents__comment--sentence:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main-contents').append(insertHTML);
        $('.main-contents').animate({ scrollTop: $('.main-contents')[0].scrollHeight});
        $('#new_message')[0].reset();
        $('.submit-btn').prop("disabled", false);
      }
    })
    .fail(function() {
      alert("メッセージの更新に失敗しました");
    });
  };
  

  function buildHTML(message) {
    if (message.image) {
      var html = `<div class="main-contents__post">
                    <div class="main-contents__post--name">
                      ${message.user_name}
                    </div>
                    <div class="main-contents__post--date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="main-contents__comment">
                    <p class="main-contents__comment--sentence" data-message-id="${message.id}">
                      ${message.content}
                    </p>
                    <img class="main-contents__comment--image" src="${message.image}" alt="Images">
                  </div>`
    } else {
      var html = `<div class="main-contents__post">
                    <div class="main-contents__post--name">
                      ${message.user_name}
                    </div>
                    <div class="main-contents__post--date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="main-contents__comment">
                    <p class="main-contents__comment--sentence"  data-message-id="${message.id}">
                      ${message.content}
                    </p>
                  </div>`
      }
      return html;
  }

  $("#new_message").on('submit',function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
      url: $(this).attr('action'),
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var html = buildHTML(message);
      $('.main-contents').append(html);
      $('.main-contents').animate({ scrollTop: $('.main-contents')[0].scrollHeight});
      $('#new_message')[0].reset();
    })
    .fail(function() {
      alert("メッセージの送信に失敗しました");
    })
    .always(function() {
      $('.submit-btn').removeAttr('disabled');
    })
  })

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});