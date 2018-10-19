<template>
    <div class="footer-component">
        <div class="box-info">
            <p>地址：成都市高新区府城大道中段88号中航城市广场1栋1304</p>
            <p style="margin-bottom:16px;">邮编：610041</p>
            <p>Copyright ©2009-2018 Moerlong Corporation.All Rights Reserved</p>
            <p>蜀ICP备16029964号川 B -20120039</p>
        </div>
        <div class="qrCode" style="border-right:none;padding-right: 0;">
            <img src="../assets/img/left.jpg">
            <p>扫码关注我们</p>
        </div>
        <div class="qrCode" style="margin-left: 20px;">
            <img src="../assets/img/right.png">
            <p>联系客服</p>
        </div>
        <div class="phoneNum">
            <div class="iconBox">
                <i class="iconfont icon-dianhua"></i>
            </div>
            <div class="phoneInfo">
                <p>全国服务热线(上班时间：09:00-18:30)</p>
                <p>400-820-8828</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'main-footer',
        data() {
            return {};
        },
        mounted() {
        }
    };
</script>

<style lang="scss">
.footer-component {
    @include flexLayout(center, center, row);
    height: 160px;
    background-color: #3a3a3a;
    margin-top: 20px;
    min-width: 1180px;
    .box-info {
        p {
            width: 470px;
            font-size: $fontsize14;
            color: $whitecolor;
            line-height: 22px;
        }
    }
    .qrCode {
        margin-left: 30px;
        padding-right: 48px;
        border-right: 1px solid $divisioncolor;
        img {
            width: 100px;
            height: 100px;
        }
        p {
            width: 100px;
            letter-spacing: 2px;
            margin: 4px 0 0;
            text-align: center;
            font-size: $fontsize12;
            color: $whitecolor;
        }
    }
    .phoneNum {
        @include flexLayout();
        margin-left: 48px;
        .iconBox {
            i {
                color: $whitecolor;
                font-size: 52px;
            }
        }
        .phoneInfo {
            margin-left: 12px;
            p {
                width: 290px;
                &:first-child {
                    font-size: 16px;
                    color: $whitecolor;
                }
                &:last-child {
                    font-size: 24px;
                    color: $whitecolor;
                }
            }
        }
    }
}
</style>


