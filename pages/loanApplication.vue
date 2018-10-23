<template>
    <div class="applicationloan-page">
        <!--贷款内容-->
        <mainHeader></mainHeader>
        <div class="application-container">
            <div class="application-leftcon">
                <!--排序-->
                <div class="application-title">
                    <span @click="sortFn('all')">综合排序</span>
                    <span @click="sortFn('loanAmt')" :class="{filterItemActiveDown:query.loanAmt==1,filterItemActiveUp:query.loanAmt==0}">
                        贷款额度(万元)
                        <span class="application-arrow">
                            <i class="el-icon-arrow-up" :class="{filterItemActiveUp:query.loanAmt==0}"></i>
                            <i class="el-icon-arrow-down" :class="{filterItemActiveDown:query.loanAmt==1}"></i>
                        </span>
                    </span>
                    <span @click="sortFn('loanRate')" :class="{filterItemActiveDown:query.loanRate==1,filterItemActiveUp:query.loanRate==0}">
                        月利率
                        <span class="application-arrow">
                            <i class="el-icon-arrow-up" :class="{filterItemActiveUp:query.loanRate==0}"></i>
                            <i class="el-icon-arrow-down" :class="{filterItemActiveDown:query.loanRate==1}"></i>
                        </span>
                    </span>
                    <span @click="sortFn('loanPeriods')" :class="{filterItemActiveDown:query.loanPeriods==1,filterItemActiveUp:query.loanPeriods==0}">
                        贷款期数(月)
                        <span class="application-arrow">
                            <i class="el-icon-arrow-up" :class="{filterItemActiveUp:query.loanPeriods==0}"></i>
                            <i class="el-icon-arrow-down" :class="{filterItemActiveDown:query.loanPeriods==1}"></i>
                        </span>
                    </span>
                    <span @click="sortFn('cycle')" :class="{filterItemActiveDown:query.cycle==1,filterItemActiveUp:query.cycle==0}">
                        办理周期(工作日)
                        <span class="application-arrow">
                            <i class="el-icon-arrow-up" :class="{filterItemActiveUp:query.cycle==0}"></i>
                            <i class="el-icon-arrow-down" :class="{filterItemActiveDown:query.cycle==1}"></i>
                        </span>
                    </span>
                </div>
                <!--产品列表-->
                <div class="applicationloan-product" v-loading="loading" v-if="prodList.length">
                    <div class="applicationloan-details" v-for="(i,index) in prodList" :key="index">
                        <div class="applicationloan-img">
                            <img :src="i.showEles[0].attrs[0].value">
                        </div>
                        <div class="applicationloan-loancon">
                            <p>
                                <span>{{ i.showEles[1].attrs[0].value }}</span>
                                <span class="tagStyle" v-for="(tag,tagIndex) in i.showEles[2].attrs" :key="tagIndex">{{ tag.value }}</span>
                                <!--<span>{{ i.showEles[2].attrs[0].value }}</span>-->
                            </p>
                            <div class="applicationloan-bcon">
                                <div>
                                    <div>{{ i.showEles[3].attrs[0].value }}</div>
                                    <div>{{ i.showEles[4].attrs[0].value }}</div>
                                </div>
                                <div>
                                    <div>{{ i.showEles[5].attrs[0].value }}</div>
                                    <div>{{ i.showEles[6].attrs[0].value }}</div>
                                </div>
                                <div>
                                    <div>{{ i.showEles[7].attrs[0].value }}</div>
                                    <div>{{ i.showEles[8].attrs[0].value }}</div>
                                </div>
                                <div>
                                    <div>{{ i.showEles[9].attrs[0].value }}</div>
                                    <div>{{ i.showEles[10].attrs[0].value }}</div>
                                </div>
                            </div>
                        </div>
                        <el-button type="primary">
                            <nuxt-link tag='span' :to="{path:'/productDetails',query:{prodId:i.unit.prodId}}">查看详情</nuxt-link>
                        </el-button>
                    </div>
                </div>
                <div class="applicationloan-pagination">
                    <el-pagination background layout="total, prev, pager, next, jumper" @current-change="changePage" :current-page="page" :total="total">
                    </el-pagination>
                </div>

            </div>
            <!--找顾问-->
            <div class="application-rightcon">
                <consultant></consultant>
                <div class="shareBox">
                    <img :src="prodListIntroUrl">
                </div>
            </div>
        </div>
        <mainFooter></mainFooter>
    </div>
