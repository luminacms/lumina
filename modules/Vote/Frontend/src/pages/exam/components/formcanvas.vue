<template>
    <div class="wf-formcanvas">
        <div class="wf-formcanvas-title"><el-input v-model="vote.title" placeholder="这里是标题"></el-input></div>
        <div class="wf-formcanvas-desc"><el-input type="textarea" v-model="vote.description" placeholder="为了给您提供更好的服务，希望您能抽出几分钟时间，将您的感受和建议告诉我们，我们非常重视每位用户的宝贵意见，期待您的参与！现在我们就马上开始吧！"></el-input></div>
        <div class="wf-formcanvas-inner">
            <div class="wf-formcanvas-body dropbody" v-bind:class="{empty:vote.length >0}">
                <div class="wf-dragging-mark" v-if="InCanvas==0"></div>

                <div v-for="(item,index) in vote.subjects">
                    <div v-if="item.type=='radio'">
                        <div @mousedown="mouseDown" draggable="true"
                             v-on:dragstart="movestart"
                             v-on:mouseover="hover"
                             v-on:mouseout="mouseOut"
                             :data-index="index"
                             :data-id="item.subject_id"
                             v-bind:class="index==selected?'active':''"
                             class="wf-component wf-component-radio">
                            <div class="wf-remove" @click="close"><i class="el-icon-close"></i></div>
                            <div class="wf-overlay"></div>
                            <div class="wf-componentview">
                                <div class="wf-items">
                                    <div class="title">{{ index+1 }}.<span class="color-danger" v-if="item.required">*</span>{{item.title}}</div>
                                    <div class="options">

                                        <el-radio v-model="item.idx" label="opt.value" v-for="(opt, idx) in item.options">
                                            <span v-if="opt.type=='text'">{{ opt.value }}</span>
                                            <span v-if="opt.type=='image'"><img :src="opt.value" width="65" /></span>
                                        </el-radio>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="wf-dragging-mark" v-if="InCanvas==index+1"></div>
                    </div>
                    <div v-if="item.type=='checkbox'">
                        <div @mousedown="mouseDown" draggable="true" v-on:dragstart="movestart"
                             v-on:mouseout="mouseOut"
                             v-on:mouseover="hover"
                             :data-index="index"
                             v-bind:class="index==selected?'active':''"
                             class="wf-component wf-component-checkbox">
                            <div class="wf-remove fa fa-close" @click="close"><i class="el-icon-close"></i></div>
                            <div class="wf-overlay"></div>
                            <div class="wf-componentview">
                                <div class="wf-items">
                                    <div class="title">{{ index+1 }}.<span class="color-danger" v-if="item.required">*</span>{{item.title}}</div>
                                    <div class="options">

                                        <el-checkbox v-model="item.idx" v-for="(opt, idx) in item.options">
                                            <span v-if="opt.type=='text'">{{ opt.value}}</span>
                                            <span v-if="opt.type=='image'"><img :src="opt.value" width="65" /></span>
                                        </el-checkbox>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="wf-dragging-mark" v-if="InCanvas==index+1"></div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
    //  import draggable from 'vuedraggable'
    export default{
        name: 'formcanvas',
        data: function () {
            return {
                description: '',
                icon: '//gw.alicdn.com/tps/TB1zXtqOpXXXXa6XXXXXXXXXXXX-102-102.png',
                isempty: true,
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                InCanvas: null,
                components: [],
                selected: null,
                domArr: [],
                isDrag: false,
                dragIndex: null,
                tabIndex: null,
                //拖动的时候 明细组件的index
                parNodeIndex: null
            }
        },
        props: ['vote'],
        methods: {
            hover: function (e) {
                e.stopPropagation();
                e.preventDefault()
                e.currentTarget.classList.add('hover')
            },
            mouseOut: function (e) {
                e.stopPropagation();
                e.preventDefault()
                e.currentTarget.classList.remove('hover')
            },
            close: function (e) {
                e.preventDefault();
                e.stopPropagation();
                let dom = e.currentTarget.parentNode;
                let index = dom.getAttribute('data-index');
                let id = dom.getAttribute('data-id')

                this.vote.subjects.splice(index, 1)
                if(id) {
                    drag.$emit('deleteSubject', this.vote.vote_id, id)
                }
            },
            mouseDown: function (e) {
                e.stopPropagation();
                let dom = e.currentTarget;
                let index = dom.getAttribute('data-index');
                let parNode = dom.parentNode.parentNode;
                let obj;

                obj = this.vote.subjects[index]
                this.selected = index;
                this.vote.subjects[index].selected = index;

                drag.$emit("selectComponent", obj)
                drag.$emit('changeTab', true)

                // if (parNode.className.indexOf('wf-componentview-area') >= 0) {
                //     let parNodeIndex = parNode.parentNode.parentNode.getAttribute('data-index');
                //
                //     obj = this.components[parNodeIndex].components[index];
                //
                //     if (this.selected == index && this.parNodeIndex != parNodeIndex || this.selected !== index) {
                //         this.parNodeIndex = parNodeIndex;
                //         this.selected = null;
                //         this.components[parNodeIndex].selected = index;
                //         drag.$emit("selectComponent", obj)
                //         drag.$emit('changeTab', true)
                //     }
                // } else {
                //     this.parNodeIndex = null;
                //     for (let i = 0, l = this.components.length; i < l; i++) {
                //         this.components[i].selected = null;
                //     }
                //     obj = this.components[index];
                //     if (this.selected !== index) {
                //         this.selected = index
                //         drag.$emit("selectComponent", obj)
                //         drag.$emit('changeTab', true)
                //     }
                // }
            },
            movestart: function (e) {
                e.preventDefault()
                e.stopPropagation()
                let obj = {}
                let dom = e.currentTarget
                dom.classList.add('draging')
                let index = dom.getAttribute('data-index');
                let actualLeft = dom.offsetLeft;
                let current = dom.offsetParent;
                while (current !== null) {
                    actualLeft += current.offsetLeft;
                    current = current.offsetParent;
                }
                let actualTop = dom.offsetTop;
                while (current !== null) {
                    actualTop += current.offsetTop;
                    current = current.offsetParent;
                }
                obj.clientX = e.clientX;
                obj.clientY = e.clientY;
                obj.isstart = true;

                obj.componentView = this.vote.subjects[index]
                // let parNode = dom.parentNode.parentNode.parentNode.parentNode;
                // if (parNode.className.indexOf('wf-componentview-area') >= 0) {
                //     let parNodeIndex = parNode.parentNode.parentNode.getAttribute('data-index');
                //     obj.componentView = this.components[parNodeIndex].components[index];
                //     obj.componentType = this.components[parNodeIndex].components[index].type;
                //     obj.componentText = this.components[parNodeIndex].components[index].name;
                // } else {
                //     obj.componentView = this.components[index];
                //     obj.componentType = this.components[index].type;
                //     obj.componentText = this.components[index].name;
                // }
                this.isDrag = true;
                this.dragIndex = index;
                drag.$emit("movestart", obj)
            },
            queryDomByIndex: function (parentNode, index) {
                let dom = parentNode.querySelectorAll('.wf-component');
                for (let i = 0, l = dom.length; i < l; i++) {
                    let obj = dom[i];
                    if (obj.getAttribute('data-index') == index) {
                        return obj
                    }
                }
            },
            getcomponents: function () {
                let count = 0;
                for (let i = 0, l = this.domArr.length; i < l; i++) {
                    count++;
                    if (Object.prototype.toString.call(this.domArr[i].domArr).slice(8, -1) === "Array") {
                        for (let m = 0, n = this.domArr[i].domArr.length; m < n; m++) {
                            count++
                        }
                    }
                }
                return count
            }
        },
        created: function () {
            let self = this

            drag.$on("moveInCanvas", function (obj) {
                //当鼠标在中间可拖动区域
                if (obj.clientX >= self.left && obj.clientY >= self.top && obj.clientX <= self.left + self.width && obj.clientY <= self.top + self.height) {
                    //鼠标距离可拖动区域顶部的距离
                    let topInCanvas = obj.clientY - self.top;


                    if (self.domArr.length <= 0) {
                        self.InCanvas = 0;
                        self.tabIndex = null;
                    } else if (self.domArr.length === 1) {
                        if (obj.componentType == 'tablefield') {
                            if (topInCanvas <= self.domArr[0].middle) {
                                self.InCanvas = 0;
                                self.tabIndex = null;
                            } else if (topInCanvas > self.domArr[0].middle) {
                                self.InCanvas = 1;
                                self.tabIndex = null;
                            }
                        } else {
                            if (topInCanvas <= self.domArr[0].middle_top) {
                                self.InCanvas = 0;
                                self.tabIndex = null;
                            } else if (topInCanvas > self.domArr[0].middle_lower) {
                                self.InCanvas = 1;
                                self.tabIndex = null;
                            } else if (topInCanvas <= self.domArr[0].middle_lower && topInCanvas > self.domArr[0].middle_top) {
                                let item = self.domArr[0];
                                self.InCanvas = null;
                                self.tabIndex = 0;
                                if (item.domArr.length <= 0 || topInCanvas <= item.domArr[0].middle_top) {
                                    self.vote.subjects[0].InTableCanvas = 0
                                } else if (topInCanvas > item.domArr[item.domArr.length - 1].middle_lower) {
                                    self.vote.subjects[0].InTableCanvas = item.domArr.length
                                } else if (item.domArr.length > 1) {
                                    for (let m = 0, n = item.domArr.length - 1; m < n; m++) {
                                        if (topInCanvas > item.domArr[m].middle_lower && topInCanvas <= item.domArr[m + 1].middle_top) {
                                            self.vote.subjects[0].InTableCanvas = m + 1
                                        }
                                    }
                                }
                            }
                        }
                    } else {
                        //中间已有组件数量大于1
                        if (obj.componentType == 'tablefield') {
                            if (topInCanvas <= self.domArr[0].middle) {
                                self.InCanvas = 0;
                                self.tabIndex = null;
                            } else if (topInCanvas > self.domArr[self.domArr.length - 1].middle) {
                                self.InCanvas = self.domArr.length;
                                self.tabIndex = null;
                            } else {
                                for (let i = 0, l = self.domArr.length; i < l - 1; i++) {
                                    let item = self.domArr[i];
                                    let nextItem = self.domArr[i + 1];
                                    if (topInCanvas > item.middle && topInCanvas <= nextItem.middle) {
                                        self.InCanvas = i + 1;
                                        self.tabIndex = null;
                                        self.vote.subjects[i].InTableCanvas = null
                                    }
                                }
                                /* //当最后一个组件是明细组件时
                                 if (topInCanvas <= self.domArr[self.domArr.length - 1].middle_lower && topInCanvas > self.domArr[self.domArr.length - 1].middle_top) {
                                 let item = self.domArr[self.domArr.length - 1];
                                 self.InCanvas = null;
                                 self.tabIndex = self.domArr.length - 1;
                                 if (item.domArr.length <= 0 || topInCanvas <= item.domArr[0].middle_top) {
                                 self.vote.subjects[self.domArr.length - 1].InTableCanvas = 0
                                 } else if (topInCanvas > item.domArr[item.domArr.length - 1].middle_lower) {
                                 self.vote.subjects[self.domArr.length - 1].InTableCanvas = item.domArr.length
                                 } else {
                                 for (let m = 0, n = item.domArr.length - 1; m < n; m++) {
                                 if (topInCanvas > item.domArr[m].middle_lower && topInCanvas <= item.domArr[m + 1].middle_top) {
                                 self.vote.subjects[i].InTableCanvas = m + 1
                                 }
                                 }
                                 }
                                 }*/
                            }
                        } else {
                            if (topInCanvas <= self.domArr[0].middle_top) {
                                self.InCanvas = 0;
                                self.tabIndex = null;
                            } else if (topInCanvas > self.domArr[self.domArr.length - 1].middle_lower) {
                                self.InCanvas = self.domArr.length;
                                self.tabIndex = null;
                            }
                            else {
                                for (let i = 0, l = self.domArr.length; i < l - 1; i++) {
                                    let item = self.domArr[i];
                                    let nextItem = self.domArr[i + 1];
                                    //在明细组件里面
                                    if (topInCanvas > item.middle_top && topInCanvas <= item.middle_lower) {
                                        self.InCanvas = null;
                                        self.tabIndex = i;
                                        if (item.domArr.length <= 0 || topInCanvas <= item.domArr[0].middle_top) {
                                            self.vote.subjects[i].InTableCanvas = 0
                                        } else if (topInCanvas > item.domArr[item.domArr.length - 1].middle_lower) {
                                            self.vote.subjects[i].InTableCanvas = item.domArr.length
                                        } else {
                                            for (let m = 0, n = item.domArr.length - 1; m < n; m++) {
                                                if (topInCanvas > item.domArr[m].middle_lower && topInCanvas <= item.domArr[m + 1].middle_top) {
                                                    self.vote.subjects[i].InTableCanvas = m + 1
                                                }
                                            }
                                        }
                                    } else if (topInCanvas > item.middle_lower && topInCanvas <= nextItem.middle_top) {
                                        self.InCanvas = i + 1;
                                        self.tabIndex = null;
                                        self.vote.subjects[i].InTableCanvas = null
                                    }

                                }
                                //当最后一个组件是明细组件时
                                if (topInCanvas <= self.domArr[self.domArr.length - 1].middle_lower && topInCanvas > self.domArr[self.domArr.length - 1].middle_top) {
                                    let item = self.domArr[self.domArr.length - 1];
                                    self.InCanvas = null;
                                    self.tabIndex = self.domArr.length - 1;
                                    if (item.domArr.length <= 0 || topInCanvas <= item.domArr[0].middle_top) {
                                        self.vote.subjects[self.domArr.length - 1].InTableCanvas = 0
                                    } else if (topInCanvas > item.domArr[item.domArr.length - 1].middle_lower) {
                                        self.vote.subjects[self.domArr.length - 1].InTableCanvas = item.domArr.length
                                    } else {
                                        for (let m = 0, n = item.domArr.length - 1; m < n; m++) {
                                            if (topInCanvas > item.domArr[m].middle_lower && topInCanvas <= item.domArr[m + 1].middle_top) {
                                                self.vote.subjects[m].InTableCanvas = m + 1
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (self.tabIndex != null) {
                        self.InCanvas = null
                    } else {
                        self.InCanvas = self.InCanvas || 0
                    }
                    if (self.InCanvas != null) {
                        for (let i = 0, l = self.vote.subjects.length; i < l; i++) {
                            self.vote.subjects[i].InTableCanvas = null
                        }
                    }
                }
                else {
                    self.InCanvas = null;
                    self.tabIndex = null;
                    for (let i = 0, l = self.vote.subjects.length; i < l; i++) {
                        self.vote.subjects[i].InTableCanvas = null
                    }
                }
            })
            drag.$on("moveend", function (obj) {
                let component = JSON.stringify(obj);
                component = JSON.parse(component);

                console.log(component)
                let componentsLength = self.getcomponents();
                drag.$emit("dragend", obj);

                //拖动现在已有组件
                if (self.isDrag) {
                    self.dragIndex = self.dragIndex >> 0;

                    if (self.dragIndex != self.InCanvas - 1 && self.dragIndex != self.InCanvas) {
                        let dragItem = self.vote.subjects[self.dragIndex];
                        self.vote.subjects.splice(self.dragIndex, 1);
                        self.vote.subjects.splice(self.InCanvas, 0, dragItem);
                        self.selected = self.vote.subjects.indexOf(dragItem);
                    } else {
                        let dom = self.queryDomByIndex(document, self.dragIndex);
                        dom.classList.remove('draging');
                    }
                }else{
                    //添加新组件
                    let idx = 0;
                    for (let i = 0; i < self.vote.subjects.length; i++) {
                        let item = self.vote.subjects[i];
                        if (item.name == component.componentView.name) {
                            idx++;
                        }
                    }
                    component.componentView.idx = componentsLength;
                    if (idx > 0) {
                        component.componentView.title = component.componentView.title + "（" + idx + "）";
                    }
                    self.vote.subjects.splice(self.InCanvas, 0, component.componentView);
                    // if (self.InCanvas > 0) {
                    //     self.vote.subjects.splice(self.InCanvas, 0, component.componentView);
                    // } else if (self.InCanvas == 0) {
                    //     self.vote.subjects.unshift(component.componentView);
                    // }

                    self.selected = self.vote.subjects.indexOf(component.componentView);
                    drag.$emit('changeTab', true);
                    drag.$emit("selectComponent", component.componentView)
                }
                self.InCanvas = null;
                self.dragIndex = null;
                self.isDrag = false;
                //拖动到非明细组件里面
                // if (self.InCanvas != null) {
                //     //拖动现在已有组件
                //     if (self.isDrag) {
                //         self.dragIndex = self.dragIndex >> 0;
                //         //如果以前在明细组件里面
                //         if (self.parNodeIndex != null) {
                //             let dragItem = self.vote.subjects[self.parNodeIndex].components[self.dragIndex];
                //             self.vote.subjects[self.parNodeIndex].components.splice(self.dragIndex, 1);
                //             self.vote.subjects.splice(self.InCanvas, 0, dragItem);
                //             self.selected = self.vote.subjects.indexOf(dragItem);
                //         } else {
                //             if (self.dragIndex != self.InCanvas - 1 && self.dragIndex != self.InCanvas) {
                //                 let dragItem = self.vote.subjects[self.dragIndex];
                //                 self.vote.subjects.splice(self.dragIndex, 1);
                //                 self.vote.subjects.splice(self.InCanvas, 0, dragItem);
                //                 self.selected = self.vote.subjects.indexOf(dragItem);
                //             } else {
                //                 let dom = self.queryDomByIndex(document, self.dragIndex);
                //                 dom.classList.remove('draging');
                //             }
                //         }
                //         self.dragIndex = null;
                //         self.isDrag = false;
                //     } else {
                //         //添加新组件
                //         let idx = 0;
                //         for (let i = 0; i < self.vote.subjects.length; i++) {
                //             let item = self.vote.subjects[i];
                //             if (item.name == component.componentView.name) {
                //                 idx++;
                //             }
                //         }
                //         component.componentView.idx = componentsLength;
                //         if (idx > 0) {
                //             component.componentView.defaultLable = component.componentView.defaultLable + "（" + idx + "）";
                //         }
                //         if (self.InCanvas > 0) {
                //             self.vote.subjects.splice(self.InCanvas, 0, component.componentView);
                //         } else if (self.InCanvas == 0) {
                //             self.vote.subjects.unshift(component.componentView);
                //         }
                //
                //         self.selected = self.vote.subjects.indexOf(component.componentView);
                //         drag.$emit('changeTab', true);
                //         drag.$emit("selectComponent", component.componentView)
                //     }
                //     self.InCanvas = null;
                //     //拖动到明细组件里面
                // } else if (self.tabIndex != null) {
                //     //拖动现有组件
                //     if (self.isDrag) {
                //         //在明细组件里面的位置
                //         let inTabIndex = self.vote.subjects[self.tabIndex].InTableCanvas >> 0;
                //         self.dragIndex = self.dragIndex >> 0;
                //         //  self.parNodeIndex = self.parNodeIndex >> 0;
                //         //如果从明细组件里面拖到外面
                //         if (self.parNodeIndex == null) {
                //             let dragItem = self.vote.subjects[self.dragIndex];
                //             self.vote.subjects[self.tabIndex].components.splice(inTabIndex, 0, dragItem);
                //             self.vote.subjects[self.tabIndex].selected = inTabIndex;
                //             self.vote.subjects.splice(self.dragIndex, 1);
                //             self.selected = null;
                //         } else {
                //             if ((self.parNodeIndex == self.tabIndex && self.dragIndex != inTabIndex && self.dragIndex != inTabIndex - 1) || self.parNodeIndex != self.tabIndex) {
                //                 let dragItem = self.vote.subjects[self.parNodeIndex].components[self.dragIndex];
                //                 self.vote.subjects[self.parNodeIndex].components.splice(self.dragIndex, 1)
                //                 if (inTabIndex > 0) {
                //                     self.vote.subjects[self.tabIndex].components.splice(inTabIndex, 0, dragItem);
                //                 } else if (inTabIndex == 0) {
                //                     self.vote.subjects[self.tabIndex].components.unshift(dragItem);
                //                 }
                //                 /*
                //                  self.vote.subjects[self.parNodeIndex].components.splice(self.dragIndex, 1);
                //                  self.vote.subjects[self.tabIndex].components.splice(inTabIndex, 0, dragItem);*/
                //                 self.selected = null;
                //                 self.vote.subjects[self.tabIndex].selected = inTabIndex;
                //             } else {
                //                 let dom = self.queryDomByIndex(self.queryDomByIndex(document, self.parNodeIndex), self.dragIndex);
                //                 dom.classList.remove('draging');
                //             }
                //         }
                //         self.dragIndex = null;
                //         self.isDrag = false;
                //     } else {
                //         //添加新组件
                //         let idx = 0;
                //         for (let i = 0; i < self.vote.subjects[self.tabIndex].components.length; i++) {
                //             let item = self.vote.subjects[self.tabIndex].components[i];
                //             if (item.name == component.componentView.name) {
                //                 idx++;
                //             }
                //         }
                //         component.componentView.idx = componentsLength;
                //         if (idx > 0) {
                //             component.componentView.defaultLable = component.componentView.defaultLable + "（" + idx + "）";
                //         }
                //         if (self.vote.subjects[self.tabIndex].InTableCanvas > 0) {
                //             self.vote.subjects[self.tabIndex].components.splice(self.vote.subjects[self.tabIndex].InTableCanvas, 0, component.componentView);
                //         } else if (self.vote.subjects[self.tabIndex].InTableCanvas == 0) {
                //             self.vote.subjects[self.tabIndex].components.unshift(component.componentView);
                //         }
                //
                //         drag.$emit('changeTab', true);
                //         drag.$emit("selectComponent", component.componentView)
                //     }
                //     for (let i = 0, l = self.vote.subjects.length; i < l; i++) {
                //         self.vote.subjects[i].InTableCanvas = null;
                //     }
                // }
                // if (self.vote.subjects.length <= 0) {
                //     self.isempty = true
                // } else {
                //     self.isempty = false
                // }
            })
            drag.$on("changeComponent", function (obj) {

                for (let i = 0; i < self.vote.subjects.length; i++) {
                    if(obj.idx == i) {
                        self.vote.subjects.splice(i, 1, obj)
                    }

                    // if (item.idx == obj.idx) {
                    //     self.vote.subjects.splice(i, 1, obj)
                    // } else if (item.componentType == 'tablefield') {
                    //     for (let m = 0, n = item.components.length; m < n; m++) {
                    //         if (obj.idx == item.components[m].idx) {
                    //             self.vote.subjects[i].components.splice(m, 1, obj)
                    //         }
                    //     }
                    // }
                }
            })
            drag.$on("changeInfo", function (obj) {
                self.title = obj.title;
                self.description = obj.description;
                self.icon = obj.icon;
            })
            drag.$on('save', function () {
                let obj={
                    title:self.title,
                    description:self.description,
                    icon:self.icon,
                    components:self.vote.subjects
                }
            })
        },
        mounted: function () {
            let dom = document.querySelector('.wf-formcanvas-inner')
            var actualLeft = dom.offsetLeft;
            var current = dom.offsetParent;
            while (current !== null) {
                actualLeft += current.offsetLeft;
                current = current.offsetParent;
            }
            var actualTop = dom.offsetTop;
            var current = dom.offsetParent;
            while (current !== null) {
                actualTop += current.offsetTop;
                current = current.offsetParent;
            }
            this.left = actualLeft
            this.top = actualTop
            this.width = dom.offsetWidth
            this.height = dom.offsetHeight
        },
        updated: function () {
            this.domArr = []
            let domArr = document.querySelectorAll('.wf-formcanvas-body>div>div>.wf-component')
            for (let i = 0, l = domArr.length; i < l; i++) {
                let obj = domArr[i];
                if (obj.className.indexOf('wf-component-tablefield') >= 0) {
                    let middleDomArr = [];
                    let objTop = obj.offsetTop;
                    let middleDom = obj.querySelectorAll('.wf-component')
                    for (let m = 0, n = middleDom.length; m < n; m++) {
                        let item = middleDom[m];
                        middleDomArr.push({
                            height: item.offsetHeight,
                            middle_top: (objTop + 18 + item.offsetTop + item.offsetHeight / 2) >> 0,
                            middle_lower: (objTop + 18 + item.offsetTop + item.offsetHeight / 2) >> 0,
                            top: item.offsetTop + objTop
                        })
                    }
                    this.domArr.push({
                        height: obj.offsetHeight,
                        middle_top: (obj.offsetTop + 18) >> 0,
                        middle: (obj.offsetTop + obj.offsetHeight / 2) >> 0,
                        middle_lower: (obj.offsetTop + obj.offsetHeight - 23) >> 0,
                        top: objTop,
                        domArr: middleDomArr
                    })
                } else {
                    this.domArr.push({
                        height: obj.offsetHeight,
                        middle: (obj.offsetTop + obj.offsetHeight / 2) >> 0,
                        middle_top: (obj.offsetTop + obj.offsetHeight / 2) >> 0,
                        middle_lower: (obj.offsetTop + obj.offsetHeight / 2) >> 0,
                        top: obj.offsetTop
                    })
                }

            }
        }
    }
</script>
