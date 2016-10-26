angular.module('videosApp').factory('AdService', [function() {
  return {
    ads: [
      {
        anchorUrl: 'https://px.a8.net/svt/ejp?a8mat=2NTB30+A1ZM4I+3F2A+60OXD&cid=a13032385546',
        imgUrl   : 'https://www20.a8.net/svt/bgt?aid=160930908608&wid=003&eno=01&mid=s00000015949001011000&mc=1',
        secretUrl: 'https://www14.a8.net/0.gif?a8mat=2NTB30+A1ZM4I+3F2A+60OXD'
      },
      {
        anchorUrl: 'https://px.a8.net/svt/ejp?a8mat=2NTB30+ESV0QQ+3K9S+5ZEMP',
        imgUrl   : 'https://www28.a8.net/svt/bgt?aid=160930908895&wid=003&eno=01&mid=s00000016624001005000&mc=1',
        secretUrl: 'https://www14.a8.net/0.gif?a8mat=2NTB30+ESV0QQ+3K9S+5ZEMP'
      }
    ],
    pick: function () {
      var adsCount = this.ads.length;
      var index = Math.floor(Math.random() * adsCount);
      return this.ads[index];
    }
  }
}]);
