<template>
    <div class="productConsultant-page">
        <mainHeader></mainHeader>
        <div class="product-con">
            <div class="product-leftcon">
                <div class="product-type" v-if="prodTypes.length">
                    <div class="product-text">
                        <span>产品类型：</span>
                        <span class="typeAll" @click="showAllProd('prodTypes','prodTypeIds')">不限</span>
                    </div>
                    <div class="product-typedel" :class="{'product-typedelh':prodTypeActive}">
                        <span v-for="(i,index) in prodTypes" @click="prodTypeFilterFn(i,index)" :key="index">{{ i.typeName }}</span>
                    </div>
                    <div class="unfold" @click="prodTypeActive=!prodTypeActive">
                        <span v-text="prodTypeActive?'收起':'展开'"></span>
                        <i :class="{'el-icon-arrow-down':!prodTypeActive,'el-icon-arrow-up':prodTypeActive}"></i>
                    </div>
                    <div class="clear-box"></div>
                </div>
                <div class="product-type" v-if="buiTypes.length">
                    <div class="product-text">
                        <span>业务范围：</span>
                        <span class="typeAll" @click="showAllProd('buiTypes','buiTypeIds')">不限</span>
                    </div>
                    <div class="product-typedel" :class="{'product-typedelh':buiTypesActice}">
                        <span v-for="(i,index) in buiTypes" @click="buiTypeFilterFn(i)" :key="index">{{ i.typeName }}</span>
                    </div>
                    <div class="unfold" @click="buiTypesActice=!buiTypesActice">
                        <span v-text="buiTypesActice?'收起':'展开'"></span>
                        <i :class="{'el-icon-arrow-down':!buiTypesActice,'el-icon-arrow-up':buiTypesActice}"></i>
                    </div>
                    <div class="clear-box"></div>
                </div>
                <div class="product-type" v-if="JSON.stringify(openAreas)!=='{}'">
                    <div class="product-text">
                        <span>服务区域：</span>
                        <span class="typeAll" @click="showAllProd('openAreasArr','areaCodes')">不限</span>
                    </div>
                    <div class="product-typedel" :class="{'product-typedelh':openAreasActive}">
                        <div>
                            <span class="openAreasKeys" v-for="(i,index) in Object.keys(openAreas)" @click="changeKeys(i)" :key="index">{{ i }}</span>
                        </div>
                        <div>
                            <span v-for="(i,index) in openAreasArr" @click="openAreasFilterFn(i)" :key="index">{{ i.name }}</span>
                        </div>
                    </div>
                    <div class="unfold" @click="openAreasActive=!openAreasActive">
                        <span v-text="openAreasActive?'收起':'展开'"></span>
                        <i :class="{'el-icon-arrow-down':!openAreasActive,'el-icon-arrow-up':openAreasActive}"></i>
                    </div>
                    <div class="clear-box"></div>
                </div>
                <div class="filtersArr">
                    <div class="filtersArr-title">已选条件：</div>
                    <div class="filtersArr-box">
                        <div v-for="(i,index) in filtersArr" :key="index">
                            {{i.typeName}}
                            <i class="el-icon-close" @click="cancelFilter(i,index)"></i>
                        </div>
                    </div>
                </div>
                <div class="item-box" v-loading="loading" v-if="advisorList.length">
                    <div class="consultant-item" v-for="(i,index) in advisorList" :key="index">
                        <div class="item-img">
                            <img :src="i.imgUrl">
                        </div>
                        <div class="item-content">
                            <p class="item-name">{{ i.advisorName }}</p>
                            <p class="item-type">产品类型：<span v-for="item in i.prodType">{{item}}&nbsp;&nbsp;</span></p>
                            <p class="server-range">业务范围：<span v-for="item in i.buiType">{{item}}&nbsp;&nbsp;</span>
                            </p>
                            <p class="server-position">服务区域：<span v-for="item in i.area">{{item}}&nbsp;&nbsp;</span></p>
                        </div>
                        <el-button class="item-btn" @click="clickShowModal(i.advisorId)" type="primary">向他咨询</el-button>
                    </div>
                </div>
                <div class="showNone" v-show="showNone">该筛选条件下暂时没有顾问</div>
                <div class="applicationloan-pagination">
                    <el-pagination background layout="total, prev, pager, next, jumper" @current-change="changePage" :current-page="page" :total="total">
                    </el-pagination>
                </div>
            </div>
            <div class="product-rightcon">
                <consultant></consultant>
                <div class="shareBox">
                    <img :src="consultantIntroUrl">
                </div>
            </div>
        </div>
        <mainFooter></mainFooter>
        <el-dialog :visible.sync="dialogVisible" :close-on-click-modal="false" width="345px">
            <consultant :clearInfo="dialogVisible" :advisorId="advisorId" @closeDialog="closeDialog"></consultant>
            <span slot="footer" class="dialog-footer">
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import mainHeader from '../components/mainHeader.vue'
    import mainFooter from '../components/mainFooter.vue'
    import consultant from '../components/contactConsultant.vue'
    import api from '../middleware/api'
    import statusCodeManage from '../middleware/statusCodeManage'

    export default {
        name: 'productConsultant',
        components: {
            mainHeader,
            consultant,
            mainFooter
        },
        data() {
            return {
                consultantIntroUrl: '',
                loading: false,
                dialogVisible: false,
                buiTypesActice: false, //业务范围样式控制
                prodTypeActive: false, //产品范围样式控制
                openAreasActive: true, //服务范围样式控制
                buiTypes: [], //业务范围
                prodTypes: [], //产品范围
                openAreas: {}, //服务区域
                openAreasArr: [], //展示的具体区域
                buiTypeIds: [], //业务类型筛选条件的数组
                prodTypeIds: [], //产品类型筛选条件的数组
                areaCodes: [], //服务区域筛选条件的数组
                filtersArr: [], //已选择的筛选条件的集合
                page: 1,
                total: null,
                advisorList: [], //顾问的列表
                advisorId: '',
                showNone: false
            }
        },
        head() {
            return {
                title: '贷款顾问,为您提供一对一的专业贷款咨询服务-吉帑金服',
                meta: [
                    {
                        hid: 'keywords',
                        name: 'keywords',
                        content: '贷款经理,贷款服务,贷款咨询,成都本地贷款咨询'
                    },
                    {
                        hid: 'description',
                        name: 'description',
                        content:
                            '贷款经理可以为您提供一对一的贷款咨询服务,如线上贷款,各种抵押贷款,无抵押贷款以及大/小额贷款等,帮助您快速借到钱'
                    }
                ]
            }
        },
        methods: {
            //点击不限
            showAllProd(which, resultArr) {
                this[resultArr].forEach((val, index) => {
                    for (let i = 0; i < this.filtersArr.length; i++) {
                        let item = this.filtersArr[i]
                        if (val === item.id) {
                            this.filtersArr.splice(i, 1)
                            break
                        }
                    }
                })
                this[resultArr] = []
                this.init()
            },
            //用于清除已选条件中被干掉的条件
            filtersArrClean(item) {
                this.filtersArr.some((val, index) => {
                    if (val.typeName === item.typeName) {
                        this.filtersArr.splice(index, 1)
                        return true
                    }
                })
            },
            //点击×时的事件
            cancelFilter(item, index) {
                let hostIndex = this[item.host].indexOf(item.id)
                this[item.host].splice(hostIndex, 1)
                this.filtersArr.splice(index, 1)
                this.init()
            },
            //产品类型筛选
            prodTypeFilterFn(item, index) {
                let idIndexInArr = this.prodTypeIds.indexOf(item.id)
                if (idIndexInArr !== -1) {
                    //已经被选过
                    this.prodTypeIds.splice(idIndexInArr, 1)
                    this.filtersArrClean(item)
                } else {
                    //还没有被选
                    this.filtersArr.push(item)
                    this.prodTypeIds.push(item.id)
                }
                this.init()
            },
            //业务类型筛选
            buiTypeFilterFn(item) {
                let idIndexInArr = this.buiTypeIds.indexOf(item.id)
                if (idIndexInArr !== -1) {
                    this.buiTypeIds.splice(idIndexInArr, 1)
                    this.filtersArrClean(item)
                } else {
                    this.filtersArr.push(item)
                    this.buiTypeIds.push(item.id)
                }
                this.init()
            },
            //服务区域筛选
            openAreasFilterFn(item) {
                let idIndexInArr = this.areaCodes.indexOf(item.code)
                if (idIndexInArr !== -1) {
                    this.areaCodes.splice(idIndexInArr, 1)
                    this.filtersArrClean(item)
                } else {
                    this.filtersArr.push(item)
                    this.areaCodes.push(item.code)
                }
                this.init()
            },
            //点击服务区域的字母
            changeKeys(item) {
                this.openAreasArr = this.openAreas[item]
            },
            closeDialog(val) {
                this.dialogVisible = val
            },
            clickShowModal(item) {
                this.advisorId = item
                this.dialogVisible = true
            },
            changePage(val) {
                let obj = {
                    page: val,
                    rows: 10
                }
                this.init({ page: val, rows: 10 })
            },
            init(obj = new Object()) {
                this.loading = true
                if (!obj.hasOwnProperty('page')) {
                    obj.page = 1
                    obj.rows = 10
                }
                obj.prodTypeIds = this.prodTypeIds
                obj.buiTypeIds = this.buiTypeIds
                obj.areaCodes = this.areaCodes
                api.initAdvisor(obj).then(
                    res => {
                        if (!res.body.items.length) this.showNone = true
                        else this.showNone = false
                        this.page = res.body.page
                        this.total = res.body.total
                        this.advisorList = res.body.items
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
            this.consultantIntroUrl = window.sessionStorage.getItem(
                'consultantIntroUrl'
            )
            this.init()
            api.initFilter().then(
                res => {
                    res.body.buiTypes.forEach(val => {
                        val.host = 'buiTypeIds'
                    })
                    this.buiTypes = JSON.parse(JSON.stringify(res.body.buiTypes))
                    res.body.prodTypes.forEach(val => {
                        val.host = 'prodTypeIds'
                    })
                    this.prodTypes = JSON.parse(JSON.stringify(res.body.prodTypes))
                    for (let i in res.body.openAreas) {
                        res.body.openAreas[i].forEach(val => {
                            val.id = val.code
                            val.typeName = val.name
                            val.host = 'areaCodes'
                        })
                    }
                    this.openAreas = JSON.parse(JSON.stringify(res.body.openAreas))
                    let openAreasArr = Object.keys(this.openAreas)
                    if (openAreasArr.length)
                        this.openAreasArr = this.openAreas[openAreasArr[0]]
                    console.log(this.openAreas)
                },
                err => {
                    statusCodeManage.showTipOfStatuCode(err, this)
                }
            )
        }
    }
</script>

<style lang="scss">
    .isClick {
        color: $themecolor !important;
    }

    .productConsultant-page {
        margin-top: 90px;
        .clear-box {
            @include clearfix();
        }
        .el-dialog {
            @include flexLayout(center, center, row);
        }
        .product-con {
            min-height: 690px;
            @include flexLayout(flex-start, flex-start, row);
            margin-top: 80px;
            width: 1180px;
            margin: 0 auto;
        }
        .showNone {
            background-color: $whitecolor;
            padding: 20px 0;
            margin: 20px 0;
            text-align: center;
            color: $themecolor;
        }
        .product-leftcon {
            width: 860px;
            .item-box {
                .consultant-item {
                    @include flexLayout();
                    position: relative;
                    padding: 30px 16px;
                    background-color: $whitecolor;
                    border-bottom: 1px solid $divisioncolor;
                    &:first-child {
                        margin-top: $marginB;
                    }
                    .item-img,
                    .item-img img {
                        width: 160px;
                        height: 160px;
                    }
                    .item-content {
                        margin-left: 20px;
                        @include flexLayout(center, flex-start, column);
                        .item-name {
                            font-size: 18px;
                            font-weight: 600;
                            color: $themefontcolor;
                            margin-bottom: 20px;
                        }
                        .item-type,
                        .server-range,
                        .server-position {
                            @include ellipsis(500px);
                            font-size: 16px;
                            color: $themefontcolor;
                            line-height: 36px;
                        }
                    }
                    .item-btn {
                        position: absolute;
                        right: 16px;
                        top: 50%;
                        transform: translateY(-50%);
                    }
                }
            }
            .applicationloan-pagination {
                width: 860px;
                height: 104px;
                background-color: $whitecolor;
                @include flexLayout(center, center, row);
            }
        }
        .filtersArr {
            @include flexLayout(flex-start, flex-start, row);
            background-color: $whitecolor;
            padding: 10px 20px;
            .filtersArr-title {
                border: 1px solid transparent;
                margin-bottom: 10px;
            }
            .filtersArr-box {
                @include flexLayout();
                flex-wrap: wrap;
                width: 720px;
                div {
                    padding: 0 10px;
                    margin-right: 10px;
                    margin-bottom: 10px;
                    border: 1px solid $themecolor;
                    color: $themecolor;
                    i {
                        cursor: pointer;
                    }
                }
            }
        }
        .product-type {
            width: 100%;
            background-color: $whitecolor;
            border-bottom: 1px dashed #dddddd;
            padding: 16px 20px;
            box-sizing: border-box;
            font-size: $fontsize16;
            .product-text {
                width: 150px;
                float: left;
                .typeAll {
                    padding: 2px 4px;
                    cursor: pointer;
                    font-size: 14px;
                    background-color: $themecolor;
                    color: #ffffff;
                }
            }
            .unfold {
                width: 15%;
                text-align: right;
                float: left;
                color: $themecolor;
                cursor: pointer;
            }
            .product-typedel {
                width: 65%;
                height: 24px;
                overflow: hidden;
                float: left;
                margin-top: 2px;
                font-size: $fontsize14;
                .openAreasKeys {
                    min-width: 25px !important;
                }
                span {
                    display: inline-block;
                    cursor: pointer;
                    margin-right: 20px;
                    padding-bottom: 20px;
                    &:hover {
                        color: $themecolor;
                    }
                }
            }
            .product-typedelh {
                height: auto !important;
            }
        }
        .product-rightcon {
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
</style>
