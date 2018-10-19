/**
* 作者:z.x.q
* 文件说明:
* Creeated by z.x.q on 2018/5/4
*
*/
<template>
    <div class="loanInformation-page">
        <mainHeader></mainHeader>
        <div class="loanInformation-con">
            <div class="loanInformation-leftcon" v-loading="loading" v-if="showPage">
                <div class="Information-con" v-for="(information,index) in informationList">
                    <div>
                        <img :src="'https://t.finlean.com/'+information.imgPath" alt="">
                    </div>
                    <div>
                        <p v-text="information.title"></p>
                        <p v-text="information.digest" class="Informationtext"></p>
                        <el-button>
                            <nuxt-link tag='span' :to='{path:"/informationDetails",query:{newsId:information.id}}'>查看详情</nuxt-link>
                        </el-button>
                    </div>
                </div>
                <nuxt-link tag='div' to='/informationList' class="Information-conpag">
                    更多资讯>>
                </nuxt-link>
            </div>
            <div class="blank" v-show="showNone">暂时没有更多资讯！</div>
        </div>
        <mainFooter></mainFooter>
    </div>
</template>
<script>
    import mainHeader from '../components/mainHeader.vue';
    import mainFooter from '../components/mainFooter.vue';
    import { Carousel } from 'element-ui';
    import api from '../middleware/api.js';
    import statusCodeManage from '../middleware/statusCodeManage';

    export default {
        name: 'loanInformation',
        components: {
            Carousel,
            mainHeader,
            mainFooter
        },
        data() {
            return {
                loading: false,
                radio: 1,
                informationList: null,
                showPage: false,
                showNone: false,
            };
        },
        methods: {
            checkbox() {
            },
            seeMore() {
                window.location.href = 'informationList.html';
            },
            toDetail(newsId) {
                window.location.href = 'informationDetails.html?id=' + newsId;
            }
        },
        mounted() {
            this.loading = true;
            let listData = {
                page: '1',
                rows: '10',
            };
            api.newsList(listData).then(
                res => {
                    this.informationList = res.body.items;
                    if (res.body.items.length > 0) {
                        this.showPage = true;
                    } else {
                        this.showNone = true;
                    }
                    this.loading = false;
                },
                err => {
                    this.loading = false;
                    statusCodeManage.showTipOfStatuCode(err, this);
                }
            );
        }
    };
</script>
<style lang="scss">
.loanInformation-page {
    background-color: $backcolor;

    margin-top: 90px;
    .loanInformation-con {
        width: 1180px;
        min-height: 690px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .blank {
            width: 100%;
            text-align: center;
            height: 12px;
            padding: 20px 0;
            line-height: 12px;
            background-color: $whitecolor;
            margin: 0 auto;
            color: $themecolor;
        }
    }
    .loanInformation-leftcon {
        .Information-conpag {
            height: 100px;
            color: $themecolor;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: $whitecolor;
            font-size: $fontsize18;
        }
        .Information-con {
            width: 1180px;
            box-sizing: border-box;
            @include flexLayout(center, center, row);
            padding: 30px 20px;
            border-bottom: 1px solid $divisioncolor;
            background-color: $whitecolor;
            margin: 0 auto;
            transition: all 0.3s;
            &:hover {
                cursor: pointer;
                @include listChange();
            }
            div {
                margin-right: 20px;
                &:first-child {
                    width: 320px;
                    height: 180px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                &:nth-child(n + 2) {
                    width: 780px;
                    height: 180px;
                    p {
                        &:first-child {
                            margin-bottom: 30px;
                            color: $themefontcolor;
                            font-size: $fontsize18;
                            padding-top: 10px;
                            @include ellipsis(100%);
                        }
                    }
                    .Informationtext {
                        color: $minorfontcolor;
                        font-size: $fontsize16;
                        margin-bottom: 30px;
                        @include ellipsisLn(2);
                    }
                }
                .el-button {
                    width: 120px;
                    color: $whitecolor;
                    font-size: $fontsize16;
                    background-color: $themecolor;
                }
            }
            .Informationtext {
                font-size: $fontsize16;
                @include ellipsisLn(2);
            }
        }
        .loanInformation-contitle {
            width: 820px;
            height: 20px;
            padding: 20px;
            background-color: $whitecolor;
            margin-bottom: 10px;
        }
    }
    .loanInformation-rightcon {
        width: 300px;
        height: 100px;
        background-color: red;
    }
}
</style>
