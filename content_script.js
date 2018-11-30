$(function () {
  if (items.length == 0) return

  let text = ""
  text = items.join(" ");
  
  $("textarea.compose-text").val("\n" + text);

  let waitSec = 5;
  let spanedSec = 0;

  $(".js-send-button").on("click", function() {
    let id = setInterval(function(){
      spanedSec += 0.5;
      if (spanedSec >= waitSec) {
        clearInterval(id);
	spanedSec = 0;
      }
      if ($("textarea.compose-text").val() == "") {
        $("textarea.compose-text").val("\n" + text);
        spanedSec = 0;
        clearInterval(id);
      }
    }, 500);
  });
});
