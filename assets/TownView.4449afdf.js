import{d as C,a as y,k as A,o as s,c as f,t as T,b4 as V,n as j,i as p,l as B,u as M,b2 as R,b3 as q,e as i,w as c,f as w,g as $,p as x,m as I,F as H,h as D}from"./index.40b514ba.js";import{V as E,a as F,b as L,c as N,_ as O}from"./UpgradeBuilding.vue_vue_type_script_setup_true_lang.b6fd3ba3.js";const z={key:0,class:"d-flex level align-center justify-center"},P=C({__name:"BuildsComponent",props:{build:{type:Object,required:!0}},setup(u){const r=u;let e=y(!1);const v=A(()=>r.build.type);return(g,o)=>(s(),f("div",{class:j(["build d-flex align-center justify-center",[{active:p(e)},p(v)]]),onClick:o[0]||(o[0]=l=>g.$emit("buildSelected",u.build)),onMouseover:o[1]||(o[1]=l=>B(e)?e.value=!0:e=!0),onMouseleave:o[2]||(o[2]=l=>B(e)?e.value=!1:e=!1)},[u.build.level?(s(),f("div",z,T(u.build.level),1)):V("",!0)],34))}});const U={class:"text-center"},W=C({__name:"CreateBuilding",props:{build:{type:Object,required:!0},buildAlreadInTown:{type:Array,required:!0},dialog:{type:Boolean,required:!0}},emits:["test","cancel"],setup(u,{emit:r}){const e=u,v=M(),g=R(),o=q(),{ressources:l}=g,k=I();function m(n){return e.buildAlreadInTown.includes(n)}const d={barrack:{crops:100,wood:10,stone:10,gold:10},cityHall:{crops:10,wood:10,stone:10,gold:10}};function a(n){const t=d[n];!S(t)||(v.updateTown(k.params.id.toString(),e.build.id,n),g.removeRessources({crops:t.crops,wood:t.wood,stone:t.stone,gold:t.gold}),o.update(),b())}function b(){r("cancel")}function S(n){return l.wood.value<n.wood?(console.warn("not enough wood"),!1):l.crops.value<n.crops?(console.warn("not enough crops"),!1):l.stone.value<n.stone?(console.warn("not enough stone"),!1):l.gold.value<n.gold?(console.warn("not enough gold"),!1):!0}return(n,t)=>(s(),f("div",U,[i(N,{modelValue:e.dialog,"onUpdate:modelValue":t[3]||(t[3]=_=>e.dialog=_),activator:"parent"},{default:c(()=>[i(E,null,{default:c(()=>[i(F,{class:"headline"},{default:c(()=>[w("Create building "+T(e.build.type)+" - Level "+T(e.build.level),1)]),_:1}),i(L,null,{default:c(()=>[i($,{color:"error",onClick:t[0]||(t[0]=_=>n.$emit("cancel"))},{default:c(()=>[w("Cancel")]),_:1}),m("barrack")?V("",!0):(s(),x($,{key:0,color:"primary",onClick:t[1]||(t[1]=_=>a("barrack"))},{default:c(()=>[w(" Barrack")]),_:1})),m("cityHall")?V("",!0):(s(),x($,{key:1,color:"primary",onClick:t[2]||(t[2]=_=>a("cityHall"))},{default:c(()=>[w(" City Hall")]),_:1}))]),_:1})]),_:1})]),_:1},8,["modelValue"])]))}}),h={id:"container-town",class:"grid-container"},G=C({__name:"TownMap",setup(u){const r=y(!1),e=y(!1),v=I(),o=M().getTown(v.params.id.toString());let l=y();const k=A(()=>{const d=[];return Object.keys(o).forEach(a=>{o[a].type!=="empty"&&d.push(o[a].type)}),d});function m(d){l.value=d,l.value.isEmpty?e.value=!e.value:r.value=!r.value}return(d,a)=>(s(),f("div",h,[(s(!0),f(H,null,D(p(o),(b,S)=>(s(),x(P,{build:b,class:"grid-item",key:S,onBuildSelected:m},null,8,["build"]))),128)),i(O,{dialog:r.value,build:p(l),onCancel:a[0]||(a[0]=b=>r.value=!r.value)},null,8,["dialog","build"]),i(W,{dialog:e.value,build:p(l),buildAlreadInTown:p(k),onCancel:a[1]||(a[1]=b=>e.value=!e.value)},null,8,["dialog","build","buildAlreadInTown"])]))}});const Q=C({__name:"TownView",setup(u){return(r,e)=>(s(),f("main",null,[i(G)]))}});export{Q as default};
