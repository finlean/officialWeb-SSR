<template>
    <div class="consultant-component home-counselorBox">
        <p style="color:#333">
            <span>找顾问</span>
            <el-tooltip class="left" effect="dark" content="请留下您的姓氏和手机号，我们将安排最专业的贷款顾问与您联系！" placement="left-end">
                <span class="iconfont icon-wenti"></span>
            </el-tooltip>
        </p>
        <div class="home-checkcon">
            <el-input v-model="userName" auto-complete="off" :maxlength="4" placeholder="您的姓名"></el-input>
            <el-radio v-model="gender" label="1">男</el-radio>
            <el-radio v-model="gender" label="0">女</el-radio>
            <el-input v-model="userMblNo" auto-complete="off" :maxlength="11" placeholder="请输入手机号"></el-input>
            <div class="verification">
                <el-input v-model="verCode" auto-complete="off" :maxlength="6" placeholder="请输入短信验证码"></el-input>
                <el-button @click="getVerCode" :disabled="canNotClickVerCodeBtn" type="primary">{{ verCodeText }}
                </el-button>
            </div>
            <el-input v-model="loanAmt" auto-complete="off" placeholder="贷款金额（万元）"></el-input>
            <el-button @click="sendBut" :loading="loadingBtn" type="primary">联系贷款顾问</el-button>
        </div>
    </div>
</template>

<script>
    import validate from '../plugins/validator';
    import api from '../middleware/api';
    import md5 from 'md5';
    import statusCodeManage from '../middleware/statusCodeManage';

    export default {
        data() {
            return {
                verCodeText: '获取验证码',
                canNotClickVerCodeBtn: false,
                timeOut: null,
                loadingBtn: false,
                userName: '',
                gender: '1',
                userMblNo: '',
                verCode: '',
                loanAmt: '',
            };
        },
        props: ['advisorId', 'QRCodeUrl', 'clearInfo'],
        watch: {
            clearInfo(oldVal, newVal) {
                if (!newVal) {
                    clearInterval(this.timeOut);
                    this.verCodeText = '获取验证码';
                    this.canNotClickVerCodeBtn = false;
                    this.userName = '';
                    this.gender = '1';
                    this.userMblNo = '';
                    this.verCode = '';
                    this.loanAmt = '';
                }
            }
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
                        clearInterval(this.timeOut);
                        this.verCodeText = '获取验证码';
                        this.canNotClickVerCodeBtn = false;
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
                let loanAmtReg = /^([1-9]\d{0,3})(\.\d{1,4})?$/;
                if (!loanAmtReg.test(this.loanAmt) || Number(this.loanAmt) > 500) {
                    this.$message.error('请输入正确的贷款金额，贷款额度应该在1-500万以内！');
                    return;
                }
                this.loadingBtn = true;
                let obj = {
                    userName: this.userName,
                    gender: this.gender,
                    userMblNo: this.userMblNo,
                    verCode: this.verCode,
                    loanAmt: this.loanAmt * 10000,
                };
                if (this.advisorId) obj.advisorId = this.advisorId;
                api.consultManager(obj).then(
                    res => {
                        this.loadingBtn = false;
                        this.$confirm('申请成功，稍后贷款顾问会电话与您联系，请保持手机号畅通，谢谢！', '成功', {
                            confirmButtonText: '确定',
                            showCancelButton: false,
                            type: 'success',
                        });
                        clearInterval(this.timeOut);
                        this.verCodeText = '获取验证码';
                        this.canNotClickVerCodeBtn = false;
                        this.userName = '';
                        this.gender = '1';
                        this.userMblNo = '';
                        this.verCode = '';
                        this.loanAmt = '';
                        this.$emit('closeDialog', false);
                    },
                    err => {
                        this.loadingBtn = false;
                        statusCodeManage.showTipOfStatuCode(err, this);
                    }
                )
            }
        }
    }
</script>

<style lang='scss'>
.home-counselorBox {
    width: 300px;
    height: 360px;
    background-color: rgba(255, 255, 255, 0.9);
    p {
        @include flexLayout(space-between, center, row);
        padding: 20px;
        box-sizing: border-box;
        span {
            font-size: 24px;
            &:first-child {
                color: #000;
            }
            &:last-child {
                font-size: 24px;
            }
        }
    }
    .home-checkcon {
        padding: 0 20px 10px 20px;
    }
    .icon-wenti {
        color: $themecolor;
    }
    .el-input {
        .el-input__inner {
            height: 36px;
            line-height: 36px;
            margin-bottom: 20px;
        }
        &:first-child {
            width: 50%;
        }
    }
    .el-button {
        font-size: 16px;
        width: 100%;
        background-color: $themecolor;
        border-color: $themecolor;
        font-family: 微软雅黑;
    }
    .verification {
        margin-bottom: 20px;
        @include flexLayout(space-between, center, row);
        .el-button {
            width: 88px;
            padding: 10px;
            font-size: 14px;
        }
        .el-input__inner {
            margin-bottom: 0;
            width: 155px;
        }
    }
}
</style>


