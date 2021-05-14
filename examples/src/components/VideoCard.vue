<template>
    <div class="card-wrapper video-card-display">
        <div class="card-container">
            <div class="card-pic">
                <img :src="cover" alt="" />
                <div class="mask"></div>
                <div class="play-img">
                    <img class="btn-play" src="../assets/bf-di.png" />
                </div>
            </div>
            <div class="card-cover">
                <div class="title">
                    {{ title }}
                </div>
                <!-- footer -->
                <div class="flex items-center footer">
                    <div class="flex items-center tags">
                        <!-- <div v-for="(tag,idx) in item.tags" :key="idx" class="tag">
                        <div :style="{background: tag.color, opacity: tag.clarity/100}" class="bg"></div>
                        <div class="content">
                            <span>{{tag.text}}</span>
                        </div>
                    </div> -->
                    </div>
                    <div style="flex: 1"></div>
                    <div>
                        {{ collectionCount }}次播放<span
                            style="margin-left: 0.05rem; margin-right: 0.05rem"
                            >|</span
                        >{{ formatedDuration }}
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-center card-info">
            <img class="avatar" :src="avatar" />
            <div class="name">{{ authorName }}</div>
            <div style="margin-left: 0.2rem">
                <!-- <img v-if="item.isFollow==0" @click="onFollowBtnClicked" style="height: .36rem;" src="../assets/follow.png" alt="">
            <img v-else-if="item.isFollow==1" style="height: .36rem;" src="../assets/followed.png" alt=""> -->
            </div>
            <div style="flex: 1"></div>
            <div>分享{{ shareCount }}次</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => { }
        },
        title: {
            type: String,
            default: "标题"
        },
        cover: {
            type: String,
            default: ''
        },
        duration: {
            type: Number,
            default: 0
        },
        collectionCount: {
            type: Number,
            default: 0
        },
        shareCount: {
            type: Number,
            default: 0
        },
        avatar: {
            type: String,
            default: ''
        },
        authorName: {
            type: String,
            default: ''
        },
        index: {
            type: Number,
            default: 0
        },
    },
    computed: {
        formatedDuration() { // 格式化的时间
            let m = Math.floor((this.duration / 60) % 60);
            let s = Math.floor(this.duration % 60);
            m = m > 9 ? m : ('0' + m)
            s = s > 9 ? s : ('0' + s)
            return m + ":" + s
        }
    },
    methods: {

    }
}
</script>
<style lang="stylus" scoped>
.flex 
    display: flex;
    align-items: center;
.icon-play
    background: url('//aimg.tangdou.com/cdn/assets/hotrank/play_tip_icon.png') no-repeat
    background-size: 100% 100%
    display: inline-block
    height: 0.28rem
    width: 0.23rem
.icon-zan
    background: url('https://aimg.tangdou.com/cdn/assets/share/icon_zan.png') no-repeat
    background-size: 100% 100%
    display: inline-block
    height: 0.25rem
    width: 0.28rem
.card-wrapper
    position: relative
    .card-container
        position: relative
        .card-pic
            height: 4.22rem
            position: relative
            width: 100%
            img
                height: 100%
                width: 100%
            .mask
                background-image: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 39%, rgba(0, 0, 0, 0) 62%, #000000 100%)
                height: 100%
                left: 0
                opacity: 0.5
                position: absolute
                top: 0
                width: 100%
            .play-img
                height: 100%
                left: 0
                position: absolute
                top: 0
                width: 100%
                .btn-play
                    height: 0.8rem
                    left: 50%
                    margin-left: -0.4rem
                    margin-top: -0.4rem
                    position: absolute
                    top: 50%
                    width: 0.8rem
        .card-cover
            height: 100%
            left: 0
            position: absolute
            top: 0
            width: 100%
            .title
                box-sizing: border-box
                color: #FFFFFF
                display: -webkit-box
                font-family: PingFangSC-Medium
                font-size: 0.44rem
                font-weight: bold
                height: 1.4rem
                letter-spacing: 0
                line-height: 1.4
                overflow: hidden
                padding: 0.2rem
                text-overflow: ellipsis
                text-shadow: 0 0 4px rgba(0, 0, 0, 0.4)
                -webkit-box-orient: vertical
                -webkit-line-clamp: 2
            .footer
                bottom: 0.2rem
                box-sizing: border-box
                color: #FFFFFF
                font-size: 0.24rem
                left: 0
                padding-left: 0.2rem
                padding-right: 0.2rem
                position: absolute
                width: 100%
                .tags
                    .tag
                        box-sizing: border-box
                        color: #FFFFFF
                        font-size: 0.24rem
                        margin-left: 0.05rem
                        margin-right: 0.05rem
                        position: relative
                        text-align: center
                        .bg
                            border-radius: 0.1rem
                            height: 100%
                            left: 0
                            position: absolute
                            top: 0
                            width: 100%
                        .content
                            padding: 0.01rem 0.1rem
                            position: relative
                            text-align: center
    .card-info
        box-sizing: border-box
        font-size: 0.24rem
        height: 1rem
        padding-left: 0.21rem
        padding-right: 0.16rem
        .avatar
            border-radius: 100%
            height: 0.7rem
            width: 0.7rem
        .name
            color: #666666
            font-family: PingFangSC-Regular
            font-size: 0.28rem
            letter-spacing: 0
            margin-left: 0.2rem
            max-width: 3.2rem
            overflow: hidden
            padding-top: 0.02rem
            text-overflow: ellipsis
            white-space: nowrap
        .extra-num
            color: #666666
            font-size: 0.3rem
</style>