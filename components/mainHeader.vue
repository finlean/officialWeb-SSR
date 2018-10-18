<template>
    <div class="header-component" :class="{'header-active':isActive}">
        <nuxt-link tag='div' to='/' class="logo">
            <img v-if="isActive" src="../assets/img/logo.png">
            <img v-if="!isActive" src="../assets/img/logoActive.png">
        </nuxt-link>
        <!-- 定位的开始================================================ -->
        <el-popover trigger="click" v-model="showPopover" @show="ifShowPopover" placement="bottom-start">
            <div>
                <el-menu default-active="openCity" @select="handleOpen" class="el-menu-demo" mode="horizontal">
                    <el-menu-item index="openCity">开通城市</el-menu-item>
                    <el-menu-item index="arrAtoF">ABCDEF</el-menu-item>
                    <el-menu-item index="arrGtoM">GHJKLM</el-menu-item>
                    <el-menu-item index="arrNtoS">NOPQRS</el-menu-item>
                    <el-menu-item index="arrTtoZ">TUWXYZ</el-menu-item>
                </el-menu>
                <div class="open-city" v-show="showOpenCity">
                    <!--<span v-for="(i,index) in openCity" @click="changeCity(i)" :key="index">{{ i.name }}</span>-->
                    <div class="city-item" v-for="(i,index) in showOpenCityArr" :key="index">
                        <div class="city-tag">{{ i.tag }}</div>
                        <div class="city-list">
                            <span v-for="(position,num) in i.cities" @click="changeCity(position)" :key="num">{{ position.name }}</span>
                        </div>
                    </div>
                </div>
                <div class="all-city" v-show="!showOpenCity">
                    <div class="city-item" v-for="(i,index) in showCity" :key="index">
                        <div class="city-tag">{{ i.tag }}</div>
                        <div class="city-list">
                            <span v-for="(position,num) in i.cities" @click="changeCity(position)" :key="num">{{ position.name }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="position-box" @click="ifShowPopover" slot="reference">
                <i class="iconfont icon-ico1"></i>
                <span>{{ positionText }}</span>
            </div>
        </el-popover>
        <!-- 定位的结束================================================ -->
        <div class="header-item-box">
            <div :class="{isCurrentPage:currentPage===1}">
                <nuxt-link to="/loanApplication" tag='span'>贷款申请</nuxt-link>
            </div>
            <div :class="{isCurrentPage:currentPage===2}">
                <nuxt-link to="/productConsultant" tag='span'>贷款顾问</nuxt-link>
            </div>
            <div :class="{isCurrentPage:currentPage===3}">
                <nuxt-link to="/loanInformation" tag='span'>贷款资讯</nuxt-link>
            </div>
            <div :class="{isCurrentPage:currentPage===4}">
                <nuxt-link to="/aboutUs" tag='span'>关于我们</nuxt-link>
            </div>
            <!-- <div :class="{isCurrentPage:currentPage===2}" @click='goto("productConsultant")'>贷款顾问</div>
            <div :class="{isCurrentPage:currentPage===3}" @click='goto("loanInformation")'>贷款资讯</div>
            <div :class="{isCurrentPage:currentPage===4}" @click='goto("aboutUs")'>关于我们</div> -->
        </div>
        <el-popover placement="bottom" trigger="hover">
            <div>
                <img :src="qrCodeUrl" style="display:block" width="128" height="128">
            </div>
            <div class="qrCode" slot="reference">
                <i class="iconfont icon-shouji01"></i>
                <span>手机贷款</span>
            </div>
        </el-popover>
        <div class="phoneNum">客服热线：400-820-8828</div>
    </div>
</template>

<script>
    import api from '../middleware/api';
    import statusCodeManage from '../middleware/statusCodeManage';

    export default {
        name: 'mainHeader',
        data() {
            return {
                qrCodeUrl: '',
                showPopover: false,
                positionText: '正在定位',
                ifPostionSuccess: false,
                currentPage: null,
                isActive: false,
                scroll: '',
                showOpenCity: true,
                openCity: [], //开通城市
                showOpenCityArr: [],//用于展示的开通城市
                showCity: [], //这是用于展示的城市，数据来自下面四个,展示哪一个就用哪一个进行赋值
                arrAtoF: [],
                arrGtoM: [],
                arrNtoS: [],
                arrTtoZ: [],
                allCity: {},
            };
        },
        methods: {
            changeCity(item) {
                this.positionText = item.name;
                window.sessionStorage.setItem('position', item.code);
                window.sessionStorage.setItem('city', item.name);
                this.showPopover = false;
            },
            ifShowPopover() {
                if (this.ifPostionSuccess) {
                    this.showPopover = false;
                }
                else {
                    this.showPopover = true;
                }
            },
            handleOpen(key, keyPath) {
                if (key !== 'openCity') this.showOpenCity = false;
                else this.showOpenCity = true;
                this.showCity = this[key];
            },
            goto(where) {
                let url = `/${where}.html`;
                if (window.location.pathname === url) {
                    return;
                } else {
                    window.location.href = `${where}.html`;
                }
            },
            headerScroll(e) {
                this.scroll =
                    document.documentElement.scrollTop || document.body.scrollTop;
                if (this.scroll >= 500) {
                    this.isActive = true;
                } else {
                    this.isActive = false;
                }
            },
            getQRCodeFn() {
                //获取二维码
                let url = window.sessionStorage.getItem('qrCodeUrl');
                if (url) {
                    this.qrCodeUrl = url;
                    return;
                } else {
                    //需要用递归的原因在于，不知道首页接口什么时候返回图片地址，所以需要一直判断
                    //不然在网络差的情况下可能组件已经加载出来但是接口的图片地址还没有拿到
                    setTimeout(() => {
                        this.getQRCodeFn();
                    }, 1000);
                }
            },
            //拉取城市列表的方法
            getCityList() {
                api.getCity().then(
                    res => {
                        this.allCity = res.cityList;
                        //                        this.openCity = res.openCity;
                        for (let i in res.openCity) {
                            let obj = {
                                tag: i,
                                cities: res.openCity[i]
                            }
                            this.showOpenCityArr.push(obj);
                        }
                        let AtoF = ['A', 'B', 'C', 'D', 'E', 'F'];
                        let GtoM = ['G', 'H', 'J', 'K', 'L', 'M'];
                        let NtoS = ['N', 'O', 'P', 'Q', 'R', 'S'];
                        let TtoZ = ['T', 'U', 'W', 'X', 'Y', 'Z'];
                        for (let i in res.cityList) {
                            let item = res.cityList[i];
                            let result = new Object();
                            if (AtoF.indexOf(i) !== -1) {
                                result.tag = i;
                                result.cities = item;
                                this.arrAtoF.push(result);
                            } else if (GtoM.indexOf(i) !== -1) {
                                result.tag = i;
                                result.cities = item;
                                this.arrGtoM.push(result);
                            } else if (NtoS.indexOf(i) !== -1) {
                                result.tag = i;
                                result.cities = item;
                                this.arrNtoS.push(result);
                            } else if (TtoZ.indexOf(i) !== -1) {
                                result.tag = i;
                                result.cities = item;
                                this.arrTtoZ.push(result);
                            }
                        }
                        this.showCity = this.arrAtoF;
                    },
                    err => {
                        statusCodeManage.showTipOfStatuCode(err, this);
                    }
                );
            },
            // 高德地图调取api
            getGeolocation(geolocation) {
                let _this = this;
                geolocation.getCurrentPosition(function (status, result) {
                    // 定位成功
                    if (status == 'complete') {
                        // _this.cityName = result.addressComponent.city;
                        // _this.cityCode = result.addressComponent.adcode;
                        //定位成功
                        if (result.addressComponent.adcode) {
                            let tempAdcode = result.addressComponent.adcode;
                            tempAdcode = (tempAdcode + "").substr(0, 4) + "00";
                            window.sessionStorage.setItem('position', tempAdcode);
                        }

                        window.sessionStorage.setItem('city', result.addressComponent.city);
                        _this.positionText = result.addressComponent.city;
                        _this.ifPostionSuccess = true;
                    } else {
                        // 定位失败，一直重复定位,如果3次之后，那么就不在定位，直接展示定位失败
                        _this.positionText = '定位失败';
                        _this.ifPostionSuccess = false;
                    }
                });
            },
        },
        mounted() {
            //获取二维码图片地址
            this.getQRCodeFn();
            //拉取城市的json
            this.getCityList();
            let pathName = window.location.pathname;
            switch (pathName) {
                case '/finlean_ow/loanApplication.html':
                    this.currentPage = 1;
                    break;
                case '/finlean_ow/productDetails.html':
                    this.currentPage = 1;
                    break;
                case '/finlean_ow/productConsultant.html':
                    this.currentPage = 2;
                    break;
                case '/finlean_ow/loanInformation.html':
                    this.currentPage = 3;
                    break;
                case '/finlean_ow/informationList.html':
                    this.currentPage = 3;
                    break;
                case '/finlean_ow/informationDetails.html':
                    this.currentPage = 3;
                    break;
                case '/finlean_ow/aboutUs.html':
                    this.currentPage = 4;
                    break;
                default:
                    this.currentPage = null;
                    break;
            }
            if (
                pathName === '/index.html' ||
                pathName === '/'
            ) {
                window.addEventListener('scroll', this.headerScroll);
            } else {
                this.isActive = true;
            }
            let positionCode = window.sessionStorage.getItem('position');
            if (!positionCode) {
                //没有进行过定位，则开始自动定位
                let _this = this;
                // 创建地图对象需要一个div对象id为geolocation
                let mapObj = new AMap.Map('homeGeolocation');
                // 使用城市搜索组件
                mapObj.plugin('AMap.Geolocation', () => {
                    // AMap.Geolocation    AMap.CitySearch
                    let geolocation = new AMap.Geolocation({
                        // Geolocation
                        enableHighAccuracy: false, //是否使用高精度定位，默认:true
                        GeoLocationFirst: false, // 默认为false，设置为true的时候可以调整PC端为优先使用浏览器定位，失败后使用IP定位
                        timeout: 10000, //超过10秒后停止定位，默认：无穷大
                        maximumAge: 0, //定位结果缓存0毫秒，默认：0
                        showButton: false, // 是否显示定位按钮
                        useNative: false // 是否使用安卓定位sdk用来进行定位
                        // enableHighAccuracy: true, //是否使用高精度定位，默认:true
                        // timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                        // maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                        // showButton: false,        //显示定位按钮，默认：true
                    });
                    // getCurrentPosition   getLocalCity
                    // 定位失败的次数，我们约定为3次，3次失败的话，就展示获取城市失败
                    _this.getGeolocation(geolocation);
                });
                // api.getPosition().then(
                //     res => {
                //         if (Number(res.body.status) === 0) {
                //             //定位成功
                //             window.sessionStorage.setItem('position', res.body.code);
                //             window.sessionStorage.setItem('city', res.body.city);
                //             this.positionText = res.body.city;
                //             this.ifPostionSuccess = true;
                //         } else {
                //             this.positionText = '定位失败';
                //             this.ifPostionSuccess = false;
                //         }
                //     },
                //     err => {
                //         statusCodeManage.showTipOfStatuCode(err, this);
                //     }
                // );
            } else {
                //已经定位
                this.positionText = window.sessionStorage.getItem('city');
                this.ifPostionSuccess = true;
            }
        }
    };
</script>

<style lang="scss">
.isCurrentPage {
    color: $themecolor !important;
}

.all-city,
.open-city {
    .city-item {
        @include flexLayout(flex-start, flex-start, row);
        box-sizing: border-box;
        .city-tag {
            padding: 10px 20px 0 20px;
            color: $themecolor;
            font-weight: bold;
        }
        .city-list {
            padding-top: 10px;
            @include flexLayout(flex-start, center, row);
            width: 720px;
            flex-wrap: wrap;
            -webkit-flex-wrap: wrap;
            span {
                width: 180px;
                margin-bottom: 8px;
                cursor: pointer;
                &:hover {
                    color: $themecolor;
                }
            }
        }
    }
}

.header-component {
    @include flexLayout(center, center, row);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 1180px;
    height: 60px;
    z-index: 999;
    transition: 0.3s;
    .logo {
        width: 136px;
        height: 42px;
        img {
            cursor: pointer;
            width: 136px;
            height: 42px;
            // vertical-align: middle;
            display: block;
        }
    }
    .position-box {
        @include ellipsis(193px);
        margin-left: 30px;
        color: $whitecolor;
        span {
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    .header-item-box {
        @include flexLayout();
        height: 32px;
        padding-right: 27px;
        border-right: 1px solid $whitecolor;
        font-size: 16px;
        color: $whitecolor;
        div {
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            cursor: pointer;
            text-align: center;
            width: 110px;
            &:hover {
                color: #5197f8;
            }
        }
    }
    .qrCode {
        cursor: pointer;
        margin-left: 45px;
        i {
            width: 30px;
            font-size: 20px;
            color: $whitecolor;
            vertical-align: middle;
        }
        span {
            width: 68px;
            vertical-align: middle;
            font-size: 14px;
            color: $whitecolor;
        }
    }
    .phoneNum {
        min-width: 165px;
        margin-left: 45px;
        font-size: 14px;
        color: $whitecolor;
    }
}

.header-active {
    background-color: $whitecolor;
    .header-item-box {
        color: $minorfontcolor;
        border-right: 1px solid $minorfontcolor;
    }
    .position-box {
        color: $themecolor;
    }
    .qrCode {
        i,
        span {
            color: $minorfontcolor;
        }
    }
    .phoneNum {
        color: $minorfontcolor;
    }
}

.el-popover {
    min-width: 128px !important;
}
</style>


