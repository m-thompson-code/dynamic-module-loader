import { Routes } from '@angular/router';
import { FeatureFlagFactory, GetRoutesFactory } from './feature-flag.model';

/**
 * @deprecated - Use FeatureFlagRouterModule instead
 */
export const getRoutesFactory: GetRoutesFactory =
  (routes: Routes) =>
  (featureFlagFactory: FeatureFlagFactory): Routes => {

    return [
      // Override routes using a custom loadChildren that allows for overriding
      ...featureFlagFactory.getFeatureRoutes(),
      
      // Fallback to previous set of routes
      ...routes,
    ];
  };
