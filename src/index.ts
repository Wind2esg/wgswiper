/**
 * Wechat share link to friends or timeline
 * 
 * @author wind2esg
 * @date 20191015
 * 
 * ez access to wechat share with wechat js sdk centre service
 */

import Swiper from 'swiper';

export default class Wgswiper{
  constructor(){
    // swiper init
    let swiper = new Swiper('.swiper-container',{
      direction: 'vertical',
      virtualTranslate: true,
      followFinger: false,
      on: {
        init:()=>{
          window.onload = function(){
            (window as any).swiperWrapperMove = 0;
            (window as any).swiperWrapperInnerMove = 0;
            (window as any).slideTouchmoveLastY = 0;
            (window as any).swiperWrapperInnerEnd = true;
            (window as any).swiperWrapperBack = 0;
            (window as any).slideLocations = []; 
            let slideCursor: number = 0;

            let collectionSlideHeight: HTMLCollectionOf<Element> = document.getElementsByClassName('slide-height');
            let collectionSwiperSlide: HTMLCollectionOf<Element> = document.getElementsByClassName('swiper-slide');
            
            for(let index = 0; index < collectionSlideHeight.length; index++){
              let swiperSlideHeight: number = collectionSlideHeight[index].clientHeight < window.innerHeight ? window.innerHeight : collectionSlideHeight[index].clientHeight;
              collectionSwiperSlide[index].setAttribute('style', `height:${swiperSlideHeight}px`);
              
              (window as any).slideLocations.push(-slideCursor);
              slideCursor += swiperSlideHeight;
            }

            (swiper.slides as any).on('touchmove', (e: TouchEvent)=>{
                if(swiper.slides[swiper.activeIndex].clientHeight > window.innerHeight){
                  let swiperDiff: number = 0;
                  swiperDiff = e.targetTouches[0].pageY - ((window as any).slideTouchmoveLastY === 0 ? swiper.touches.startY : (window as any).slideTouchmoveLastY);
                  (window as any).slideTouchmoveLastY = e.targetTouches[0].pageY;

                  let slidePrev: boolean = (window as any).swiperWrapperInnerEnd && ((window as any).swiperWrapperInnerMove === 0 && swiperDiff > 0);
                  let slideNext: boolean = (window as any).swiperWrapperInnerEnd && ((window as any).swiperWrapperInnerMove === (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight) && swiperDiff < 0);

                  if(!slidePrev && !slideNext){
                    if((window as any).swiperWrapperInnerMove === 0 && (swiperDiff > 0)){
                      if(swiper.slides[swiper.activeIndex] !== 0){
                        (window as any).swiperWrapperBack = 1;
                        (window as any).swiperWrapperMove += 2;
                      }
                    }else if(((window as any).swiperWrapperInnerMove === (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight)) && (swiperDiff < 0)){
                      if(swiper.slides[swiper.activeIndex] !== swiper.slides.length - 1){
                        (window as any).swiperWrapperBack = -1;
                        (window as any).swiperWrapperMove -= 2;
                      }
                    }else if((window as any).swiperWrapperInnerMove >= 0 && ((window as any).swiperWrapperInnerMove <= (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight))){
                      (window as any).swiperWrapperInnerMove -= swiperDiff;
                      (window as any).swiperWrapperMove += swiperDiff;
                    }if((window as any).swiperWrapperInnerMove < 0){
                      (window as any).swiperWrapperMove += (window as any).swiperWrapperInnerMove;
                      (window as any).swiperWrapperInnerMove = 0;                          
                    }else if((window as any).swiperWrapperInnerMove > (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight)){
                      (window as any).swiperWrapperMove += (window as any).swiperWrapperInnerMove - (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight);
                      (window as any).swiperWrapperInnerMove = swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight;
                    }    
                    document.getElementsByClassName('swiper-wrapper')[0].setAttribute('style', `transform: translate3d(0px, ${(window as any).swiperWrapperMove}px, 0px);`);

                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();  
                  }
                }
            });

            (swiper.slides as any).on('touchend', (e: Event)=>{
              if(swiper.slides[swiper.activeIndex].clientHeight > window.innerHeight){
                if((window as any).swiperWrapperInnerMove === 0 || (window as any).swiperWrapperInnerMove === (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight)){
                  (window as any).swiperWrapperInnerEnd = true;
                }else{
                  (window as any).swiperWrapperInnerEnd = false;
                }                    
                (window as any).slideTouchmoveLastY = 0;
                if((window as any).swiperWrapperBack === -1){
                  (window as any).swiperWrapperMove = (window as any).slideLocations[swiper.activeIndex + 1] + window.innerHeight;
                  document.getElementsByClassName('swiper-wrapper')[0].setAttribute('style', `transform: translate3d(0px, ${(window as any).swiperWrapperMove}px, 0px);transition-duration: 100ms;`);
                }else if((window as any).swiperWrapperBack === 1){
                  (window as any).swiperWrapperMove = (window as any).slideLocations[swiper.activeIndex];
                  document.getElementsByClassName('swiper-wrapper')[0].setAttribute('style', `transform: translate3d(0px, ${(window as any).swiperWrapperMove}px, 0px);transition-duration: 100ms;`);
                }
                (window as any).swiperWrapperBack = 0;
              }
            });
          }
        },
        slideChange: ()=>{
          for (let videoDom of document.getElementsByTagName('video') as any){
            videoDom.pause();
          }
          document.getElementsByClassName('swiper-wrapper')[0].setAttribute('style', `transform: translate3d(0px, ${(window as any).slideLocations[swiper.activeIndex]}px, 0px);transition-duration: 500ms;`);
          (window as any).swiperWrapperMove = (window as any).slideLocations[swiper.activeIndex];
          (window as any).swiperWrapperInnerMove = 0;
          (window as any).slideTouchmoveLastY = 0;
        }
      }
    });
  }
}
      
