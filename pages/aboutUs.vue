<template>
    <div class="aboutus-page">
        <mainHeader></mainHeader>
        <!--banner-->
        <div class="aboutus-bnner"></div>
        <div class="aboutus-introduction">
            <div class="aboutus-con">
                <img src="../assets/img/qiyjj.png" alt="">
                <span>金融行业专业的智慧运营服务商</span>
            </div>
            <div class="aboutus-slogan">
                <span>探索</span>
                <span>超越</span>
                <span>共享</span>
                <span>共担</span>
                <p>金融行业专业的智慧运营服务商</p>
            </div>
            <div class="clearbox"></div>
        </div>
        <div class="aboutus-introduce clearbox ">
            <p>纷领科技（finlean
                tech）是一家专注为金融服务机构、银行、消费金融公司、小额贷款公司等机构提供云端金融技术服务的科技公司。服务涉及金融信贷业务流程系统开发、智慧运营服务、咨询培训服务以及提供全国信贷领域产品、客户信用评估、场景金融、支付等第三方接口服务。公司以”金融行业专业的智慧运营服务商“为使命，以实现客户价值为立足之本，成立两年以来，已为多家银行、消费金融公司及金融服务机构提供业务运营系统、运营支持服务及咨询服务，包括平安银行、成都银行、马上消费金融、晋商消费金融、锦程消费金融等。纷领科技（finlean
                tech）是一家朝气蓬勃的金融科技企业，怀揣远大梦想，脚踏实地前行。希望通过IT技术、数据驱动，融合金融业务运营智慧，为金融业务的推动和发展贡献我们的力量。
            </p>

            <p>
                <h5>我们的使命——做金融行业的智慧运营服务提供商</h5>
                纷领科技（finlean tech）致力于通过SAAS云端服务为国内金融机构及金融服务机构提供更便捷、成本更低的一站式IT技术及智能运营服务，显著提高合作机构的运行效率，驱动业务增长 。
            </p>
        </div>
        <div class="aboutus-show">
            <div class="aboutus-leftshow">
                <div>
                    <img src="../assets/img/load.png" alt="">
                </div>
                <div>
                    <img src="../assets/img/sk.png" alt="">
                </div>
                <div>
                    <img src="../assets/img/tj.png" alt="">
                </div>
                <div>
                    <img src="../assets/img/offer.png" alt="">
                </div>
            </div>
            <div class="aboutus-rightshow">
                <div>
                    <img src="../assets/img/qiywh.png" alt="">
                    <p>探索
                        <span>超越</span>
                    </p>
                    <p>共享
                        <span>共担</span>
                    </p>
                </div>
                <div>
                    <img src="../assets/img/offer.png" alt="">
                </div>
            </div>
        </div>
        <mainFooter></mainFooter>
    </div>
</template>

<script>
    import mainHeader from '../components/mainHeader.vue';
    import mainFooter from '../components/mainFooter.vue';

    export default {
        name: 'aboutUs',
        components: {
            mainHeader,
            mainFooter
        }
    };
</script>
<style lang="scss">
.aboutus-page {
    min-height: 800px;
    .clearbox {
        @include clearfix();
    }
    .aboutus-bnner {
        margin-top: 60px;
        min-width: 1200px;
        height: 240px;
        background-image: url('../assets/img/abouts.png');
        position: relative;
    }
    .aboutus-introduction {
        width: 1200px;
        margin: 0 auto;
        position: absolute;
        top: 160px;
        left: 50%;
        margin-left: -600px;
    }
    .aboutus-con {
        width: 300px;
        height: 240px;
        background-color: #ff6161;
        float: left;
        @include flexLayout(center, center, column);
        span {
            font-size: $fontsize16;
            color: $whitecolor;
        }
    }
    .aboutus-slogan {
        height: 100px;
        float: left;
        color: $whitecolor;
        margin-left: 30px;
        margin-bottom: 30px;
        span {
            display: inline-block;
            margin: 30px 0 0 10px;
            font-size: $fontsize24;
            position: relative;
            &:before {
                content: '';
                display: inline-block;
                width: 7px;
                height: 6px;
                background-color: $whitecolor;
                border-radius: 50%;
                position: absolute;
                top: 14px;
                left: -10px;
            }
        }
    }
    .aboutus-introduce {
        font-size: $fontsize14;
        width: 873px;
        position: absolute;
        top: 320px;
        left: 50%;
        margin-left: -273px;
        margin-bottom: 37px;
        p {
            line-height: 2;
        }
        h5 {
            font-size: $fontsize16;
            margin-top: 60px;
            margin-bottom: 5px;
        }
    }
    .aboutus-show {
        width: 1200px;
        margin: 0 auto;
        margin-top: 335px;
        @include flexLayout(space-between, center, row);
        .aboutus-leftshow {
            width: 800px;
            @include flexLayout(space-between, center, row);
            flex-wrap: wrap;
            div {
                width: 395px;
                height: 300px;
                &:nth-child(1),
                &:nth-child(2) {
                    margin-bottom: 10px;
                }
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .aboutus-rightshow {
            width: 390px;
            height: 610px;
            margin-left: 10px;
            background-color: $themecolor;
            div {
                height: 50%;
                width: 100%;
                color: $whitecolor;
                &:first-child {
                    @include flexLayout(center, center, column);
                    p {
                        font-size: $fontsize24;
                        margin: 25px 0 10px 0;
                        span {
                            display: inline-block;
                            margin-left: 60px;
                            position: relative;
                            &:before {
                                content: '';
                                display: inline-block;
                                width: 8px;
                                height: 8px;
                                background-color: $whitecolor;
                                border-radius: 50%;
                                position: absolute;
                                top: 14px;
                                left: -31px;
                            }
                        }
                    }
                }
                &:last-child {
                    width: 100%;
                    height: 50%;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
}
</style>
