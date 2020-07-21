$(function(){
  function buildHTML(message){
    // 「もしメッセージに画像が含まれていたら」という条件式
    if (message.image) {
      let html = 
        `<div class="Chat-main__message-list__message-box">
          <div class="Chat-main__message-list__message-box__message-name">
            <div class="Chat-main__message-list__message-box__message-name__user-name">
            ${message.user_name}
            </div>
            <div class="Chat-main__message-list__message-box__message-name__time">
            ${message.created_at}
            </div>
          </div>
          <div class="Chat-main__message-list__message-box__message-word">
            <p class="Message__content">
            ${message.text}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
    } else {
      let html = 
      `
          <div class="Chat-main__message-list__message-box">
          <div class="Chat-main__message-list__message-box__message-name">
            <div class="Chat-main__message-list__message-box__message-name__user-name">
            ${message.user_name}
            </div>
            <div class="Chat-main__message-list__message-box__message-name__time">
            ${message.created_at}
            </div>
          </div>
          <div class="Chat-main__message-list__message-box__message-word">
            <p class="Message__content">
            ${message.text}
            </p>
          
          </div>
     `
    return html;
    };
  }
  $('.Form-box').on('submit',function(e){
    e.preventDefault()
    
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data)
      $('.Chat-main__message-list').append(html);
      $('.Chat-main__message-list').animate({ scrollTop: $('.Chat-main__message-list')[0].scrollHeight });
      $('.Form-box')[0].reset();
      $('.Form-box__submitBtn').prop('disabled', false);
    })
    .fail(function(){
      alert("エラーです")
    });
  })
});