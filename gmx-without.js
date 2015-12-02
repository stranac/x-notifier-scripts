/**********************************************************
GMX(without navigator)
**********************************************************/
var name="GMX";
var ver="2015-12-02";
var supportMulti=true;

function init(){
  this.dataURL="http://www.gmx.net/";
  this.loginData=["https://service.gmx.net/de/cgi/login?hal=true","username","password","service=freemail"];
  this.viewURL="http://www.gmx.net/";
}
function getIconURL(){
  return "http://images.gmx.net/images/gmx/favicon.ico";
}
function getCount(aData){
  var fnd=aData.match(/"mailbox_total_inbox":(\d+),/);
  return fnd?fnd[1]:-1;
}

function process(aData,aHttp) {
  switch(this.stage){
  case ST_LOGIN_RES:
    var fnd=aData.match(/'(\/\S+?(?:show|remindlogout)\?\S+?)'/);
    if(fnd){//New UI
      this.viewURL="https://navigator.gmx.net"+(fnd[1].replace(/remindlogout/,"show"));
      this.viewURL0=this.viewURL;
      fnd=this.viewURL.match(/(sid=.+?)(&|$)/);
      if(fnd){
        this.dataURL="https://home.navigator.gmx.net/servicetrinity/data?"+fnd[1];
        this.getHtml(this.viewURL);
        return false;
      }
    }
    break;
  case ST_LOGIN_RES+1:
    var fnd0=aData.match(/JSON\.parse\('(\S+?)'/);
    if(fnd0){
      aData=unescape(fnd0[1].replace(/\\x/g,"%"));      

    var fnd=aData.match(/"mail":\S+?"default":"(\S+?)"/);
    if(fnd){
      this.viewURL=fnd[1].replace(/\\\//g,"/");
      this.keepAliveURL=this.viewURL.replace(/\/start/,"/uas/keepalive");
      this.stage=ST_DATA;
      }else break;
    }else break;
  case ST_DATA:
    this.stage=ST_DATA_RES+1;
    this.getHtml(this.keepAliveURL);
    return true;
  case ST_DATA_RES+1:
    this.getHtml(this.viewURL0);
    return false;
  case ST_DATA_RES+2:
    this.stage=ST_DATA_RES;
    if(aData.match(/nx\.Config\.extend/)){
      this.getHtml(this.dataURL);
      return true;
    }
    break;
  }
  return this.baseProcess(aData,aHttp);
}
