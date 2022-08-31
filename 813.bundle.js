"use strict";(self.webpackChunk_chievemints_ui=self.webpackChunk_chievemints_ui||[]).push([[813,772],{4772:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});const r="0x85fCaAFc0dA050FCE685DcB8965F0C1Aa1Ba466b"},30813:(e,t,n)=>{n.r(t),n.d(t,{Owners:()=>y,default:()=>k});var r=n(97301),a=n(8721),s=n(33541),o=n(64033),l=n(41135),c=n(2784),u=n(4772),i=n(62833),f=n(10289),m=n(60146),d=n(18813),w=n(14738),g=n(23244);const E=(0,s.m$)(i.rU),h={polygon:r.Ps`
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
  `},y=()=>{const{nftId:e}=(0,f.UO)(),t=(0,c.useMemo)((()=>(0,m.Ke)(Array.isArray(e)?e[0]:e)),[e]),[n]=(0,i.lr)(),s=n.get("start_after")??"",y=n.get("offset")??0,[k,p]=(0,c.useState)([]),$=t?BigInt(t).toString(10):null,A=(0,c.useMemo)((()=>h[g.Pm]),[]),[C,{loading:S,error:{message:b}={message:null},data:_}]=(0,a.t)(A??r.Ps`query Empty { id }`);(0,c.useEffect)((()=>{A&&C({variables:{tokenId:$,contractAddress:u.default.toLowerCase(),startAfter:s}})}),[$,s,A,C]);const[q,I]=(0,c.useState)("𝘜𝘯𝘬𝘯𝘰𝘸𝘯"),{ensProvider:P,roContract:v}=(0,w.$6)(),[F,N]=(0,c.useState)(null==A?`Retrieving owners requires access to a subgraph & one hasn’t been configured for the  ${(0,m.kC)(g.Pm)} network.`:b);return(0,c.useEffect)((()=>A&&N(b)),[A,b]),(0,c.useEffect)((()=>{(async()=>{if(t){const e=await(v?.uri(t));if(!e)return;const n=await fetch((0,m._m)(e)),r=await n.json();I(r.name)}})()}),[t,v]),(0,c.useEffect)((()=>{(async()=>{if(_){if(_.nfts.length>1)throw new Error(`Got ${_.nfts.length} NFTs`);1===_.nfts.length&&p(await Promise.all(_.nfts[0].ownership.map((async e=>{let{owner:t}=e;const n=await(P?.lookupAddress(t));n&&(t=n);const{quantity:r,id:a}=e;return{owner:t,quantity:r,id:a}}))))}})()}),[_,P]),S?c.createElement(c.Fragment,null,"Loading…"):c.createElement(o.xu,{ml:8},c.createElement(d.dL,null),c.createElement(o.X6,{mt:10,fontSize:20},q),F&&c.createElement(l.bZ,{status:"error"},c.createElement(l.zM,null),c.createElement(l.Cd,null,"¡Error!"),c.createElement(l.X,null,F)),0===k.length?c.createElement(l.bZ,{status:"warning"},c.createElement(l.zM,null),c.createElement(l.Cd,null,"¡Empty!"),c.createElement(l.X,null,"No owners found for token #",e,".")):c.createElement(o.GS,{start:Number(y)+1},k.map((({owner:e,quantity:t},n)=>c.createElement(o.HC,{key:n,ml:6},`${e} (${t})`)))),100===k.length&&c.createElement(E,{to:{pathname:`/owners?${new URLSearchParams({nftId:e,start_after:k.slice(-1)[0].id,offset:(Number(y)+100).toString()})}`}},"Next"))},k=y}}]);
//# sourceMappingURL=813.bundle.js.map