

import { Route, Routes } from "@angular/router";
import { Observable } from "rxjs";
import { FeatureFlagRoutesService } from "./feature-flag-routes-factory";

export interface FeatureFlagRoute extends Route {
    loadChildren: NonNullable<Route['loadChildren']>;
    loadFeatureChildren: NonNullable<Route['loadChildren']>;
    getFeatureFlag$: Observable<boolean>;
}

export abstract class FeatureFlagRoutesGetter {
  abstract getFeatureRoutes(): FeatureFlagRoute[];
}

export type FeatureFlagRoutesFactory = (routes: Routes) => (featureFlagRoutesService: FeatureFlagRoutesService) => Routes
