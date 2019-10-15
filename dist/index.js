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
    constructor() {
        // swiper init
        let swiper = new swiper_1.default('.swiper-container', {
            direction: 'vertical',
            virtualTranslate: true,
            followFinger: false,
            on: {
                init: () => {
                    window.onload = function () {
                        window.swiperWrapperMove = 0;
                        window.swiperWrapperInnerMove = 0;
                        window.slideTouchmoveLastY = 0;
                        window.swiperWrapperInnerEnd = true;
                        window.swiperWrapperBack = 0;
                        window.slideLocations = [];
                        let slideCursor = 0;
                        let collectionSlideHeight = document.getElementsByClassName('slide-height');
                        let collectionSwiperSlide = document.getElementsByClassName('swiper-slide');
                        for (let index = 0; index < collectionSlideHeight.length; index++) {
                            let swiperSlideHeight = collectionSlideHeight[index].clientHeight < window.innerHeight ? window.innerHeight : collectionSlideHeight[index].clientHeight;
                            collectionSwiperSlide[index].setAttribute('style', `height:${swiperSlideHeight}px`);
                            window.slideLocations.push(-slideCursor);
                            slideCursor += swiperSlideHeight;
                        }
                        swiper.slides.on('touchmove', (e) => {
                            if (swiper.slides[swiper.activeIndex].clientHeight > window.innerHeight) {
                                let swiperDiff = 0;
                                swiperDiff = e.targetTouches[0].pageY - (window.slideTouchmoveLastY === 0 ? swiper.touches.startY : window.slideTouchmoveLastY);
                                window.slideTouchmoveLastY = e.targetTouches[0].pageY;
                                let slidePrev = window.swiperWrapperInnerEnd && (window.swiperWrapperInnerMove === 0 && swiperDiff > 0);
                                let slideNext = window.swiperWrapperInnerEnd && (window.swiperWrapperInnerMove === (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight) && swiperDiff < 0);
                                if (!slidePrev && !slideNext) {
                                    if (window.swiperWrapperInnerMove === 0 && (swiperDiff > 0)) {
                                        if (swiper.slides[swiper.activeIndex] !== 0) {
                                            window.swiperWrapperBack = 1;
                                            window.swiperWrapperMove += 2;
                                        }
                                    }
                                    else if ((window.swiperWrapperInnerMove === (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight)) && (swiperDiff < 0)) {
                                        if (swiper.slides[swiper.activeIndex] !== swiper.slides.length - 1) {
                                            window.swiperWrapperBack = -1;
                                            window.swiperWrapperMove -= 2;
                                        }
                                    }
                                    else if (window.swiperWrapperInnerMove >= 0 && (window.swiperWrapperInnerMove <= (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight))) {
                                        window.swiperWrapperInnerMove -= swiperDiff;
                                        window.swiperWrapperMove += swiperDiff;
                                    }
                                    if (window.swiperWrapperInnerMove < 0) {
                                        window.swiperWrapperMove += window.swiperWrapperInnerMove;
                                        window.swiperWrapperInnerMove = 0;
                                    }
                                    else if (window.swiperWrapperInnerMove > (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight)) {
                                        window.swiperWrapperMove += window.swiperWrapperInnerMove - (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight);
                                        window.swiperWrapperInnerMove = swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight;
                                    }
                                    document.getElementsByClassName('swiper-wrapper')[0].setAttribute('style', `transform: translate3d(0px, ${window.swiperWrapperMove}px, 0px);`);
                                    e.preventDefault();
                                    e.stopPropagation();
                                    e.stopImmediatePropagation();
                                }
                            }
                        });
                        swiper.slides.on('touchend', (e) => {
                            if (swiper.slides[swiper.activeIndex].clientHeight > window.innerHeight) {
                                if (window.swiperWrapperInnerMove === 0 || window.swiperWrapperInnerMove === (swiper.slides[swiper.activeIndex].clientHeight - window.innerHeight)) {
                                    window.swiperWrapperInnerEnd = true;
                                }
                                else {
                                    window.swiperWrapperInnerEnd = false;
                                }
                                window.slideTouchmoveLastY = 0;
                                if (window.swiperWrapperBack === -1) {
                                    window.swiperWrapperMove = window.slideLocations[swiper.activeIndex + 1] + window.innerHeight;
                                    document.getElementsByClassName('swiper-wrapper')[0].setAttribute('style', `transform: translate3d(0px, ${window.swiperWrapperMove}px, 0px);transition-duration: 100ms;`);
                                }
                                else if (window.swiperWrapperBack === 1) {
                                    window.swiperWrapperMove = window.slideLocations[swiper.activeIndex];
                                    document.getElementsByClassName('swiper-wrapper')[0].setAttribute('style', `transform: translate3d(0px, ${window.swiperWrapperMove}px, 0px);transition-duration: 100ms;`);
                                }
                                window.swiperWrapperBack = 0;
                            }
                        });
                    };
                },
                slideChange: () => {
                    for (let videoDom of document.getElementsByTagName('video')) {
                        videoDom.pause();
                    }
                    document.getElementsByClassName('swiper-wrapper')[0].setAttribute('style', `transform: translate3d(0px, ${window.slideLocations[swiper.activeIndex]}px, 0px);transition-duration: 500ms;`);
                    window.swiperWrapperMove = window.slideLocations[swiper.activeIndex];
                    window.swiperWrapperInnerMove = 0;
                    window.slideTouchmoveLastY = 0;
                }
            }
        });
    }
}
exports.default = Wgswiper;
