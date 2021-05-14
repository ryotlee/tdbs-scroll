<template>
    <div id="app">
        <Pullscroller
            ref="scroller"
            @pullDown="onPulldownHandler"
            @pullUp="onPullupHandler"
            @scrollEnd="onScrollendHandler"
        >
            <div slot="content">
                <div>
                    <VideoCard
                        @click.native="onVideoCardClicked(item)"
                        v-for="(item, index) in videoList"
                        :title="item.data.content.data.title"
                        :avatar="item.data.content.data.author.icon"
                        :authorName="item.data.content.data.author.name"
                        :cover="item.data.content.data.cover.feed"
                        :collectionCount="
                            item.data.content.data.consumption.collectionCount
                        "
                        :shareCount="
                            item.data.content.data.consumption.shareCount
                        "
                        :duration="item.data.content.data.duration"
                        :key="index"
                    >
                    </VideoCard>
                </div>
            </div>
        </Pullscroller>
    </div>
</template>

<script>

import Pullscroller from '../../src/TangdouScroll'
import VideoCard from './components/VideoCard'

export default {
    name: 'App',
    components: {
        Pullscroller,
        VideoCard
    },
    data () {
        return {
            videoList: [],
            nextPageApi: ''
        }
    },
    async created () {
        this.refreshList()
    },
    mounted () {

    },
    methods: {
        async refreshList () {
            let res = await this.fetchVideoList("/api/v5/index/tab/feed")
            this.nextPageApi = res.nextPageUrl.replace("http://baobab.kaiyanapp.com/", "")
            if (res.itemList && res.itemList.length > 0) {
                this.videoList = res.itemList.filter((item) => {
                    return item.type == 'followCard'
                })
            }
        },
        async fetchVideoList (apiUrl) { // 获取视频列表
            let res = await this.$axios.get(apiUrl)
            if (res.status == 200) {
                return res.data
            } else {
                return null
            }
        },
        onScrollendHandler () { // 页面滚动停止，可以上曝光事件
            console.log("滑动结束")
        },
        async onPulldownHandler (done) { // 下拉刷新数据
            await this.refreshList()
            this.$nextTick(() => {
                done && done()
            })
        },
        async onPullupHandler (done) { // 上拉加载数据
            let _list = await this.nextPageData()
            this.$nextTick(() => {
                // 是否还有更多数据
                let _isHasMore = _list.length > 0 ? true : false
                done && done(_isHasMore)
            })
        },
        async nextPageData () {
            let result = []
            let res = await this.$axios.get(this.nextPageApi)
            if (res.status == 200) {
                this.nextPageApi = res.data.nextPageUrl.replace("http://baobab.kaiyanapp.com/", "")
                if (res.data.itemList && res.data.itemList.length > 0) {
                    let _list = res.data.itemList.filter((item) => {
                        return item.type == 'followCard'
                    })
                    result = _list
                    this.videoList = this.videoList.concat(_list)
                }
            } else {
                console.log("加载失败")
            }
            return result;
        },
        onVideoCardClicked (item) {
            console.log("点击", item)
        }
    }
}
</script>

<style>
@import url(./assets/css/reset.css);
</style>
<style lang="stylus" scoped>
.btab
    background-color: #999
    display: inline-block
    display: flex
    flex-direction: row
    flex-wrap: nowrap
    height: 40px
    list-style: none
    overflow: hidden
    overflow-x: scroll /* 1 */
    position: relative
    transition: 0.5s
    white-space: nowrap
    width: 1600px
    li
        box-sizing: border-box
        display: block
        flex-basis: 100px
        flex-shrink: 0
        padding: 10px
        white-space: nowrap
        width: 100px
</style>