/**
* 作者:z.x.q
* 文件说明:
* Creeated by z.x.q on 2018/5/4
*
*/
<template>
    <div class="InformationList-page">
        <mainHeader></mainHeader>
        <div class="InformationList-con">
            <div class="InformationList-leftcon">
                <div class="InformationList-contitle">
                    <div class="infor-type">资讯类型:</div>
                    <div class="infor-list">
                        <div :class="{'Information-tab':isActive===index}" v-for="(newsType,index) in newsTypes" @click="tabChange(index,newsType.categoryId)" v-text="newsType.categoryName"></div>
                    </div>
                </div>
                <div v-loading="loading" v-if="showPage">
                    <div class="Information-con" v-for="inforList in inforLists" @click="jumpDetail(inforList.id)">
                        <p v-text="inforList.title"></p>
                        <p v-text="inforList.creTime"></p>
                        <p v-text="inforList.digest" class="Informationtext"></p>
                    </div>
                </div>
                <div class="showNone" v-show="showNone">暂时没有更多资讯！</div>
                <div class="Information-conpag">
                    <el-pagination background layout="total, prev, pager, next, jumper" :page-size="pageSize" :total="total" :current-page="currentPage" @current-change="handleCurrentChange">
                    </el-pagination>
                </div>
            </div>
            <div class="InformationList-rightcon">
                <consultant></consultant>
                <div class="shareBox">
                    <img :src="newsListIntroUrl">
                </div>

            </div>
        </div>
        <mainFooter></mainFooter>
    </div>
</template>
<script>
    import { Carousel } from 'element-ui'
    import mainHeader from '../components/mainHeader.vue'
    import mainFooter from '../components/mainFooter.vue'
    import consultant from '../components/contactConsultant.vue'
    import api from '../middleware/api.js'
    import statusCodeManage from '../middleware/statusCodeManage'
    import dateChange from '../plugins/date'

    export default {
        name: 'InformationList',
        components: {
            Carousel,
            mainHeader,
            mainFooter,
            consultant
        },
        head() {
            return {
                title: '贷款新闻,贷款资讯,贷款行业信息-吉帑金服',
                meta: [
                    {
                        hid: 'keywords',
                        name: 'keywords',
                        content:
                            '贷款攻略,贷款咨询,金融资讯,房贷动态,理财咨询,成都贷款平台'
                    },
                    {
                        hid: 'description',
                        name: 'description',
                        content:
                            '教您如何贷款,如何贷款买车及如何贷款买房更划算,更多贷款常见问题和最新贷款利率等信息,帮您快速找到贷款'
                    }
                ]
            }
        },
        data() {
            return {
                newsListIntroUrl: '',
                showNone: false,
                loading: false,
                //              页面显示
                showPage: false,
                radio: 1,
                isActive: true,
                activeCompany: false,
                activeIndustry: false,
                inforLists: [],
                newsTypes: [],
                //              总条数
                total: null,
                //              每页的数量
                pageSize: null,
                //              当前所在页数
                currentPage: 1,
                timestamp: null
            }
        },
        methods: {
            //          新闻类型
            tabChange(typeIndex, typeId) {
                this.isActive = typeIndex
                if (typeId == 'all') {
                    this.init()
                    return
                }
                this.init({ categoryId: typeId })
            },
            //          跳转详情
            jumpDetail(newsId) {
                window.location.href = 'informationDetails.html?id=' + newsId
            },
            //          页码改变
            handleCurrentChange(val) {
                let InformationData = {
                    page: val,
                    rows: '10'
                }
                api.newsList(InformationData).then(
                    res => {
                        this.inforLists = res.body.items
                        this.total = res.body.total
                        this.pageSize = res.body.rows
                    },
                    err => {
                        statusCodeManage.showTipOfStatuCode(err, this)
                    }
                )
            },
            init(obj) {
                this.loading = true
                if (JSON.stringify(obj) === '{}' || obj === undefined)
                    obj = new Object()
                if (!obj.hasOwnProperty('page')) {
                    obj.page = 1
                    obj.rows = 10
                }
                api.newsList(obj).then(
                    res => {
                        if (res.body.items.length > 0) {
                            this.showPage = true
                            this.showNone = false
                        } else {
                            this.showPage = false
                            this.showNone = true
                        }
                        res.body.items.forEach(val => {
                            let creTimes = dateChange(val.date, 'YYYY-MM-DD')
                            val.creTime = creTimes
                        })
                        this.inforLists = res.body.items
                        this.total = res.body.total
                        this.pageSize = res.body.rows
                        this.loading = false
                    },
                    err => {
                        this.loading = false
                        statusCodeManage.showTipOfStatuCode(err, this)
                    }
                )
            }
        },
        mounted() {
            this.newsListIntroUrl = window.sessionStorage.getItem(
                'newsListIntroUrl'
            )
            //           新闻类型tab
            api.newsType({
                page: '1',
                rows: '10'
            }).then(
                res => {
                    this.isActive = 0
                    this.newsTypes = res.body
                    let obj = {
                        categoryName: '不限',
                        categoryId: 'all'
                    }
                    this.newsTypes.unshift(obj)
                },
                err => {
                    statusCodeManage.showTipOfStatuCode(err, this)
                }
            )
            //页面新闻添加
            this.init()
        }
    }
</script>
<style lang="scss">
    .InformationList-page {
        background-color: $backcolor;
        .showNone {
            background-color: $whitecolor;
            padding: 20px 0;
            margin: 20px 0;
            text-align: center;
            color: $themecolor;
        }
        .InformationList-con {
            width: 1180px;
            min-height: 800px;
            padding-top: 80px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
        }
        .InformationList-leftcon {
            .Information-con {
                width: 825px;
                height: 130px;
                padding: 20px 15px 20px 20px;
                border-bottom: 1px solid $divisioncolor;
                background-color: $whitecolor;
                margin: 0 auto;
                transition: all 0.3s;
                &:hover {
                    cursor: pointer;
                    @include listChange();
                }
                p {
                    line-height: 1.4;
                    color: #999;
                    &:first-child {
                        color: #333;
                        font-size: $fontsize18;
                        margin-bottom: 15px;
                        @include ellipsis(100%);
                    }
                    &:nth-child(2) {
                        font-size: $fontsize14;
                        margin-bottom: 20px;
                    }
                }
                .Informationtext {
                    font-size: $fontsize16;
                    @include ellipsisLn(2);
                }
            }
            .InformationList-contitle {
                width: 836px;
                padding: 12px;
                cursor: pointer;
                margin-bottom: 10px;
                font-size: $fontsize16;
                background-color: $whitecolor;
                @include flexLayout(flex-start, flex-start, row);
                /*tab选中样式*/
                .Information-tab {
                    color: $whitecolor;
                    background-color: $themecolor;
                }
                .infor-type {
                    padding: 6px;
                }
                .infor-list {
                    width: 85%;
                    @include flexLayout(flex-start, center, row);
                    flex-wrap: wrap;
                    margin-left: 10px;
                    font-size: $fontsize14;
                    div {
                        margin-right: 10px;
                        padding: 7px;
                        text-align: center;
                        min-width: 40px;
                    }
                }
            }
        }
        .InformationList-rightcon {
            .shareBox {
                width: 300px;
                height: 360px;
                padding-top: 20px;
                border-radius: 12px;
                img {
                    border-radius: 12px;
                    width: 300px;
                    height: auto;
                }
            }
        }
        .Information-conpag {
            width: 100%;
            height: 105px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $whitecolor;
        }
    }
</style>
