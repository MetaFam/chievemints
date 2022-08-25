"use strict";(self.webpackChunk_chievemints_ui=self.webpackChunk_chievemints_ui||[]).push([[709,772],{4772:(t,e,n)=>{n.r(e),n.d(e,{default:()=>r});const r="0x2fD05e332fCb602772337a5684B189f26A92CFAB"},813:(t,e,n)=>{n.r(e),n.d(e,{Owners:()=>h,default:()=>E});var r=n(7301),a=n(618),s=n(3541),o=n(4033),i=n(2687),l=n(2784),c=n(146),f=n(8813),u=n(4772),d=n(289),m=n(2833);const w=(0,s.m$)(m.rU),g=r.Ps`
  query NFTOwners(
    $tokenId: String
    $contractAddress: String
    $startAfter: String
  ) {
    nfts(where:{ 
      contract: $contractAddress,
      tokenID: $tokenId
    }) {
      ownership(where: {
        id_gt: $startAfter
      }) {
        id
        owner
        quantity
      }
    }
  }
`,h=()=>{const{nftId:t}=(0,d.UO)(),[e]=(0,m.lr)(),n=e.get("start_after")??"",r=e.get("offset")??0,s=(0,l.useMemo)((()=>(0,c.Ke)(Array.isArray(t)?t[0]:t)),[t]),[h,E]=(0,l.useState)([]),$=s?BigInt(s).toString(10):null,{loading:y,error:A,data:k}=(0,a.a)(g,{variables:{tokenId:$,contractAddress:u.default.toLowerCase(),startAfter:n}}),[S,p]=(0,l.useState)("𝘜𝘯𝘬𝘯𝘰𝘸𝘯"),{ensProvider:C,roContract:_}=(0,i.$6)();return(0,l.useEffect)((()=>{(async()=>{if(s){const t=await(_?.uri(s));if(!t)return;const e=await fetch((0,c._m)(t)),n=await e.json();p(n.name)}})()}),[s,_]),(0,l.useEffect)((()=>{(async()=>{if(k){if(k.nfts.length>1)throw new Error(`Got ${k.nfts.length} NFTs`);1===k.nfts.length&&E(await Promise.all(k.nfts[0].ownership.map((async t=>{let{owner:e}=t;const n=await(C?.lookupAddress(e));n&&(e=n);const{quantity:r,id:a}=t;return{owner:e,quantity:r,id:a}}))))}})()}),[k,C]),y?l.createElement(l.Fragment,null,"Loading…"):A?l.createElement(l.Fragment,null,`Error! ${A.message}`):l.createElement(o.xu,{ml:8},l.createElement(f.dL,null),l.createElement(o.X6,{mt:10,fontSize:20},S),0===h.length?l.createElement(o.xv,null,"Could not find an NFT with id ",t,"."):l.createElement(o.GS,{start:Number(r)+1},h.map((({owner:t,quantity:e},n)=>l.createElement(o.HC,{key:n,ml:6},`${t} (${e})`)))),100===h.length&&l.createElement(w,{to:{pathname:`/owners?${new URLSearchParams({nftId:t,start_after:h.slice(-1)[0].id,offset:(Number(r)+100).toString()})}`}},"Next"))},E=h}}]);
//# sourceMappingURL=709.bundle.js.map