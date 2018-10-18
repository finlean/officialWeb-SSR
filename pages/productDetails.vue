<template>
    <div class="productDetails-page" v-if="JSON.stringify(prodInfo)!=='{}'">
        <mainHeader></mainHeader>
        <div class="product-container">
            <div class="product-left">
                <!--产品标题-->
                <div class="product-bigloan">
                    <span>{{ prodInfo.components[0].name }}</span>
                </div>
                <div class="product-type">
                    <div class="product-hexagon" v-for="(i,index) in prodIconContentArr" :key="index">
                        <div class="product-hexagontop">
                            <i class="iconfont" :class="i.icon"></i>
                        </div>
                        <p>{{ i.content }}</p>
                    </div>
                </div>
                <!--产品信息-->
                <div class="product-information">
                    <p class="product-informationtitle">{{ prodInfo.components[1].name }}</p>
                    <div class="product-informationde">
                        <p v-for="i in prodIntroTextArr">{{ i }}</p>
                    </div>
                </div>
                <div class="product-information" style="margin-top: 0">
                    <p class="product-informationtitle" style="margin-top:0;">{{ prodInfo.components[2].name }}</p>
                    <div class="product-informationde">
                        <p v-for="i in applicationRules">{{ i }}</p>
                    </div>
                </div>
                <div class="product-applyinformation">
                    <p class="product-applytitle">{{ prodInfo.components[3].name }}</p>
                    <div class="product-apply">
                        <div>
                            <img :src="prodInfo.components[3].showEles[0].attrs[0].value">
                        </div>
                    </div>
                </div>
                <div class="product-information" style="margin-top: 0">
                    <p class="product-informationtitle">产品申请</p>
                    <div class="product-strategy">
                        <div>
                            <el-input v-model="userName" :maxlength="4" placeholder="您的姓名"></el-input>
                            <el-radio v-model="gender" label="1">男</el-radio>
                            <el-radio v-model="gender" label="0">女</el-radio>
                            <el-input v-model="userMblNo" :maxlength="11" placeholder="请输入手机号"></el-input>
                            <div class="notecode">
                                <el-input v-model="verCode" :maxlength="6" class="code" placeholder="短信验证码"></el-input>
                                <el-button @click="getVerCode" :disabled="canNotClickVerCodeBtn" class="getcode">
                                    {{ verCodeText }}
                                </el-button>
                            </div>
                            <el-button @click="sendBut" :loading="loadingBtn" class="onceapply">立即申请</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-right">
                <consultant></consultant>
                <div class="shareBox">
                    <img :src="prodDetailIntroUrl">
                </div>
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
    import md5 from 'md5';
    import statusCodeManage from '../middleware/statusCodeManage';
    import validate from '../plugins/validator';

    export default {
        name: 'productDetails',
        components: {
            mainHeader,
            mainFooter,
            consultant
        },
        data() {
            return {
                prodId: '',
                prodDetailIntroUrl: '',
                verCodeText: '获取验证码',
                canNotClickVerCodeBtn: false,
                timeOut: null,
                loadingBtn: false,
                userName: '',
                gender: '1',
                userMblNo: '',
                verCode: '',
                prodIconContentArr: [],
                prodInfo: {},
                prodIntroTextArr: [],
                applicationRules: [],
            };
        },
        methods: {
            getVerCode() {
                if (!validate.checkPhone(this.userMblNo)) {
                    this.$message.error('请输入正确的电话号码！');
                    return;
                }
                this.canNotClickVerCodeBtn = true;
                let timeOut = 60;
                this.verCodeText = `60s后重发`;
                this.timeOut = setInterval(() => {
                    if (timeOut === 0) {
                        this.verCodeText = '重发验证码';
                        clearInterval(this.timeOut);
                        this.canNotClickVerCodeBtn = false;
                    } else {
                        timeOut--;
                        this.verCodeText = `${timeOut}s后重发`;
                    }
                }, 1000);
                let anonySign = `jttech_ver_code_sign_75a7_${this.userMblNo}_getVerCode`;
                api.getVerCode({ mblNo: this.userMblNo, verCodeType: 0, anonySign: md5(anonySign) }).then(
                    res => {
                        this.$message.success('验证码已发送!');
                    },
                    err => {
                        statusCodeManage.showTipOfStatuCode(err, this);
                    }
                );
            },
            sendBut() {
                let area = window.sessionStorage.getItem('position');
                if (!area) {
                    this.$alert("定位城市失败！请在上方手动选择城市!", {
                        confirmButtonText: '确定',
                    });
                    return;
                }
                let reg = /^[\u4e00-\u9fa5]{1,4}$/;
                if (!reg.test(this.userName)) {
                    this.$message.error('请输入您的真实姓名！');
                    return;
                }
                if (!validate.checkPhone(this.userMblNo)) {
                    this.$message.error('请输入正确的电话号码！');
                    return;
                }
                let varCodeReg = /^\d{4}$/;
                if (!varCodeReg.test(this.verCode)) {
                    this.$message.error('请输入正确的验证码！');
                    return;
                }
                this.loadingBtn = true;
                let obj = {
                    userName: this.userName,
                    gender: this.gender,
                    userMblNo: this.userMblNo,
                    verCode: this.verCode,
                    prodId: this.prodId
                };
                api.consultManager(obj).then(
                    res => {
                        this.loadingBtn = false;
                        this.$confirm('申请成功，稍后贷款顾问会电话与您联系，请保持手机号畅通，谢谢！', '成功', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'success',
                        });
                        this.userName = '';
                        this.gender = '1';
                        this.userMblNo = '';
                        this.verCode = '';
                        clearInterval(this.timeOut);
                        this.verCodeText = '获取验证码';
                        this.canNotClickVerCodeBtn = false;
                    },
                    err => {
                        this.loadingBtn = false;
                        statusCodeManage.showTipOfStatuCode(err, this);
                    }
                )
            },
            //字体图标和标签的组装
            getTags(startArr, endArr) {
                let iconArr = [], contentArr = [], resultArr = [];
                startArr.forEach((val, index) => {
                    if (index % 2 === 0) {
                        iconArr.push(val.attrs[0].value);
                    } else {
                        contentArr.push(val.attrs[0].value);
                    }
                });
                iconArr.forEach((val, index) => {
                    let obj = {};
                    obj.icon = val;
                    obj.content = contentArr[index];
                    resultArr.push(obj);
                });
                console.log(resultArr);
                this[endArr] = JSON.parse(JSON.stringify(resultArr));
            },
            //文字内容的组装
            getInfo(startArr, endArr) {
                let titleArr = [], contentArr = [], resultArr = [];
                startArr.forEach((val, index) => {
                    if (index % 2 === 0) {
                        titleArr.push(val.attrs[0].value);
                    } else {
                        contentArr.push(val.attrs[0].value);
                    }
                });
                titleArr.forEach((val, index) => {
                    resultArr.push(`${val}${contentArr[index]}`);
                });
                this[endArr] = JSON.parse(JSON.stringify(resultArr));
            }
        },
        mounted() {
            this.prodDetailIntroUrl = window.sessionStorage.getItem('prodDetailIntroUrl');
            this.prodId = window.location.search.slice(1).split('=')[1];
            api.prodDetail({ prodId: this.prodId }).then(
                res => {
                    this.prodInfo = res.body;
                    //字体图标和描述的组装
                    this.getTags(res.body.components[0].showEles, 'prodIconContentArr');
                    //产品信息的组装
                    this.getInfo(res.body.components[1].showEles, 'prodIntroTextArr');
                    //申请条件的组装
                    this.getInfo(res.body.components[2].showEles, 'applicationRules');
                },
                err => {
                    statusCodeManage.showTipOfStatuCode(err, this);
                }
            )
        }
    };
