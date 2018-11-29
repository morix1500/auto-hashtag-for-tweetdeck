$(function () {
  if (items.length == 0) return

  let text = ""
  text = items.join(" ");
  
  $("textarea.compose-text").val("\n" + text);
});
