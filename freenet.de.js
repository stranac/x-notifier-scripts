/**********************************************************
freenet.de
**********************************************************/
var name="freenet.de";
var ver="2014-03-22";

function init(){
  this.loginData=["https://auth.freenet.de/portal/login.php","username","password","callback=http%3A%2F%2Ftools.freenet.de%2Fmod_perl%2Flinker%2Ffreenet_startseite_loginkasten_mail%2Fwebmail.freenet.de%2Flogin%2Findex.html"];
  this.dataURL="https://webmail.freenet.de/Overview/View/Index";
  this.viewURL="https://webmail.freenet.de/Overview/View/Index";
}

function getCount(aData){
  var fnd=aData.match(/"id":"INBOX".+?"hasNewItems":(\d+)/);
  if(fnd){
    return fnd[1];
  }else{
    return -1;
  }
}
function process(aData,aHttp) {
  switch(this.stage){
  case ST_LOGIN_RES:
    this.stage=ST_DATA;
  case ST_DATA:
    this.getHtml("https://webmail.freenet.de/Email/View/FolderList","callType=ajax");
    return false;
  }
  return this.baseProcess(aData,aHttp);
}