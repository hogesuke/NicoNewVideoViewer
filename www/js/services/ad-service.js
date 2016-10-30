angular.module('videosApp').factory('AdService', [function() {
  return {
    ads: [
      { // DMM FX
        anchorUrl: 'https://px.a8.net/svt/ejp?a8mat=2NVCQ9+2IHY9U+1WP2+63H8H',
        imgUrl   : 'https://www26.a8.net/svt/bgt?aid=161026353152&wid=003&eno=01&mid=s00000008903001024000&mc=1',
        secretUrl: 'https://www10.a8.net/0.gif?a8mat=2NVCQ9+2IHY9U+1WP2+63H8H'
      },
      { // PCMAX
        anchorUrl: 'https://px.a8.net/svt/ejp?a8mat=2NVCQ9+1RPG1U+YQK+6JC81',
        imgUrl   : 'https://www26.a8.net/svt/bgt?aid=161026353107&wid=003&eno=01&mid=s00000004502001098000&mc=1',
        secretUrl: 'https://www19.a8.net/0.gif?a8mat=2NVCQ9+1RPG1U+YQK+6JC81'
      },
      { // ドスパラ スティックPC
        anchorUrl: 'https://px.a8.net/svt/ejp?a8mat=2NVEAB+85IRK2+NTS+NVHCX',
        imgUrl   : 'https://www25.a8.net/svt/bgt?aid=161028371493&wid=003&eno=01&mid=s00000003088004010000&mc=1',
        secretUrl: 'https://www11.a8.net/0.gif?a8mat=2NVEAB+85IRK2+NTS+NVHCX'
      },
      { // ドスパラ BTO
        anchorUrl: 'https://px.a8.net/svt/ejp?a8mat=2C0RZT+BRB9FM+NTS+72EY9',
        imgUrl   : 'https://www26.a8.net/svt/bgt?aid=141124025711&wid=003&eno=01&mid=s00000003088001187000&mc=1',
        secretUrl: 'https://www17.a8.net/0.gif?a8mat=2C0RZT+BRB9FM+NTS+72EY9'
      },
      { // 麻雀ゲーム
        anchorUrl: 'https://px.a8.net/svt/ejp?a8mat=2NVF2Q+5OT6F6+1LX0+614CX',
        imgUrl   : 'https://www25.a8.net/svt/bgt?aid=161029394344&wid=003&eno=01&mid=s00000007506001013000&mc=1',
        secretUrl: 'https://www16.a8.net/0.gif?a8mat=2NVF2Q+5OT6F6+1LX0+614CX'
      },
      { // mobage
        anchorUrl: 'https://px.a8.net/svt/ejp?a8mat=2NVF2Q+5MFG02+2NPU+5ZU29',
        imgUrl   : 'https://www24.a8.net/svt/bgt?aid=161029394340&wid=003&eno=01&mid=s00000012405001007000&mc=1',
        secretUrl: 'https://www10.a8.net/0.gif?a8mat=2NVF2Q+5MFG02+2NPU+5ZU29'
      },
      { // mobage
        anchorUrl: 'https://px.a8.net/svt/ejp?a8mat=2NVF2Q+5MFG02+2NPU+6IP2P',
        imgUrl   : 'https://www27.a8.net/svt/bgt?aid=161029394340&wid=003&eno=01&mid=s00000012405001095000&mc=1',
        secretUrl: 'https://www19.a8.net/0.gif?a8mat=2NVF2Q+5MFG02+2NPU+6IP2P'
      },
      { // ペイントツール
        anchorUrl: 'https://px.a8.net/svt/ejp?a8mat=2NVFUM+FJNIYQ+3AP2+60H7L',
        imgUrl   : 'https://www27.a8.net/svt/bgt?aid=161030398940&wid=003&eno=01&mid=s00000015383001010000&mc=1',
        secretUrl: 'https://www11.a8.net/0.gif?a8mat=2NVFUM+FJNIYQ+3AP2+60H7L'
      },
      { // BTOパソコン FRONTIER
        anchorUrl: 'https://px.a8.net/svt/ejp?a8mat=2NVFUM+F5D4G2+3KX4+639IP',
        imgUrl   : 'https://www26.a8.net/svt/bgt?aid=161030398916&wid=003&eno=01&mid=s00000016708001023000&mc=1',
        secretUrl: 'https://www16.a8.net/0.gif?a8mat=2NVFUM+F5D4G2+3KX4+639IP'
      }
    ],
    pick: function () {
      var adsCount = this.ads.length;
      var index = Math.floor(Math.random() * adsCount);
      return this.ads[index];
    }
  }
}]);
