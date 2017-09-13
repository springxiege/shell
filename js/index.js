$(function(){
  // 检测该视频是否可以播放
  var getVideoCanPlay = function (video){
    return new Promise(resolve => {
      if(!video.readyState){
        video.oncanplay = () => {
          // console.log('play')
          resolve(video)
        }
      }else {
        resolve(video)
      }
    })
  };
  // 监听该视频是否已经播放完
  var VideoPlayEnd = video => new Promise(resolve => {
    var videoMonitor = null;
    videoMonitor = setInterval(() => {
      if(video.ended){
        clearInterval(videoMonitor);
        videoMonitor = null;
        resolve && resolve();
      }
    })
  });
  // 创建滑动组件
  var swiper = new Swiper('.j-video-container-swiper', {
    pagination: '.swiper-pagination',
    direction: 'vertical',
    slidesPerView: 1,
    paginationClickable: false,
    spaceBetween: 30,
    mousewheelControl: true,
    effect: 'fade',
    fade: {crossFade: true},
    onInit: function (){
      var oVideo = document.getElementById('video0');
      getVideoCanPlay(oVideo).then((video) => {
        video.play();
      });
      VideoPlayEnd(oVideo).then(() => {
        $('.j-video-container-swiper').children().find('.swiper-slide-active').find('img').fadeIn('slower');
      })
    },
    onSlideChangeEnd: function(swiper){
      swiper.lockSwipes();
      var isReverse = swiper.activeIndex - swiper.previousIndex < 0;
      var currentVideoIndex = !isReverse ? swiper.activeIndex + 1 : swiper.activeIndex;
      var nextVideo = document.getElementById('video' + swiper.activeIndex);
      var prevVideo = document.getElementById('reversevideo' + swiper.previousIndex);
      $('.j-video-container-swiper').children().find('.swiper-slide').eq(swiper.previousIndex).find('img').hide();
      if(!isReverse){
        $('.videos').find('video').eq(swiper.activeIndex).show().siblings().hide();
        getVideoCanPlay(nextVideo).then(video => {
          video.play();
        });
        VideoPlayEnd(nextVideo).then(() => {
          $('.j-video-container-swiper').find('.swiper-slide-active').find('img').fadeIn('slower');
          swiper.unlockSwipes();
        });
      }else {
        $('.videos').find('.reversevideo').eq(swiper.previousIndex).show().siblings().hide();
        getVideoCanPlay(prevVideo).then(video => {
          video.play();
        });
        VideoPlayEnd(prevVideo).then(() => {
          $('.j-video-container-swiper').find('.swiper-slide-active').find('img').fadeIn('slower');
          swiper.unlockSwipes();
        })
      }
    },
    onTouchMove: function(){
      console.log('move');
    },
    onScroll: function (swiper, e){
      console.log(swiper, e)
    }
  });
  // 高品质燃油动效
  // var swiper2 = new Swiper('.j-inner-container-swiper', {
  //   direction: 'vertical',
  //   slidesPerView: 1,
  //   paginationClickable: false,
  //   spaceBetween: 30,
  //   mousewheelControl: true,
  //   effect: 'fade',
  //   fade: {crossFade: true},
  //   onTransitionEnd: function (){
  //     console.log('111')
  //   } ,
  //   onTouchEnd: function (swiper, e){
  //     // console.log(swiper, e)
  //   }
  // })
})