</script>

<style lang="scss">
@import '../assets/iconfont/iconfont.css';
.productDetails-page {
    min-height: 800px;
    padding-top: 90px;
    .product-container {
        width: 1180px;
        margin: 0 auto;
        @include flexLayout(flex-start, flex-start, row);
        .product-left {
            width: 860px;
            // background-color: $whitecolor;
            .product-bigloan {
                width: 100%;
                font-size: $fontsize24;
                background-color: $whitecolor;
                padding: 16px 20px;
                box-sizing: border-box;
                border-bottom: solid 1px $divisioncolor;
            }
            .product-type {
                background-color: $whitecolor;
                @include flexLayout(flex-start, center, row);
                .product-hexagon {
                    width: 33.3%;
                    height: 206px;
                    @include flexLayout(center, center, column);
                    p {
                        margin-top: 10px;
                    }
                    /*六边形*/
                    .product-hexagontop {
                        width: 95px;
                        height: 110px;
                        line-height: 110px;
                        text-align: center;
                        background-image: url('../assets/img/liu.png');
                        background-repeat: no-repeat;
                        i {
                            font-size: 60px;
                            color: $whitecolor;
                        }
                    }
                }
            }
            .product-strategy {
                @include flexLayout(center, center, row);
                width: 100%;
                height: 330px;
                background-color: $whitecolor;
                div {
                    width: 240px;
                    .el-input {
                        height: 36px;
                        margin-bottom: 20px;
                        &:first-child {
                            width: 120px;
                        }
                    }
                    .el-input__inner {
                        height: 36px;
                    }
                    .notecode {
                        width: 100%;
                        height: 36px;
                        margin-bottom: 30px;
                        .code {
                            width: 142px;
                            height: 36px;
                        }
                        .getcode {
                            width: 88px;
                            padding: 0;
                            height: 36px;
                            font-size: $fontsize14;
                        }
                    }

                    .el-button {
                        font-size: $fontsize16;
                        background-color: $themecolor;
                        color: $whitecolor;
                    }

                    .onceapply {
                        width: 100%;
                        margin-left: 0;
                    }
                }
            }
            .product-information {
                width: 100%;
                margin-top: $marginT;
                color: $themefontcolor;
                box-sizing: border-box;
                background-color: $whitecolor;
                .product-informationtitle {
                    height: 46px;
                    padding: 10px 20px;
                    line-height: 46px;
                    margin-top: $marginB;
                    font-size: $fontsize18;
                    border-bottom: $borderB;
                }
                .product-informationde {
                    width: 100%;
                    padding: 0 20px;
                    @include flexLayout(center, flex-start, column);
                    p {
                        margin-top: 30px;
                        font-size: $fontsize16;
                        &:last-child {
                            margin-bottom: 30px;
                        }
                    }
                }
            }
            .product-applyinformation {
                width: 100%;
                height: 330px;
                background-color: $whitecolor;
                .product-applytitle {
                    height: 46px;
                    padding: 10px 20px;
                    line-height: 46px;
                    text-align: left;
                    font-size: $fontsize18;
                    border-bottom: $borderB;
                }
            }
            .product-apply {
                width: 100%;
                height: 264px;
                @include flexLayout(center, center, row);
                div {
                    width: 820px;
                    height: 240px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
        .product-right {
            width: 300px;
            height: 320px;
            margin-left: 20px;
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
    }
}
</style>
