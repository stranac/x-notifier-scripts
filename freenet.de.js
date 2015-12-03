/**
 * @file X-notifier script for freenet.de
 * @author: stranac <stranac@hotmail.com>
 */
 
var name = 'freenet.de';
var ver = '2015-12-03';

function init() {
  this.loginData = [
    'https://auth.freenet.de/portal/login.php',
    'username',
    'password'
  ];
  this.dataURL='https://webmail.freenet.de/Email/View/FolderList?callType=ajax';
  this.viewURL='https://webmail.freenet.de/cockpit?goTo=email';
}

function getIconURL() {
  return 'https://webmail.freenet.de/cockpit/img/favicon.ico'
}

function getCount(aData) {
  var fnd = aData.match(/"id":"INBOX".+?"hasNewItems":(\d+)/);
  return fnd ? fnd[1] : -1;
}