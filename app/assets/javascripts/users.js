$(function(){

  function appendUser(user) {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>
                `;
    $('#chat-group-users').append(html);
  }

  function appendNoUser() {
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザーが見つかりません</p>
                </div>
                `;
    $('#chat-group-users').append(html);
  }

  $("#user-search-field").on('keyup',function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      dataType: 'json',
      data: { keyword: input }
    })
      .done(function(users){
        $('#chat-group-users').empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        } else if (input.length == 0) {
          return false;
        } else {
          appendNoUser();
        }
      })
      .fail(function(){
        alert("ユーザー検索に失敗しました");
      });
  });
});