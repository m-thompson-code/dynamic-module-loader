// import { ModuleWithProviders, NgModule } from "@angular/core";
// import { provideRoutes, Router, RouterModule, ROUTES, Routes } from "@angular/router";
// import { of } from "rxjs";
// import { FeatureFlagFactory } from "../services/feature-flag/feature-flag.model";
// import { getRoutesFactory } from "../services/feature-flag/routes-factory";

// @NgModule({
//     exports: [RouterModule],
// })
// export class FeatureFlagRouterModule {
//     static forChild(routes?: Routes): ModuleWithProviders<FeatureFlagRouterModule> {
//         return {
//             ngModule: FeatureFlagRouterModule, 
//             providers: [
//                 provideRoutes(routes ?? []),
//             ]
//         };
//     }
// }

// @NgModule({
//     // imports: [RouterModule.forChild(ROUTES)],
//     exports: [RouterModule],
// })
// export class FeatureFlagSpliterModule {
//     constructor(private router: Router) {
//         console.log("hello", router);
//     }

//     static forChild(routes?: Routes): ModuleWithProviders<FeatureFlagSpliterModule> {
//         const hack = routes?.map(route => {
//             const loadChildren = route.loadChildren;
//             if (!loadChildren) {
//                 return route;
//             }

//             return {
//                 ...route,
//                 path: '**',

//                 loadChildren: () => Promise.resolve(FeatureFlagRouterModule.forChild([{
//                     ...route,
//                     path: '**',
//                 }]).ngModule),
//                 // loadChildren: () => loadChildren(),
//             };
//         }) ?? [];
//         console.log(hack);
//         return {
//             ngModule: FeatureFlagSpliterModule, 
//             providers: [
//                 provideRoutes(hack)
//             ]
//         };
//     }
// }