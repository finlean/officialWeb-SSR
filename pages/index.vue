<template>
    <div class="home-page">
        <mainHeader></mainHeader>
        <el-carousel arrow="never" class="home-swiper" v-if="swiperImgs.length">
            <el-carousel-item v-for="(swiperImg,index) in swiperImgs" :key="index">
                <img :src="'https://t.finlean.com/'+swiperImg.bannerUrl" @click="jumpPage(swiperImg)">
            </el-carousel-item>
        </el-carousel>
        <div class="home-counselor">
            <consultant></consultant>
        </div>
        <div style="width: 100%; background-color: #ffffff">
            <div class="home-con">
                <div class="home-confirstimg" v-if='titleImg.bannerUrl'>
                    <img class="amplification" :src="'https://t.finlean.com/'+titleImg.bannerUrl" ondragstart="return false;" onselectstart="return false;" @click="jumpPage(titleImg)">
                </div>
                <div class="home-conother" v-if="conImgs.length">
                    <div class="grid-content" v-for="(conImg,index) in conImgs" :key="index">
                        <img :src="'https://t.finlean.com/'+conImg.bannerUrl" @click="jumpPage(conImg)">
                    </div>
                </div>
            </div>
        </div>
        <div class="home-footswiper">
            <!--标题文字1-->
            <p>
                <span>合作伙伴</span><br>
                <span style="font-size: 14px;color: #999;">他们和吉帑长期合作</span>
            </p>
            <div class="partner-container">
                <!--整数行-->
                <div class="partner-box">
                    <!-- <span class="partner" v-for="(partnerIcon, index) in partnerIcons" :key="index">
                        <img :src="'https://t.finlean.com'+partnerIcon.url" alt="">
                    </span> -->
                    <span class="partner">
                        <img src="../static/by.png" alt="包银消费金融">
                    </span>
                    <span class="partner">
                        <img src="../static/dr.png" alt="点融">
                    </span>
                    <span class="partner">
                        <img src="../static/jc.png" alt="锦程消费金融">
                    </span>
                    <span class="partner">
                        <img src="../static/js.png" alt="晋商消费金融">
                    </span>
                    <span class="partner">
                        <img src="../static/jx.png" alt="捷信">
                    </span>
                    <span class="partner">
                        <img src="../static/minSheng.png" alt="中国民生银行">
                    </span>
                    <span class="partner">
                        <img src="../static/ms.png" alt="马上消费金额">
                    </span>
                    <span class="partner">
                        <img src="../static/pa.png" alt="平安银行">
                    </span>
                    <span class="partner">
                        <img src="../static/sn.png" alt="苏宁消费金融">
                    </span>
                    <span class="partner">
                        <img src="../static/xy.png" alt="兴业银行">
                    </span>
                    <span class="partner">
                        <img src="../static/za.png" alt="众安保险">
                    </span>
                    <span class="partner">
                        <img src="../static/zy.png" alt="中银消费金融">
                    </span>
                </div>
            </div>
        </div>
        <mainFooter></mainFooter>
    </div>
</template>

