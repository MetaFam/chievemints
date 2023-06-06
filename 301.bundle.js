"use strict";(self.webpackChunk_chievemints_ui=self.webpackChunk_chievemints_ui||[]).push([[301,117],{95611:(e,n,t)=>{t.d(n,{Z:()=>m});var a=t(40272),r=t.n(a),i=t(82609),l=t.n(i)()(r());l.push([e.id,"\n  #PYZf1pIedwlYcZN3dnlA h1 {\n    font-size: clamp(2rem, 10vmin - 3ch, 12rem);\n    text-align: center;\n  }\n\n#PYZf1pIedwlYcZN3dnlA main {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n  }\n\n#PYZf1pIedwlYcZN3dnlA .AxWsOd_N5pN1xiMoGuyv {\n    margin-bottom: 3rem;\n  }\n\n#PYZf1pIedwlYcZN3dnlA .AxWsOd_N5pN1xiMoGuyv p {\n      font-size: clamp(1.5rem, 3vmin - 1ch, 4rem);\n      max-width: 65ch;\n      text-indent: 1em;\n      margin: auto 0.75em;\n      text-align: justify;\n    }\n\n.gUkRHukL1hEF47HMkovR {\n  max-width: 80vmin;\n  max-height: 80vmin;\n  border-radius: 5%;\n  padding: 3.5vw;\n  outline: 4px double #000;\n  margin-bottom: 3rem;\n}\n\n.SXSKkyakKyb5_aqwfFH7, .b3chMkGSCuTOcRmFEAgy, .kjVTnlLf2thEdjyG0Zjj {\n  border-radius: 2.5rem;\n  padding: 0;\n  width: 80dvw;\n  height: min(75ch, 100dvh);\n  overflow: hidden;\n  outline: 4px double #000;\n}\n","",{version:3,sources:["webpack://./src/styles/view.module.css"],names:[],mappings:";EACE;IACE,2CAA2C;IAC3C,kBAAkB;EACpB;;AAEA;IACE,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;EACzB;;AAEA;IACE,mBAAmB;EASrB;;AAPE;MACE,2CAA2C;MAC3C,eAAe;MACf,gBAAgB;MAChB,mBAAmB;MACnB,mBAAmB;IACrB;;AAIJ;EACE,iBAAiB;EACjB,kBAAkB;EAClB,iBAAiB;EACjB,cAAc;EACd,wBAAwB;EACxB,mBAAmB;AACrB;;AAEA;EACE,qBAAqB;EACrB,UAAU;EACV,YAAY;EACZ,yBAAyB;EACzB,gBAAgB;EAChB,wBAAwB;AAC1B",sourcesContent:["#style {\n  & h1 {\n    font-size: clamp(2rem, 10vmin - 3ch, 12rem);\n    text-align: center;\n  }\n\n  & main {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n  }\n\n  & .markdown {\n    margin-bottom: 3rem;\n\n    & p {\n      font-size: clamp(1.5rem, 3vmin - 1ch, 4rem);\n      max-width: 65ch;\n      text-indent: 1em;\n      margin: auto 0.75em;\n      text-align: justify;\n    }\n  }\n}\n\n.image {\n  max-width: 80vmin;\n  max-height: 80vmin;\n  border-radius: 5%;\n  padding: 3.5vw;\n  outline: 4px double #000;\n  margin-bottom: 3rem;\n}\n\n.video, .object, .model {\n  border-radius: 2.5rem;\n  padding: 0;\n  width: 80dvw;\n  height: min(75ch, 100dvh);\n  overflow: hidden;\n  outline: 4px double #000;\n}\n"],sourceRoot:""}]),l.locals={style:"PYZf1pIedwlYcZN3dnlA",markdown:"AxWsOd_N5pN1xiMoGuyv",image:"gUkRHukL1hEF47HMkovR",video:"SXSKkyakKyb5_aqwfFH7",object:"b3chMkGSCuTOcRmFEAgy",model:"kjVTnlLf2thEdjyG0Zjj"};const m=l},47301:(e,n,t)=>{t.r(n),t.d(n,{SelfMint:()=>d,SelfMintPage:()=>s,default:()=>A});var a=t(2784),r=t(96278),i=t(10289),l=t(80117),m=t(18671),o=t(11863),c=t(60829);const d=({tokenId:e})=>{const{rwContract:n,address:t}=(0,c.$6)(),[i,d]=(0,a.useState)(!1),s=(0,a.useCallback)((async()=>{try{d(!0);const a=await n["mint(address[],uint256,bytes)"]([t],BigInt(e),[]);await a.wait()}catch(e){console.error({error:e})}finally{d(!1)}}),[t,n,e]);return a.createElement("main",{id:"self-mint"},a.createElement(m.q,null,a.createElement("title",null,"Self-Mint NFT #",(0,r.pc)(e)),a.createElement("meta",{name:"description",content:"Mint a ’Chievemint NFT"})),a.createElement("form",{onSubmit:s},a.createElement(o.Mm,{purpose:"mint",processing:i}),a.createElement(l.View,{tokenId:e,header:!1}),a.createElement(o.Mm,{purpose:"mint",processing:i})))},s=()=>{const{nftId:e}=(0,i.UO)(),n=(0,r.Ke)(Array.isArray(e)?e[0]:e);return a.createElement(d,{tokenId:n})},A=s},80117:(e,n,t)=>{t.r(n),t.d(n,{View:()=>j,ViewPage:()=>M,default:()=>N});var a=t(2784),r=t(24703),i=t(53019),l=t(10289),m=t(18671),o=t(96111),c=t.n(o),d=t(96278),s=t(11863),A=t(60829),u=t(29027),E=t(46062),h=t.n(E),B=t(44036),g=t.n(B),p=t(96793),f=t.n(p),C=t(17892),w=t.n(C),k=t(11173),y=t.n(k),v=t(42464),b=t.n(v),x=t(95611),I={};I.styleTagTransform=b(),I.setAttributes=w(),I.insert=f().bind(null,"head"),I.domAPI=g(),I.insertStyleElement=y(),h()(x.Z,I);const Z=x.Z&&x.Z.locals?x.Z.locals:void 0,j=({tokenId:e,header:n=!0})=>{const[t,l]=(0,a.useState)(),[o,E]=(0,a.useState)(),{roContract:h}=(0,A.$6)();if((0,a.useEffect)((()=>{(async()=>{if(h&&e)try{let n=BigInt(e);n<2**32&&(n=await h.tokenByIndex(n));const t=await h.uri(n),a=(0,d._m)(t);if(!a)throw new Error(`Couldn't find metadata for token #${(0,d.pc)(e)}.`);const r=await fetch(a),i=await r.text();l(c().parse(i))}catch(e){E(e.message)}})()}),[h,e]),o)return a.createElement("aside",null,a.createElement("span",null,"Error: Loading NFT"),a.createElement("span",null,o));if(!t)return a.createElement("main",null,a.createElement(u.Z,{color:"#36d7b7",height:100}),a.createElement("p",null,"Loading Metadata for Token #",(0,d.pc)(e)));const{name:B,image:g,animation_url:p,description:f,background_color:C}=t;return a.createElement("div",{id:Z.style},n&&a.createElement(m.q,null,a.createElement("title",null,B," (#",(0,d.pc)(e),")"),a.createElement("meta",{name:"description",content:f})),a.createElement("header",null,a.createElement(s.dL,null)),a.createElement("header",null,B&&a.createElement("h1",null,B)),a.createElement("main",null,g&&a.createElement("object",{data:(0,d._m)(g)??void 0,title:B,className:Z.image,style:{backgroundColor:`#${C}`}}),f&&a.createElement(r.D,{className:Z.markdown,remarkPlugins:[i.Z],linkTarget:"_blank"},f),p&&(()=>{const e=(0,d._m)(p)??void 0;return/(mpe?g|mp4)$/i.test(p)?a.createElement("video",{controls:!0,autoPlay:!0,loop:!0,muted:!0,className:Z.video},a.createElement("source",{src:e})):/(glb|gltf)$/i.test(p)?a.createElement(s.cO,{model:e,className:Z.model,bg:C}):a.createElement("object",{data:e,title:B,className:Z.object})})()))},M=()=>{const{nftId:e}=(0,l.UO)(),n=(0,d.Ke)(Array.isArray(e)?e[0]:e);return a.createElement(j,{tokenId:n})},N=M}}]);
//# sourceMappingURL=301.bundle.js.map