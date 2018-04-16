// TODO
var PAGE_ACCESS_TOKEN = '';
var WEBHOOK_VERIFY_TOKEN = '';

function doGet(e) {
  var params = e.parameter;
  console.log(params);
  if (params['hub.mode'] === 'subscribe' && params['hub.verify_token'] === WEBHOOK_VERIFY_TOKEN) {
    textOutput = ContentService.createTextOutput(params['hub.challenge']);
    return textOutput;
  }
}

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var entry = data.entry[0];
  if (entry.changes && entry.changes[0].field === 'feed') {
    console.log(entry.changes[0]);
    
    var v = entry.changes[0].value;
    
    if (v['parent_id'] === v['post_id'] && v['item'] === 'comment' && v['verb'] === 'add') {
      var from = v['from'].id;
      var commentID = v['comment_id'];
      var d = new Date();
      var message = '@[' + from + ']';
      message += ['<3', ':)', ':D', '(^^^)', '<(")', '8|', ':v', ':3', '(y)', ':poop:'][(d.getTime())%10];
      var res = postComment(commentID, message);
      console.log(res);
    }
  }
}

function postComment(commentID, message) {
  var commentUrl = 'https://graph.facebook.com/' + commentID + '/comments';
  var commentOptions = {
    'method': 'post',
    'payload': {
      'access_token': PAGE_ACCESS_TOKEN,
      'message': message
    }
  };
    
  return UrlFetchApp.fetch(commentUrl, commentOptions);
}
