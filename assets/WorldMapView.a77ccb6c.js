import{d as k,u as T,s as b,r as g,a as D,o as l,c as i,b as M,e as o,w as s,V as p,f,g as m,F as U,h as K,i as N,j as Q,n as S}from"./index.40b514ba.js";const E="/Trav-pve/assets/village.a6e86ce5.png",I="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAMAAADVRocKAAAAAXNSR0IArs4c6QAAAH5QTFRFIRgbOyAnfTgzq1Ewz3Ur8LVB/+6DyNRdY6s/O31PL1dTKDVAGx8hKytFOj9eTGiFT6S4kujA9f/o3+Doo6fCaG+ZQElzLDVNFBguSx1SaSRknCpwzC97/1J3/8Kh/4kz5kU5rS9FeB1PTx1MKR0rPSk2UjM/j01XvWpi/65wzeWaxgAAACp0Uk5TAP//////////////////////////////////////////////////////J0/sFAAAAI1JREFUaIHt2DEKwCAQRFFLzf0PHNBmYUGCszaZ/6sQcJ+FRWLrszHrF2oANoDSfnMAnkDtkQXwBDKjkAA+QB73zPQjC+AD5NGxEQIA2AM3AgA4Kx5oAAA9AIDiDy+AnwL6CAAAZXHeXHyzngEcgPxKIeOc9QMJ4ABUXTyNULyGAHAAvi8+gwEA9AAMgBcUmiWwKPvTZQAAAABJRU5ErkJggg==",P={id:"container-map"},L={id:"toolboxMap"},W={class:"d-flex align-center"},G={id:"map",class:"grid-container mx-2"},Y=["onClick"],j={key:0,src:E,alt:""},H={key:1,src:I,alt:""},J=k({__name:"WorldMap",setup(w){const v=T();v.initWorldMap(20,20);const{worldMap:h}=b(v),x=Q();function y(a){x.push(`/valley/${a}`)}let e=g({count:0}),t=g({count:0});function z(a,d){return h.value.tiles.filter(n=>n.id.includes(`[${a},${d}]`))}function c(a,d){let n=[];for(let A=2;A>=-2;A--)for(let _=-2;_<=2;_++)n.push(...z(a+_,d+A));return n}let r=g({tiles:c(0,0)});function V(){e.count<20-3?e.count+=1:e.count,r.tiles=c(e.count,t.count)}function B(){e.count>-20+3?e.count-=1:e.count,r.tiles=c(e.count,t.count)}function R(){t.count<20-3?t.count+=1:t.count,r.tiles=c(e.count,t.count)}function F(){t.count>-20+3?t.count-=1:t.count,r.tiles=c(e.count,t.count)}const u=D(!1);return(a,d)=>(l(),i("div",P,[M("div",L,[o(m,{small:"",onClick:B,disabled:u.value,size:"small"},{default:s(()=>[o(p,null,{default:s(()=>[f("mdi-arrow-left")]),_:1})]),_:1},8,["disabled"]),o(m,{small:"",onClick:R,disabled:u.value,size:"small"},{default:s(()=>[o(p,null,{default:s(()=>[f("mdi-arrow-up")]),_:1})]),_:1},8,["disabled"]),o(m,{small:"",onClick:F,disabled:u.value,size:"small"},{default:s(()=>[o(p,null,{default:s(()=>[f("mdi-arrow-down")]),_:1})]),_:1},8,["disabled"]),o(m,{small:"",onClick:V,disabled:u.value,size:"small"},{default:s(()=>[o(p,null,{default:s(()=>[f("mdi-arrow-right")]),_:1})]),_:1},8,["disabled"])]),M("div",W,[M("div",G,[(l(!0),i(U,null,K(N(r).tiles,(n,A)=>(l(),i("div",{class:S(["grid-item",{appear:u.value,isMyVillage:n.isMyVillage}]),key:A,onClick:_=>y(n.id)},[n.isVillage?(l(),i("img",j)):(l(),i("img",H))],10,Y))),128))])])]))}});const $=k({__name:"WorldMapView",setup(w){return(C,X)=>(l(),i("main",null,[o(J)]))}});export{$ as default};
