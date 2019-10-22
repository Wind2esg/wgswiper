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
  public wgswiper: Swiper;

  constructor(customInit?:any){
    let swiperWrapperMove: number = 0;
    let swiperWrapperInnerMove: number = 0;
    let slideTouchmoveLastY: number = 0;
    let swiperWrapperInnerEnd: boolean = true;
    let swiperWrapperBack: number = 0;
    let slideLocations: Array<number> = [];
    
    let WrapperDOM: any;
    for(let child of document.getElementsByClassName('wgswiper-container')[0].children as any){
      for(let className of child.classList as any){
        if(className === 'swiper-wrapper'){
          WrapperDOM = child;
          break;
        }
      }
    }

    let collectionSlideHeight: HTMLCollectionOf<Element> = document.getElementsByClassName('wgswiper-slide-height');
    let collectionSwiperSlide: HTMLCollectionOf<Element> = WrapperDOM.children;

    // swiper init
    let swiper = new Swiper('.wgswiper-container',{
      direction: 'vertical',
      virtualTranslate: true,
      followFinger: false,
      on: {
        init:()=>{
          let initFunc = ()=>{
            let slideCursor: number = 0;
            
            for(let index = 0; index < collectionSlideHeight.length; index++){
              let swiperSlideHeight: number = collectionSlideHeight[index].clientHeight < window.innerHeight ? window.innerHeight : collectionSlideHeight[index].clientHeight;
              collectionSwiperSlide[index].setAttribute('style', `height:${swiperSlideHeight}px`);
              
              slideLocations.push(-slideCursor);
              slideCursor += swiperSlideHeight;
            }

            (swiper.slides as any).on('touchmove', (e: TouchEvent)=>{
                if(swiper.slides[swiper.activeIndex].clientHeight > window.innerHeight){
                  let swiperDiff: number = 0;
                  swiperDiff = e.targetTouches[0].pageY - (slideTouchmoveLastY === 0 ? swiper.touches.startY : slideTouchmoveLastY);
                  slideTouchmoveLastY = e.targetTouches[0].pageY;

                  let slidePrev: boolean = swiperWrapperInnerEnd && (swiperWrapperInnerMove === 0 && swiperDiff > 0);
                  let slideNext: boolean = swiperWrapperInnerEnd && (swiperWrapperInnerMove === (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight) && swiperDiff < 0);

                  if(!slidePrev && !slideNext){
                    if(swiperWrapperInnerMove === 0 && (swiperDiff > 0)){
                      if(swiper.slides[swiper.activeIndex] !== 0){
                        swiperWrapperBack = 1;
                        swiperWrapperMove += 2;
                      }
                    }else if((swiperWrapperInnerMove === (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight)) && (swiperDiff < 0)){
                      if(swiper.slides[swiper.activeIndex] !== swiper.slides.length - 1){
                        swiperWrapperBack = -1;
                        swiperWrapperMove -= 2;
                      }
                    }else if(swiperWrapperInnerMove >= 0 && (swiperWrapperInnerMove <= (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight))){
                      swiperWrapperInnerMove -= swiperDiff;
                      swiperWrapperMove += swiperDiff;
                    }if(swiperWrapperInnerMove < 0){
                      swiperWrapperMove += swiperWrapperInnerMove;
                      swiperWrapperInnerMove = 0;                          
                    }else if(swiperWrapperInnerMove > (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight)){
                      swiperWrapperMove += swiperWrapperInnerMove - (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight);
                      swiperWrapperInnerMove = swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight;
                    }    
                    WrapperDOM.setAttribute('style', `transform: translate3d(0px, ${swiperWrapperMove}px, 0px);`);

                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();  
                  }
                }
            });

            (swiper.slides as any).on('touchend', (e: Event)=>{
              if(swiper.slides[swiper.activeIndex].clientHeight > window.innerHeight){
                if(swiperWrapperInnerMove === 0 || swiperWrapperInnerMove === (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight)){
                  swiperWrapperInnerEnd = true;
                }else{
                  swiperWrapperInnerEnd = false;
                }                    
                slideTouchmoveLastY = 0;
                if(swiperWrapperBack === -1){
                  swiperWrapperMove = slideLocations[swiper.activeIndex + 1] + window.innerHeight;
                  WrapperDOM.setAttribute('style', `transform: translate3d(0px, ${swiperWrapperMove}px, 0px);transition-duration: 100ms;`);
                }else if(swiperWrapperBack === 1){
                  swiperWrapperMove = slideLocations[swiper.activeIndex];
                  WrapperDOM.setAttribute('style', `transform: translate3d(0px, ${swiperWrapperMove}px, 0px);transition-duration: 100ms;`);
                }
                swiperWrapperBack = 0;
              }
            });
          }

          let addOnloadListener = (func: any)=>{
            if(typeof window.onload === 'function'){
              let onload: any = window.onload;
              window.onload = ()=>{
                onload();
                func();
              }
            }else{
              window.onload = func;
            }
          }
          
          addOnloadListener(initFunc);

          customInit && customInit();
        },
        slideChange: ()=>{
          WrapperDOM.setAttribute('style', `transform: translate3d(0px, ${slideLocations[swiper.activeIndex]}px, 0px);transition-duration: 500ms;`);
          swiperWrapperMove = slideLocations[swiper.activeIndex];
          swiperWrapperInnerMove = 0;
          slideTouchmoveLastY = 0;
        }
      }
    });

    this.wgswiper = swiper; 
  }

  getSwiper(): Swiper{
    return this.wgswiper;
  }
}
