<template>
    <div class="Informationdetails-page" v-loading="loading">
        <mainHeader></mainHeader>
        <div class="details-page">
            <div>
                <div class="Informationdetails-article">
                    <div class="article-title" v-text="titleText"></div>
                    <div class="article-time" v-text="times"></div>
                    <div class="article-subtitle" v-text="subTitle"></div>
                    <div class="article-tags">
                        <div>关键词：</div>
                        <div v-for="(tag,index) in tags">
                            <span v-text="tag"></span>
                        </div>
                    </div>
                    <div class="article-concent" v-html="articleContent"></div>
                </div>
                <div class="article-page">
                    <p :class="{isActive:'stop-use'}" @click="jumpPages(lastPageId)">上一篇：<span>{{ lastPageName }}</span>
                    </p>
                    <p :class="{isActive:'stop-use'}" @click="jumpPages(nextPageId)">下一篇：<span>{{ nextPageName }}</span>
                    </p>
                </div>
            </div>
            <div class="Informationdetails-rightcon">
                <consultant></consultant>
                <div class="shareBox">
                    <img :src="newsDetailsIntroUrl">
                </div>
                <ul class="article-list" v-if="articleLists.length">
                    <li @click="jumpPages(item.id)" v-for="item in articleLists" v-text="item.title"></li>
                </ul>
            </div>
        </div>
        <mainFooter></mainFooter>
    </div>
</template>

<script>
    import mainHeader from '../components/mainHeader.vue';
    import mainFooter from '../components/mainFooter.vue';
    import consultant from '../components/contactConsultant.vue';
    import api from '../middleware/api';
    import statusCodeManage from '../middleware/statusCodeManage';
    import dateChange from '../plugins/date'

    export default {
        name: 'informationDetails',
        data() {
            return {
                loading: false,
                newsDetailsIntroUrl: '',
                isActive: false,
                article: null,
                articleLists: [],
                titleText: "",
                tags: [],
                subTitle: "",
                articleContent: "",
                times: "",
                lastPageName: '',
                lastPageId: '',
                nextPageName: '',
                nextPageId: '',
            };
        },
        components: {
            mainHeader,
            mainFooter,
            consultant
        },
        methods: {
            init(newsId) {
                this.loading = true;
                api.newsDetails({ newsId: newsId }).then(
                    res => {
                        if (res.body.lastPage !== null) {
                            this.lastPageName = res.body.lastPage.name;
                            this.lastPageId = res.body.lastPage.id;
                        } else {
                            this.lastPageName = "没有上一页了哦";
                            this.lastPageId = '';
                        }
                        if (res.body.nextPage !== null) {
                            this.nextPageName = res.body.nextPage.name;
                            this.nextPageId = res.body.nextPage.id;
                        } else {
                            this.nextPageName = "没有下一页了哦";
                            this.nextPageId = '';
                        }
                        this.subTitle = res.body.digest;
                        this.articleContent = res.body.content;
                        this.titleText = res.body.title;
                        document.title = this.titleText + " 吉帑金服";
                        let metas = document.getElementsByTagName("meta");
                        metas[1].content = this.titleText;
                        metas[2].content = this.subTitle;
                        this.times = "上传时间：" + dateChange(res.body.time, 'YYYY/MM/DD hh:mm:ss');
                        this.tags = res.body.tags;
                        this.articleLists = res.body.recommendList;
                        this.loading = false;
                    },
                    err => {
                        this.loading = false;
                        statusCodeManage.showTipOfStatuCode(err, this);
                    }
                );
            },
            jumpPages(id) {
                if (!id) return;
                this.init(id);
            }
        },
        mounted() {
            this.newsDetailsIntroUrl = window.sessionStorage.getItem('newsDetailsIntroUrl');
            let newsId = this.$route.query.newsId;
            this.init(newsId);
        },
    };
</script>

<style lang="scss">
.Informationdetails-page {
    .details-page {
        width: 1180px;
        margin: 0 auto;
        margin-top: 90px;
        min-height: 687px;
        @include flexLayout(space-between, flex-start, row);
        .Informationdetails-article {
            width: 820px;
            padding: 40px 20px 10px 20px;
            font-size: $fontsize16;
            color: $themefontcolor;
            background-color: $whitecolor;
            .article-title {
                font-size: 28px;
                color: $themefontcolor;
                margin-bottom: 20px;
            }
            .article-time {
                font-size: $fontsize14;
                color: $minorfontcolor;
                margin-bottom: 30px;
            }
            .article-subtitle {
                margin-bottom: 20px;
                font-weight: bold;
            }
            .article-tags {
                @include flexLayout(flex-start, center, row);
                color: $themecolor;
                margin-bottom: 28px;
                div {
                    span {
                        display: inline-block;
                        min-width: 64px;
                        margin-left: 10px;
                        text-align: center;
                    }
                    &:last-child {
                    }
                }
            }
            .article-concent {
                img {
                    width: 100%;
                }
            }
        }
        .Informationdetails-rightcon {
            width: 300px;
            .shareBox {
                width: 300px;
                padding-top: 20px;
                border-radius: 12px;
                img {
                    border-radius: 12px;
                    width: 300px;
                    height: auto;
                }
            }
            .article-list {
                width: 260px;
                padding: 20px;
                color: $themecolor;
                background-color: $whitecolor;
                margin-top: 20px;
                li {
                    list-style: none;
                    padding-bottom: 5px;
                    &:hover {
                        cursor: pointer;
                        text-decoration: underline;
                    }
                }
            }
        }
        .article-page {
            margin-top: 10px;
            p {
                margin-bottom: 10px;
                font-size: $fontsize14;
                padding: 10px;
                background-color: $whitecolor;
                span {
                    color: #5197f8;
                    cursor: pointer;
                    &:hover {
                        text-decoration: underline;
                    }
                }
            }
            .stop-use {
                color: $minorfontcolor;
            }
        }
    }
}
</style>
