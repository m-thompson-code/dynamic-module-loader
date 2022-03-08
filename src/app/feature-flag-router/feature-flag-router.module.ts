import { forwardRef, ModuleWithProviders, NgModule, Type } from "@angular/core";
import { RouterModule, ROUTES, Routes } from "@angular/router";
import { featureFlagRoutesFactory, FeatureFlagRoutesService } from "./feature-flag-routes-factory";
import { FeatureFlagRoutesGetter } from "./feature-flag-routes-factory.model";

@NgModule({
    exports: [RouterModule],
})
export class FeatureFlagRouterModule {
    static forChild(routes: Routes, featureFlagRoutesGetter: Type<FeatureFlagRoutesGetter>): ModuleWithProviders<FeatureFlagRouterModule> {
        return {
            ngModule: FeatureFlagRouterModule,
            providers: [
                RouterModule,
                { provide: FeatureFlagRoutesGetter, useExisting: forwardRef(() => featureFlagRoutesGetter) },
                FeatureFlagRoutesService,
                {
                    provide: ROUTES,
                    useFactory: featureFlagRoutesFactory(routes),
                    multi: true,
                    deps: [FeatureFlagRoutesService, FeatureFlagRoutesGetter]
                }
            ],
        }
    }
}