</template>
<script>
    import mainFooter from '../components/mainFooter.vue'
    import mainHeader from '../components/mainHeader.vue'
    import consultant from '../components/contactConsultant.vue'
    import api from '../middleware/api.js'
    import statusCodeManage from '../middleware/statusCodeManage'

    export default {
        name: 'loanApplication',
        data() {
            return {
                prodListIntroUrl: '',
                loading: false,
                query: {
                    cycle: null,
                    loanAmt: null,
                    loanPeriods: null,
                    loanRate: null
                },
                prodList: [],
                total: null, //数据总条数
                page: 1, //当前页
                rows: null //每页显示个数
            }
        },
        head() {
            return {
                title:
                    '成都贷款,个人贷款,网上贷款,信用卡申请,贷款一站式金融服务平台-吉帑金服',
                meta: [
                    {
                        hid: 'keywords',
                        name: 'keywords',
                        content:
                            '贷款,成都贷款,小额贷款,个人信用贷款,个人住房抵押贷款,车辆抵押贷款,网上贷款,贷款平台'
                    },
                    {
                        hid: 'description',
                        name: 'description',
                        content:
                            '上海吉帑专注于为个人和企业提供各类融资解决方案,个人贷款,小额贷款,银行贷款,汽车贷款,住房贷款,抵押贷款,无抵押贷款和创业贷款等贷款咨询服务'
                    }
                ]
            }
        },
        components: {
            mainHeader,
            mainFooter,
            consultant
        },
        methods: {
            //翻页
            changePage(val) {
                let obj = {
                    page: val,
                    rows: 10,
                    ...this.query
                }
                for (let i in obj) {
                    if (obj[i] == null) {
                        delete obj[i]
                    }
                }
                this.init(obj)
            },
            sortFn(rule) {
                let result = new Object()
                //判断是否为综合排序
                if (rule === 'all') {
                    for (let n in this.query) {
                        this.query[n] = null
                    }
                    this.init()
                    return
                } else {
                    for (let i in this.query) {
                        if (rule === i) continue
                        this.query[i] = null
                    }
                    if (this.query[rule] === null || this.query[rule] === 0) {
                        this.query[rule] = 1
                    } else {
                        this.query[rule] = 0
                    }
                }
                result[rule] = this.query[rule]
                this.init(result)
            },
            goto(prod) {
                let prodId = prod.unit.prodId
                window.location.href = `productDetails.html?prodId=${prodId}`
            },
            init(obj = new Object()) {
                this.loading = true
                if (!obj.hasOwnProperty('page')) {
                    obj.page = 1
                    obj.rows = 10
                }
                api.prodList(obj).then(
                    res => {
                        this.prodList = res.body.items
                        this.total = res.body.total
                        this.page = res.body.page
                        this.rows = res.body.rows
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
            this.init()
            this.prodListIntroUrl = window.sessionStorage.getItem(
                'prodListIntroUrl'
            )
        }
    }
</script>
<style lang="scss">
    .applicationloan-page {
        .filterItemActiveDown {
            color: $themecolor;
        }
        .filterItemActiveUp {
            color: $themecolor;
        }
        .application-container {
            width: 1180px;
            min-height: 800px;
            margin: 0 auto;
            @include flexLayout(flex-start, flex-start, row);
        }
        .application-leftcon {
            padding-top: 80px;
            min-height: 450px;
        }
        .applicationloan-pagination {
            width: 860px;
            height: 104px;
            background-color: $whitecolor;
            @include flexLayout(center, center, row);
        }
        .application-title {
            width: 860px;
            height: 56px;
            line-height: 56px;
            font-size: $fontsize16;
            background-color: $whitecolor;
            @include flexLayout(center, center, row);
            span {
                display: inline-block;
                margin-left: 56px;
                position: relative;
                cursor: pointer;
                &:hover {
                    color: $themecolor;
                }
                span {
                    margin-left: 0;
                    position: absolute;
                    top: 17.5px;
                    right: -16px;
                    color: $minorfontcolor;
                }
                &:nth-child(n + 2) {
                }
                .application-arrow {
                    font-size: 12px;
                    display: inline-block;
                    @include flexLayout(center, center, column);
                }
            }
        }
        .applicationloan-product {
            width: 860px;
            background-color: $whitecolor;
            margin-top: $marginT;
            .applicationloan-details {
                padding: 30px 16px;
                border-bottom: solid 1px $divisioncolor;
                @include flexLayout(flex-start, center, row);
                transition: all 0.3s;
                &:hover {
                    @include listChange();
                }
                .applicationloan-img {
                    width: 160px;
                    height: 120px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .applicationloan-loancon {
                    width: 640px;
                    margin-left: 20px;
                    p {
                        padding-top: 5px;
                        font-size: 12px;
                        .tagStyle {
                            margin-right: 10px;
                            padding: 6px 12px;
                            color: $whitecolor;
                        }
                        span {
                            display: inline-block;
                            background-color: $themecolor;
                            &:first-child {
                                padding-right: 12px;
                                background-color: $whitecolor;
                                font-size: $fontsize18;
                                font-weight: bold;
                            }
                        }
                    }
                    .applicationloan-bcon {
                        margin-top: 20px;
                        @include flexLayout(space-between, center, row);
                        width: 500px;
                        div {
                            text-align: center;
                            div {
                                &:first-child {
                                    font-size: $fontsize14;
                                    color: #999999;
                                }
                                &:last-child {
                                    padding-top: 10px;
                                    font-size: $fontsize24;
                                    color: $redcolor;
                                }
                            }
                        }
                        .el-button {
                            background-color: $themecolor;
                            color: $whitecolor;
                        }
                    }
                }
            }
        }
        .application-rightcon {
            padding-top: 80px;
            margin-left: 20px;
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
        }
    }
</style>
