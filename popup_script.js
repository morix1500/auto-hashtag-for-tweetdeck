//----------------------
$(function () {
  chrome.runtime.sendMessage({method: 'getSettings'}, function (response) {
    if (response.settings) {
      let settings = response.settings;

      if (("enable" in settings) == false) {
        $("input[name='enable']:eq(0)").prop('checked', true);
      } else if (settings.enable == "2") {
        $("input[name='enable']:eq(1)").prop('checked', true);
      } else {
        $("input[name='enable']:eq(0)").prop('checked', true);
      }

      if (settings.items.length == 0) return;

      for (let i = 0; i < settings.items.length; i++) {
        if (i == 0) {
          $("input[name='item[]'").eq(0).val(settings.items[i]);
        } else {
          addItem(settings.items[i]);
        }
      }
    } else {
      $("input[name='enable']:eq(0)").prop('checked', true);
    }
  });
  $("#save").on("click", function() {
    save();
  });
  $("#add").on("click", function() {
    addItem("");
  });
  $(document).on("click", ".remove", function() {
    $(this).parents("li").remove();
  });
});

function addItem(value) {
  let item = '<li><div class="field has-addons">';
  item += '<div class="control"><input class="input" type="text" placeholder="item" name="item[]" value="'+ value +'"></div>'
  item += '<div class="control"><button class="button is-black remove"><i class="fa fa-trash"></i></button></div>';
  item += '</div></li>'

  $(".list").append(item);
}

function save() {
  let obj = {};
  obj.enable = $("input[name='enable']:checked").val();

  let items = $("input[name='item[]']")
  if (items.length == 0) {
    alert("At least one registration is required");
    return;
  }

  obj.items = [];
  for (let i = 0; i < items.length; i++) {
    let item = items.eq(i).val();
    if (item == "") continue;
    item = decodeURIComponent(item);
    obj.items[i] = item;
  }

  chrome.runtime.sendMessage({method: 'setSettings', settings: obj}, function (response) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.reload(tabs[0].id, null, null);
    });
  });
}

function escapeHtml(str){
  str = str.replace(/&/g, '&amp;');
  str = str.replace(/>/g, '&gt;');
  str = str.replace(/</g, '&lt;');
  str = str.replace(/"/g, '&quot;');
  str = str.replace(/'/g, '&#x27;');
  str = str.replace(/`/g, '&#x60;');
  return str;
}
