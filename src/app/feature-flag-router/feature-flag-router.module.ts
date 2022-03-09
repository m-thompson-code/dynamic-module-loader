import { forwardRef, ModuleWithProviders, NgModule, Type } from "@angular/core";
import { ROUTES, Routes } from "@angular/router";
import { featureFlagRoutesFactory } from "./factories/feature-flag-routes-factory";
import { FeatureFlagRoutesFactoryService } from "./services/feature-flag-routes-factory.service/feature-flag-routes-factory.service";
import { FeatureFlagRoutesService } from "./feature-flag-routes.service";

@NgModule()
export class FeatureFlagRouterModule {
    static forChild(routes: Routes, featureFlagRoutesService?: Type<FeatureFlagRoutesService>): ModuleWithProviders<FeatureFlagRouterModule> {
        return {
            ngModule: FeatureFlagRouterModule,
            providers: [
                { provide: FeatureFlagRoutesService, useExisting: forwardRef(() => featureFlagRoutesService) },
                FeatureFlagRoutesFactoryService,
                {
                    provide: ROUTES,
                    useFactory: featureFlagRoutesFactory(routes),
                    multi: true,
                    deps: [FeatureFlagRoutesFactoryService, FeatureFlagRoutesService]
                },
            ],
        }
    }
}
