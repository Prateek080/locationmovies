exports.createMessage = function(status,obj,message) {
  var payload = obj;
  if(!obj) payload = {};
  if(payload.constructor === Array){
    payload ={}
    payload.data = obj
  }
  var defaultMessage = '';
  if(status == 401) defaultMessage = 'Unauthorized Access';
  if(status == 200) defaultMessage = 'Ok';
  if(status == 500) defaultMessage = 'Internal Server Error';
  var sendingMessage = {
    status: status,
    message: message || defaultMessage
  }
  var totKeys = Object.keys(payload);
  for(var i = 0; i< totKeys.length;i++){
    sendingMessage[totKeys[i]]= payload[totKeys[i]];
  }
  return sendingMessage;
}
