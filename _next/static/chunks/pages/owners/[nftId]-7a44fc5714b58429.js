(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[68,381],{1381:function(n,t,r){"use strict";r.r(t),t.default="0x2fD05e332fCb602772337a5684B189f26A92CFAB"},59977:function(n,t,r){"use strict";r.r(t),r.d(t,{Owners:function(){return _}});var e,s=r(20406),a=r(7328),o=r(28526),u=r.n(o),c=r(5632),i=r(60138),f=r(90592),d=r(64033),l=r(64618),w=r(2784),h=r(10508),p=r(95321),v=r(1381),x=r(52322),g=(0,i.Ps)(e||(e=(0,a.Z)(["\n  query NFTOwners(\n    $tokenId: String\n    $contractAddress: String\n    $startAfter: String\n  ) {\n    nfts(where:{ \n      contract: $contractAddress,\n      tokenID: $tokenId\n    }) {\n      ownership(where: {\n        id_gt: $startAfter\n      }) {\n        id\n        owner\n        quantity\n      }\n    }\n  }\n"]))),_=function(){var n=(0,c.useRouter)().query,t=n.nftId,r=n.start_after,e=void 0===r?"":r,a=n.offset,o=void 0===a?0:a,i=(0,w.useState)([]),_=i[0],k=i[1];console.debug({nftId:t,startAfter:e}),Array.isArray(t)&&(t=t[0]);var b=t?BigInt(t).toString():null,m=(0,f.a)(g,{variables:{tokenId:b,contractAddress:v.default.toLowerCase(),startAfter:e}}),A=m.loading,y=m.error,N=m.data,E=(0,w.useState)("\ud835\ude1c\ud835\ude2f\ud835\ude2c\ud835\ude2f\ud835\ude30\ud835\ude38\ud835\ude2f"),I=E[0],S=E[1],j=(0,l.$6)(),C=j.ensProvider,$=j.roContract;return console.debug({loading:A,error:y,data:N}),(0,w.useEffect)((function(){var n=function(){var n=(0,s.Z)(u().mark((function n(){var r,e,s;return u().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!t){n.next=12;break}return n.next=3,null===$||void 0===$?void 0:$.uri(t);case 3:return r=n.sent,n.next=6,fetch((0,h._m)(r));case 6:return e=n.sent,n.next=9,e.json();case 9:s=n.sent,console.debug({data:s}),S(s.name);case 12:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()}),[$]),(0,w.useEffect)((function(){var n=function(){var n=(0,s.Z)(u().mark((function n(){return u().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!N){n.next=8;break}if(1===N.nfts.length){n.next=3;break}throw new Error("Got ".concat(N.nfts.length," NFTs"));case 3:return n.t0=k,n.next=6,Promise.all(N.nfts[0].ownership.map(function(){var n=(0,s.Z)(u().mark((function n(t){var r,e;return u().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.owner,n.next=3,null===C||void 0===C?void 0:C.lookupAddress(r);case 3:return(e=n.sent)&&(r=e),n.abrupt("return",{owner:r,quantity:t.quantity,id:t.id});case 6:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()));case 6:n.t1=n.sent,(0,n.t0)(n.t1);case 8:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();n()}),[N]),A?"Loading\u2026":y?"Error! ".concat(y.message):(0,x.jsxs)(d.xu,{ml:8,children:[(0,x.jsx)(p.dL,{}),(0,x.jsx)(d.X6,{mt:10,fontSize:20,children:I}),(0,x.jsx)(d.GS,{start:Number(o)+1,children:_.map((function(n,t){return(0,x.jsxs)(d.HC,{ml:6,children:[console.debug({ownership:n}),"".concat(n.owner," (").concat(n.quantity,")")]},t)}))}),100===_.length&&(0,x.jsx)(d.rU,{href:"?start_after=".concat(_.slice(-1)[0].id,"&offset=").concat(Number(o)+100),children:"Next"})]})};t.default=_},71161:function(n,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/owners/[nftId]",function(){return r(59977)}])}},function(n){n.O(0,[730,226,321,774,888,179],(function(){return t=71161,n(n.s=t);var t}));var t=n.O();_N_E=t}]);