<script>
    import mainFooter from '../components/mainFooter.vue';
    import mainHeader from '../components/mainHeader.vue';
    import consultant from '../components/contactConsultant.vue';
    import api from '../middleware/api.js';
    import statusCodeManage from '../middleware/statusCodeManage';
    export default {
        name: 'app',
        components: {
            mainFooter,
            mainHeader,
            consultant
        },
        data() {
            return {
                radio: 'man',
                //轮播
                swiperImgs: [],
                titleImg: {
                    bannerUrl: ''
                },
                conImgs: [],
            }
        },
        methods: {
            jumpPage(item) {
                switch (item.jumpType) {
                    case 0:
                        break;
                    case 1:
                        //站内跳转
                        let jumpUrl = JSON.parse(item.jumpUrl);
                        if (jumpUrl.route === 'productDetails') {
                            window.location.href = `productDetails.html?prodId=${jumpUrl.id}`;
                            break;
                        } else if (jumpUrl.route === 'informationDetails') {
                            window.location.href = `informationDetails.html?id=${jumpUrl.id}`;
                            break;
                        } else {
                            window.location.href = `${jumpUrl.route}.html`;
                            break;
                        }
                    case 2:
                        //站外跳转
                        window.location.href = item.jumpUrl;
                        break;
                    default:
                        //....
                        break;
                }
            },
        },
        created() {
            api.getimg().then(
                res => {
                    res.body.forEach(val => {
                        let bannerType = val.bannerType;
                        if (bannerType == 0) {
                            window.sessionStorage.setItem('qrCodeUrl', val.bannerUrl);
                        } else if (bannerType == 1) {
                            this.swiperImgs.push(val);
                        } else if (bannerType == 2) {
                            this.titleImg = val;
                        } else if (bannerType == 3) {
                            this.conImgs.push(val);
                        } else if (bannerType == 4) {
                            window.sessionStorage.setItem('prodListIntroUrl', val.bannerUrl);
                        } else if (bannerType == 5) {
                            window.sessionStorage.setItem('prodDetailIntroUrl', val.bannerUrl);
                        } else if (bannerType == 6) {
                            window.sessionStorage.setItem('consultantIntroUrl', val.bannerUrl);
                        } else if (bannerType == 7) {
                            window.sessionStorage.setItem('newsListIntroUrl', val.bannerUrl);
                        } else if (bannerType == 8) {
                            window.sessionStorage.setItem('newsDetailsIntroUrl', val.bannerUrl);
                        }
                    });
                },
                err => {
                    statusCodeManage.showTipOfStatuCode(err, this);
                }
            );
        }
    }
</script>

<style lang='scss'>
.home-page {
    min-height: 640px;
    .icon-wenti {
        cursor: pointer;
    }
    img {
        cursor: pointer;
    }
    /*鼠标移动图片放大*/
    .amplification {
        transition: all 0.5s;
        &:hover {
            transform: scale(1.08);
        }
    }

    .el-carousel__button {
        width: 8px;
        height: 8px;
        border-radius: 50%;
    }
    position: relative;
    .home-swiper {
        .el-carousel__container {
            min-width: 1100px;
            height: 480px;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .home-counselor {
        @include flexLayout(flex-end, center, row);
        /*min-width: 1180px;*/
        height: 360px;
        position: absolute;
        top: 85px;
        right: 50%;
        transform: translateX(590px);
        z-index: 10;
    }
    .home-con {
        width: 1180px;
        margin: 0 auto;
        padding-top: $marginB;
        background-color: $whitecolor;
        .home-confirstimg {
            width: 100%;
            height: 420px;
            margin-bottom: $marginB;
            overflow: hidden;
            img {
                width: 100%;
            }
        }
        .home-conother {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
        .grid-content {
            width: 580px;
            height: 326px;
            margin-bottom: $marginB;
            overflow: hidden;
            img {
                transition: 0.5s;
                width: 100%;
                height: 100%;
                &:hover {
                    @include imgChange();
                }
            }
        }
    }
    .home-footswiper {
        width: 100%;
        height: 400px;
        background-color: #ffffff;
        .el-carousel__container {
            width: 902px;
            height: 240px !important;
            text-align: center;
            margin: 0 auto;
        }
        .el-carousel__item {
            width: 902px;
            display: flex;
            flex-wrap: wrap;
            height: 160px;
            line-height: 160px;
        }
        p {
            font-size: 30px;
            color: $themefontcolor;
            text-align: center;
            span {
                display: inline-block;
                &:first-child {
                    margin-top: 66px;
                }
                &:last-child {
                    font-size: 14px;
                    color: $minorfontcolor;
                    margin-bottom: 30px;
                }
            }
        }
        .partner-box {
            @include flexLayout(space-between, center, row);
            flex-wrap: wrap;
            width: 1180px;
            margin: 0 auto;
            .partner {
                width: 179px;
                height: 79px;
                @include flexLayout(center, center, row);
            }
        }
    }
    .checkinput {
        width: 16px;
        height: 16px;
        opacity: 0;
        position: absolute;
        top: -3px;
        left: -3px;
    }
}
</style>
