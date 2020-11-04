const Parse = require('parse')
Parse.initialize(
  process.env.VUE_APP_ID, 
  process.env.VUE_APP_JS_KEY, 
  process.env.VUE_APP_MASTER_KEY);
//javascriptKey is required only if you have it on server.

Parse.serverURL = process.env.VUE_APP_SERVER_URL

export class AuthApi {
  static login() {
    var user = new Parse.User();
    user.save({
      username: 88888,
      email: 'dsd@mapMutations.ru',
      password: '23232323'
    }).then(function(response) {
      alert('New object create with success! ObjectId: ' + response.id + ', '+ user.get('username'));
    }).catch(function(error) {
      alert('Error: ' + error.message);
    });
  }
}