"use strict";
/**
 * Wechat share link to friends or timeline
 *
 * @author wind2esg
 * @date 20191015
 *
 * ez access to wechat share with wechat js sdk centre service
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swiper_1 = __importDefault(require("swiper"));
class Wgswiper {
    constructor(wgswiper, init) {
        this.wgswiper = wgswiper;
        let swiperWrapperMove = 0;
        let swiperWrapperInnerMove = 0;
        let slideTouchmoveLastY = 0;
        let swiperWrapperInnerEnd = true;
        let swiperWrapperBack = 0;
        let slideLocations = [];
        // swiper init
        let swiper = new swiper_1.default('.swiper-container', {
            direction: 'vertical',
            virtualTranslate: true,
            followFinger: false,
            on: {
                init: () => {
                    let initFunc = () => {
                        let slideCursor = 0;
                        let collectionSlideHeight = document.getElementsByClassName('slide-height');
                        let collectionSwiperSlide = document.getElementsByClassName('swiper-slide');
                        for (let index = 0; index < collectionSlideHeight.length; index++) {
                            let swiperSlideHeight = collectionSlideHeight[index].clientHeight < window.innerHeight ? window.innerHeight : collectionSlideHeight[index].clientHeight;
                            collectionSwiperSlide[index].setAttribute('style', `height:${swiperSlideHeight}px`);
                            slideLocations.push(-slideCursor);
                            slideCursor += swiperSlideHeight;
                        }
                        swiper.slides.on('touchmove', (e) => {
                            if (swiper.slides[swiper.activeIndex].clientHeight > window.innerHeight) {
                                let swiperDiff = 0;
                                swiperDiff = e.targetTouches[0].pageY - (slideTouchmoveLastY === 0 ? swiper.touches.startY : slideTouchmoveLastY);
                                slideTouchmoveLastY = e.targetTouches[0].pageY;
                                let slidePrev = swiperWrapperInnerEnd && (swiperWrapperInnerMove === 0 && swiperDiff > 0);
                                let slideNext = swiperWrapperInnerEnd && (swiperWrapperInnerMove === (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight) && swiperDiff < 0);
                                if (!slidePrev && !slideNext) {
                                    if (swiperWrapperInnerMove === 0 && (swiperDiff > 0)) {
                                        if (swiper.slides[swiper.activeIndex] !== 0) {
                                            swiperWrapperBack = 1;
                                            swiperWrapperMove += 2;
                                        }
                                    }
                                    else if ((swiperWrapperInnerMove === (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight)) && (swiperDiff < 0)) {
                                        if (swiper.slides[swiper.activeIndex] !== swiper.slides.length - 1) {
                                            swiperWrapperBack = -1;
                                            swiperWrapperMove -= 2;
                                        }
                                    }
                                    else if (swiperWrapperInnerMove >= 0 && (swiperWrapperInnerMove <= (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight))) {
                                        swiperWrapperInnerMove -= swiperDiff;
                                        swiperWrapperMove += swiperDiff;
                                    }
                                    if (swiperWrapperInnerMove < 0) {
                                        swiperWrapperMove += swiperWrapperInnerMove;
                                        swiperWrapperInnerMove = 0;
                                    }
                                    else if (swiperWrapperInnerMove > (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight)) {
                                        swiperWrapperMove += swiperWrapperInnerMove - (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight);
                                        swiperWrapperInnerMove = swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight;
                                    }
                                    document.getElementsByClassName('swiper-wrapper')[0].setAttribute('style', `transform: translate3d(0px, ${swiperWrapperMove}px, 0px);`);
                                    e.preventDefault();
                                    e.stopPropagation();
                                    e.stopImmediatePropagation();
                                }
                            }
                        });
                        swiper.slides.on('touchend', (e) => {
                            if (swiper.slides[swiper.activeIndex].clientHeight > window.innerHeight) {
                                if (swiperWrapperInnerMove === 0 || swiperWrapperInnerMove === (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight)) {
                                    swiperWrapperInnerEnd = true;
                                }
                                else {
                                    swiperWrapperInnerEnd = false;
                                }
                                slideTouchmoveLastY = 0;
                                if (swiperWrapperBack === -1) {
                                    swiperWrapperMove = slideLocations[swiper.activeIndex + 1] + window.innerHeight;
                                    document.getElementsByClassName('swiper-wrapper')[0].setAttribute('style', `transform: translate3d(0px, ${swiperWrapperMove}px, 0px);transition-duration: 100ms;`);
                                }
                                else if (swiperWrapperBack === 1) {
                                    swiperWrapperMove = slideLocations[swiper.activeIndex];
                                    document.getElementsByClassName('swiper-wrapper')[0].setAttribute('style', `transform: translate3d(0px, ${swiperWrapperMove}px, 0px);transition-duration: 100ms;`);
                                }
                                swiperWrapperBack = 0;
                            }
                        });
                    };
                    let addOnloadListener = (func) => {
                        if (typeof window.onload === 'function') {
                            let onload = window.onload;
                            window.onload = () => {
                                onload();
                                func();
                            };
                        }
                        else {
                            window.onload = func;
                        }
                    };
                    addOnloadListener(initFunc);
                    init && init();
                },
                slideChange: () => {
                    for (let i = 0; i < document.getElementsByTagName('video').length; i++) {
                        document.getElementsByTagName('video')[i].pause();
                    }
                    document.getElementsByClassName('swiper-wrapper')[0].setAttribute('style', `transform: translate3d(0px, ${slideLocations[swiper.activeIndex]}px, 0px);transition-duration: 500ms;`);
                    swiperWrapperMove = slideLocations[swiper.activeIndex];
                    swiperWrapperInnerMove = 0;
                    slideTouchmoveLastY = 0;
                }
            }
        });
        this.wgswiper = swiper;
    }
    getSwiper() {
        return this.wgswiper;
    }
}
exports.default = Wgswiper;
