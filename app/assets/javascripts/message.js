$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="upper">
        <div class="sender">
          ${message.user_name}
        </div>
        <div class="date">
          ${message.created_at}
        </div>
      </div>
      <div class="message">
        <p class="lower-message__content">
          ${message.content}
        </p>
        <img src=${message.image}>
      </div>`
     return html;
   } else {
     var html =
      `<div class="upper">
        <div class="sender">
          ${message.user_name}
        </div>
        <div class="date">
          ${message.created_at}
        </div>
      </div>
      <div class="message">
        <p class="lower-message__content">
          ${message.content}
        </p>
      </div>`      
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false,
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat-main__message-list').append(html)
    $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
    $('.form__message').val('')
    $('.form__submit').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
}); 
})
});