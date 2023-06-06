"use strict";(self.webpackChunk_chievemints_ui=self.webpackChunk_chievemints_ui||[]).push([[381,195],{40195:(e,t,n)=>{n.r(t),n.d(t,{default:()=>r});const r="0x85fCaAFc0dA050FCE685DcB8965F0C1Aa1Ba466b"},85381:(e,t,n)=>{n.r(t),n.d(t,{Owners:()=>w,default:()=>g});var r=n(97301),a=n(8721),s=n(2784),l=n(40195),o=n(10289),c=n(62833),i=n(96278),u=n(11863),f=n(60829),m=n(29051);const d={polygon:r.Ps`
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
  `},w=()=>{const{nftId:e}=(0,o.UO)(),t=(0,s.useMemo)((()=>(0,i.Ke)(Array.isArray(e)?e[0]:e)),[e]),[n]=(0,c.lr)(),w=n.get("start_after")??"",g=n.get("offset")??0,[h,E]=(0,s.useState)(null),p=t?BigInt(t).toString(10):null,y=(0,s.useMemo)((()=>d[m.Pm]),[]),[k,{loading:A,error:{message:$}={message:null},data:S}]=(0,a.t)(y??r.Ps`query Empty { id }`);(0,s.useEffect)((()=>{y&&k({variables:{tokenId:p,contractAddress:l.default.toLowerCase(),startAfter:w}})}),[p,w,y,k]);const[b,v]=(0,s.useState)("𝘜𝘯𝘬𝘯𝘰𝘸𝘯"),{ensProvider:C,roContract:N}=(0,f.$6)(),[_,q]=(0,s.useState)(null==y?`Retrieving owners requires access to a subgraph & one hasn’t been configured for the  ${(0,i.kC)(m.Pm)} network.`:$);return(0,s.useEffect)((()=>y&&q($)),[y,$]),(0,s.useEffect)((()=>{(async()=>{if(t){const e=await(N?.uri(t));if(!e)return;const n=await fetch((0,i._m)(e)),r=await n.json();v(r.name)}})()}),[t,N]),(0,s.useEffect)((()=>{(async()=>{if(S){if(S.nfts.length>1)throw new Error(`Got ${S.nfts.length} NFTs`);1===S.nfts.length&&E(await Promise.all(S.nfts[0].ownership.map((async e=>{let{owner:t}=e;const n=await(C?.lookupAddress(t));n&&(t=n);const{quantity:r,id:a}=e;return{owner:t,quantity:r,id:a}}))))}})()}),[S,C]),A||null==h?s.createElement(s.Fragment,null,"Loading…"):s.createElement("section",null,s.createElement(u.dL,null),s.createElement("h1",null,b),_&&s.createElement("div",{className:"error"},s.createElement("span",null,"¡Error!"),":",s.createElement("span",null,_)),0===h.length?s.createElement("div",{className:"warning"},s.createElement("span",null,"¡Empty!"),":",s.createElement("span",null,"No owners found for token #",e,".")):s.createElement("ol",{start:Number(g)+1},h.map((({owner:e,quantity:t},n)=>s.createElement("li",{key:n},`${e} (${t})`)))),100===h.length&&s.createElement(c.rU,{to:{pathname:`/owners?${new URLSearchParams({nftId:e,start_after:h.slice(-1)[0].id,offset:(Number(g)+100).toString()})}`}},"Next"))},g=w}}]);
//# sourceMappingURL=381.bundle.js.map