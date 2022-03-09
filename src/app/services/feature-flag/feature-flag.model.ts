import { Routes } from "@angular/router";

/**
 * @deprecated
 */
export abstract class FeatureFlagFactory {
  abstract getFeatureRoutes(): Routes;
}

/**
 * @deprecated - Use FeatureFlagRouterModule instead
 */
export type GetRoutesFactory = (routes: Routes) => (featureFlagFactory: FeatureFlagFactory) => Routes
