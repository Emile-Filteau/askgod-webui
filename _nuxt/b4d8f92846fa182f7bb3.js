(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{896:function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));var n={data:function(){return{snackbar:!1,color:"",timeout:6e3,text:""}},methods:{notify:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"error";this.text=t,this.color=e,this.snackbar=!0}}}},940:function(t,e,r){"use strict";r(10),r(9),r(8);var n=r(1),o=(r(72),r(6),r(3),r(214),r(31),r(32),r(4)),c=r(60),l=r(76);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}e.a=Object(o.a)(c.a,Object(l.b)("form")).extend({name:"v-form",inheritAttrs:!1,props:{lazyValidation:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(input){var t=this,e=function(input){return input.$watch("hasError",(function(e){t.$set(t.errorBag,input._uid,e)}),{immediate:!0})},r={_uid:input._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?r.shouldValidate=input.$watch("shouldValidate",(function(n){n&&(t.errorBag.hasOwnProperty(input._uid)||(r.valid=e(input)))})):r.valid=e(input),r},validate:function(){return 0===this.inputs.filter((function(input){return!input.validate(!0)})).length},reset:function(){this.inputs.forEach((function(input){return input.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(input){return input.resetValidation()})),this.resetErrorBag()},register:function(input){this.inputs.push(input),this.watchers.push(this.watchInput(input))},unregister:function(input){var t=this.inputs.find((function(i){return i._uid===input._uid}));if(t){var e=this.watchers.find((function(i){return i._uid===t._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(i){return i._uid!==t._uid})),this.inputs=this.inputs.filter((function(i){return i._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:d({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},958:function(t,e,r){"use strict";r.r(e);r(63);var n=r(16),o={mixins:[r(896).a],data:function(){return{valid:!0,flag:""}},computed:{disableForm:function(){return!this.valid}},methods:{submit:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n,text;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.$refs.form.validate()){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,t.$store.dispatch("SUBMIT_FLAG",t.flag);case 5:r=e.sent,n=r.ok,text=r.text,n?t.notify("Bravo! The flag is valid.","success"):text?text().then((function(e){return t.notify(e)})):console.error("Unhandled client error"),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(2),t.notify("Un exepected error occurred!");case 14:case"end":return e.stop()}}),e,null,[[2,11]])})))()}}},c=r(39),l=r(73),f=r.n(l),d=r(157),h=r(868),v=r(864),m=r(877),w=r(878),O=r(940),_=r(879),y=r(885),k=r(904),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",[r("v-row",{attrs:{align:"center",justify:"center"}},[r("v-col",{attrs:{cols:"12",md:"8"}},[r("v-card",[r("v-card-title",{attrs:{"primary-title":""}},[r("div",[r("h3",{staticClass:"headline mb-0"},[t._v("Submit a new flag")])])]),t._v(" "),r("v-card-text",[r("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(e){return e.preventDefault(),t.submit(e)}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[r("v-text-field",{attrs:{autofocus:"",rules:[function(t){return!!t||"Flag is required"}],label:"Flag",required:""},model:{value:t.flag,callback:function(e){t.flag=e},expression:"flag"}}),t._v(" "),r("v-btn",{attrs:{disabled:t.disableForm},on:{click:t.submit}},[t._v("\n              Submit\n            ")])],1)],1),t._v(" "),r("v-snackbar",{attrs:{timeout:t.timeout,color:t.color,bottom:"",left:""},model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v("\n          "+t._s(t.text)+"\n          "),r("v-btn",{attrs:{text:""},nativeOn:{click:function(e){t.snackbar=!1}}},[t._v("\n            Close\n          ")])],1)],1)],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;f()(component,{VBtn:d.a,VCard:h.a,VCardText:v.b,VCardTitle:v.c,VCol:m.a,VContainer:w.a,VForm:O.a,VRow:_.a,VSnackbar:y.a,VTextField:k.a})}}]);