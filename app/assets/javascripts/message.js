$(function(){

  function buildHtml(message){
    
    if (message.image.url) {
      var html = `<div class="message" data-id="${message.id}">
                  <div class="message__user__info">
                  <p class="message__user__info__name">
                  ${message.user_name}
                  </p>
                  <p class="message__user__info__date">
                  ${message.created_at}
                  </p>
                  </div>
                  <p class="messages__text">
                  ${message.content}
                  </p>
                  <img src="${message.image.url}"  width="200" height="200">
                  </div>`
    }else{
      var html = `<div class="message" data-id="${message.id}">
                  <div class="message__user__info">
                  <p class="message__user__info__name">
                  ${message.user_name}
                  </p>
                  <p class="message__user__info__date">
                  ${message.created_at}
                  </p>
                  </div>
                  <p class="messages__text">
                  ${message.content}
                  </p>`
    }
    return html
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url =$(this).attr("action");
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHtml(message);
      $(".messages").append(html);
      $(".messages").animate({scrollTop:$(".messages")[0].scrollHeight}, 500);
    })
    .fail(function(){
      alert("error");
    })
    .always(function(){
      $(".submit-btn").removeAttr("disabled")
    })
  })
});