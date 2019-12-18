$(function() {
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
                    <p class="main-contents__comment--sentence">
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
                    <p class="main-contents__comment--sentence">
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
      $('#message_content').val('');
    })
    .fail(function() {
    })
    .always(function() {
      $('.submit-btn').removeAttr('disabled');
    })
  })
});