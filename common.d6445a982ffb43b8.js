"use strict";(self.webpackChunkdynamic_module_loader=self.webpackChunkdynamic_module_loader||[]).push([[592],{2672:(B,C,o)=>{o.d(C,{Z:()=>z});var i=o(5e3),f=o(5056);const b=t=>a=>[...a.getRoutesFromFeatureFlagRoutesGetterService(),...a.getRoutesFromFeatureFlagRoutes(t)];var M=o(7579),O=o(5577),S=o(262),G=o(4482),L=o(5403),j=o(8421),U=o(5032);function x(t,a,e){const r=function P(t){var a,e;try{return t.path.split("/")}catch(r){return null!==(e=null===(a=t.path)||void 0===a?void 0:a.split("/"))&&void 0!==e?e:[]}}(e);if(r.length>t.length||"full"===e.pathMatch&&(a.hasChildren()||r.length<t.length))return null;const u={};for(let s=0;s<r.length;s++){const l=r[s],n=t[s];if(l.startsWith(":"))u[l.substring(1)]=n;else if(l!==n.path)return null}return{consumed:t.slice(0,r.length),posParams:u}}var V=o(2076),Z=o(9646);function v(t){return(0,i.CqO)(t)?t:(0,i.QGY)(t)?(0,V.D)(Promise.resolve(t)):(0,Z.of)(t)}class p{}class R{getFeatureRoutes(){return[]}}let y=(()=>{class t{constructor(e){this.featureFlagRoutesService=e,this.unsubscribe$=new M.x}getLoadChildrens(e,r,u,s){const l=v(e),n=()=>v(u());let c=!1;const F=m=>l.pipe((0,O.z)(g=>(m!==r()&&((0,i.X6Q)()&&console.error("Unable to safely use `alternativeLoadChildren`. Feature flag value is changing to rapidly during navigation to predict which initial `NgModule` to load. Falling back to `loadChildren` only and avoiding alternative module."),c=!0),c?n():g===m?v(s()):n())),(0,S.K)(g=>(console.error(g),c=!0,n())));return[()=>F(!0),()=>F(!1)]}getUrlMatchers(e,r){const u=null!=r?r:x;return[(s,l,n)=>e()?u(s,l,n):null,u]}getRoutesFromFeatureFlagRoute(e){const{loadChildren:r,alternativeLoadChildren:u,featureFlag:s}=e,l=s();let n="boolean"==typeof l?l:null,d=n;const c=v(l);"boolean"!=typeof l&&c.pipe(function $(t){return(0,G.e)((a,e)=>{(0,j.Xf)(t).subscribe((0,L.x)(e,()=>e.complete(),U.Z)),!e.closed&&a.subscribe(e)})}(this.unsubscribe$)).subscribe(h=>{null!=n||(n=h),d=h});const F=()=>{const h=s();return"boolean"==typeof h?h===n:d===n},[m,g]=this.getLoadChildrens(c,F,r,u),[D,I]=this.getUrlMatchers(F,e.matcher);return[Object.assign(Object.assign({},e),{loadChildren:m,matcher:D}),Object.assign(Object.assign({},e),{loadChildren:g,matcher:I})]}getRoutesFromFeatureFlagRoutes(e){return e.map(r=>r.alternativeLoadChildren?this.getRoutesFromFeatureFlagRoute(r):[r]).flat()}getRoutesFromFeatureFlagRoutesGetterService(){var e,r;return this.getRoutesFromFeatureFlagRoutes(null!==(r=null===(e=this.featureFlagRoutesService)||void 0===e?void 0:e.getFeatureRoutes())&&void 0!==r?r:[])}ngOnDestroy(){this.unsubscribe$.next(),this.unsubscribe$.complete()}}return t.\u0275fac=function(e){return new(e||t)(i.LFG(p))},t.\u0275prov=i.Yz7({token:t,factory:t.\u0275fac}),t})(),z=(()=>{class t{constructor(e){}static forChild(e,r){const u=null!=r?r:R;return{ngModule:t,providers:[{provide:p,useExisting:(0,i.Gpc)(()=>u)},y,{provide:f.Z6,useFactory:b(e),multi:!0,deps:[y,p]},{provide:i.deG,multi:!0,useValue:f.Z6}]}}}return t.\u0275fac=function(e){return new(e||t)(i.LFG(f.F0,8))},t.\u0275mod=i.oAB({type:t}),t.\u0275inj=i.cJS({providers:[R],imports:[f.Bz]}),t})()}}]);