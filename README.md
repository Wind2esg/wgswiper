# wgswiper  
[![Build Status](https://img.shields.io/npm/l/wgswiper)](https://www.npmjs.com/package/wgswiper)
[![Build Status](https://img.shields.io/npm/v/wgswiper)](https://www.npmjs.com/package/wgswiper)
[![Build Status](https://img.shields.io/npm/dm/wgswiper)](https://www.npmjs.com/package/wgswiper)

**wgswiper** is based on the [Swiper](https://github.com/nolimits4web/swiper).

We often customize some h5 with full screen slide function.  
It is easy with swiper.  
However, if some of those pages are too long and too short, sometime `autoHeight` doesn't help.

Don't cry, HERO comes!

wgswiper provide self-adaption pages swiper for you. Evenmore, a slide lock is offered too, which means when you scroll up or down in the long page, the page won't slide at first time reaching end.   

If the page is too short, set its height to as the window.
If the page is too long, no problem. Feel free to scroll in it and the lock will make sure you can read all content of the page. Then slide as usual.

Ez use.

> So far, only vertical mode and have no other options.

## v2 COMES
**NOW** nested swiper can be used in wgswiper!
> If the nested swiper's `direction` is `'vertical'` too, set its `nested` to `true`.

## tips
+ Swiper's css is NOT necessary. But you may need`body { width: 100%; height: 100%; overflow: hidden;}
+ Set followFinger false and set virtualTranslate true to cancel swiper's translate and touchevent.
+ Init slide's height with .swiper-height's clientheight when page loaded.
+ When onSlide, adjust wrapper css accroding to slide's height to slide.
+ When in those long page, cancel swiper's touchevent and scroll. Add event handler to deal with scroll in the page. declare a lock to protect from sliding when first hit the page edge. Springback will affect if there's next page.
+ If used `window.onload`. Do as `addOnloadListener()`.
+ `getSwiper()` return swiper object. How to use it? Refer to [official api doc](https://swiperjs.com/api/)
 

## useage
install  
`npm i -S wgswiper`  

```
<div class="wgswiper-container">
    <div class="swiper-wrapper">
        <div class="swiper-slide">
            <div class="wgswiper-slide-height">
                //content
            </div>
        </div>
    </div>
</div>
```

```
new Wgswiper();                    

new Wgswiper(()=>{

    // do whatever you want when the swiper init
    // this is THE ONLY WAY you can add init handler
    // for more, https://swiperjs.com/api/#events

}));      

let wgswiper = new Wgswiper().getSwiper();

// add other event handles
// init NOT allowed here 
// for more, https://swiperjs.com/api/#events  

wgswiper.on('slideChange',()=>{
    // do whatever you want
})
```

## link
Looking for a H5 template with wgswiper and wechat share?

[H5 with swiper, wechat share](https://github.com/wind2esg/h5-swiper-weixin-share)