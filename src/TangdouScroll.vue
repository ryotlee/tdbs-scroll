<template>
    <div class="scroll-container">
        <div class="pull-scroller">
            <div ref="scroll" class="pull-wrapper">
                <div class="pull-content">
                    <!-- 下拉刷新 -->
                    <div class="pulldown-wrapper">
                        <template v-if="beforePullDown">
                            <div class="dou"></div>
                            <div class="lbl">
                                <p>下拉刷新</p>
                                <p>精彩马上呈现</p>
                            </div>
                        </template>
                        <template v-else>
                            <div class="dou anim"></div>
                            <div class="lbl">
                                <p v-show="isPullingDown">刷新中...</p>
                                <p v-show="!isPullingDown">刷新完成</p>
                                <p>精彩马上呈现</p>
                            </div>
                        </template>
                    </div>
                    <!-- content -->
                    <div class="pull-body">
                        <slot name="content"> </slot>
                    </div>

                    <!-- 上拉加载 -->
                    <div v-show="hasMore" class="pullup-tips">
                        <div v-if="!isPullUpLoad" class="before-trigger">
                            <span class="pullup-txt">上拉加载更多</span>
                        </div>
                        <div v-else-if="isPullingUp" class="after-trigger">
                            <span class="pullup-txt">加载中...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import BScroll from '@better-scroll/core'
import PullDown from '@better-scroll/pull-down'
import PullUp from '@better-scroll/pull-up'
import NestedScroll from '@better-scroll/nested-scroll'
//
BScroll.use(PullDown)
BScroll.use(PullUp)
BScroll.use(NestedScroll)

const TIME_BOUNCE = 800
const THRESHOLD = 70
const STOP = 56

export default {
    data () {
        return {
            beforePullDown: true,
            isPullingDown: false,
            isPullingUp: false,
            isPullUpLoad: false,
            bscroll: null,
            innerScroll: null,
            hscrollMaps: {},
            hasMore: false,
        }
    },
    mounted () {
        this.initBscroll()
    },
    beforeDestroy () {
        this.bscroll && this.bscroll.destroy()
        for (const key in this.hscrollMaps) {
            if (Object.hasOwnProperty.call(this.hscrollMaps, key)) {
                const _bsScroll = this.hscrollMaps[key];
                _bsScroll.destroy()
            }
        }
    },
    methods: {
        initBscroll () {
            this.bscroll = new BScroll(this.$refs.scroll, {
                pullUpLoad: true,
                scrollY: true,
                bounceTime: TIME_BOUNCE,
                useTransition: false,
                pullDownRefresh: {
                    threshold: THRESHOLD,
                    stop: STOP
                },
                preventDefault: false,
                click: true,
                freeScroll: true,
                eventPassthrough: 'horizontal'
            })
            // 注册事件监听
            this.bscroll.on('pullingDown', this.pullingDownHandler)
            this.bscroll.on('pullingUp', this.pullingUpHandler)
            // this.bscroll.on('scroll', this.scrollHandler)
            this.bscroll.on('scrollEnd', () => {
                // 监听元素曝光可以用该事件
                this.$emit("scrollEnd")
            })
        },
        initNestedScrolls (el, groupId = 1) {
            if (!this.hscrollMaps[groupId]) {
                this.hscrollMaps[groupId] = new BScroll(el, {
                    nestedScroll: {
                        groupId: groupId // string or number
                    },
                    scrollX: true,
                    freeScroll: true,
                    eventPassthrough: 'vertical'
                })
            }
        },
        async pullingDownHandler () {
            this.beforePullDown = false
            this.isPullingDown = true
            // 加载数据
            this.$emit("pullDown", this.finishPullDown)
        },
        async pullingUpHandler () {
            this.isPullUpLoad = true
            this.isPullingUp = true
            this.hasMore = true
            // 刷新数据
            this.$emit('pullUp', this.finishePullUp)
        },
        async finishPullDown () {
            this.isPullingDown = false
            this.bscroll.finishPullDown()
            setTimeout(() => {
                this.beforePullDown = true
                this.bscroll.refresh()
            }, TIME_BOUNCE + 100)
        },
        async finishePullUp (hasMore) {
            this.hasMore = hasMore
            this.bscroll.finishPullUp()
            this.bscroll.refresh()
            this.isPullUpLoad = false
            this.isPullingUp = false
        }
    }
}
</script>

<style>
html {
    overflow: hidden;
}
* {
    -webkit-touch-callout: none; /*系统默认菜单被禁用*/
    -webkit-user-select: none; /*webkit浏览器*/
    -khtml-user-select: none; /*早期浏览器*/
    -moz-user-select: none; /*火狐*/
    -ms-user-select: none; /*IE10*/
    user-select: none;
}
</style>

<style lang="stylus" scoped>
.scroll-container
    height: 100vh
    overflow: hidden
    width: 100%
.pull-scroller
    height: 100vh
    position: relative
    .pull-wrapper
        height: 100%
        overflow: hidden
        position: relative
.pull-content
    .pulldown-wrapper
        align-items: center
        box-sizing: border-box
        color: #ccc
        display: flex
        font-size: 0.28rem
        height: 50px
        justify-content: center
        padding: 20px
        position: absolute
        text-align: center
        transform: translateY(-100%) translateZ(0)
        width: 100%
        .dou
            background: url('//static.tangdou.com/cdn/assets/public/img/refresh1@2x.png')
            background-size: 100% 100%
            height: 40px
            width: 40px
            &.anim
                animation: dou 1s infinite
        .lbl
            margin-left: 10px
            p
                line-height: 1.4
                text-align: left
    .pullup-tips
        color: #999
        font-size: 0.28rem
        padding: 20px
        text-align: center
    .pull-body
        overflow: hidden
@keyframes dou
    0%
        background: url('//static.tangdou.com/cdn/assets/public/img/refresh1@2x.png')
        background-size: 100% 100%
    20%
        background: url('//static.tangdou.com/cdn/assets/public/img/refresh2@2x.png')
        background-size: 100% 100%
    40%
        background: url('//static.tangdou.com/cdn/assets/public/img/refresh3@2x.png')
        background-size: 100% 100%
    60%
        background: url('//static.tangdou.com/cdn/assets/public/img/refresh4@2x.png')
        background-size: 100% 100%
    80%
        background: url('//static.tangdou.com/cdn/assets/public/img/refresh5@2x.png')
        background-size: 100% 100%
    100%
        background: url('//static.tangdou.com/cdn/assets/public/img/refresh1@2x.png')
        background-size: 100% 100%
</style>