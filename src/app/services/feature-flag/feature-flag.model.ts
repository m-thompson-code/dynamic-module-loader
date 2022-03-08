import { Routes } from "@angular/router";

export abstract class FeatureFlagFactory {
  abstract getFeatureRoutes(): Routes;
}

export type GetRoutesFactory = (routes: Routes) => (featureFlagFactory: FeatureFlagFactory) => Routes
