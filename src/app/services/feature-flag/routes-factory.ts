import { Routes } from '@angular/router';
import { FeatureFlagFactory, GetRoutesFactory } from './feature-flag.model';

export const getRoutesFactory: GetRoutesFactory =
  (routes: Routes) =>
  (featureFlagFactory: FeatureFlagFactory): Routes => ([
    // Override routes using a custom loadChildren that allows for overriding
    ...featureFlagFactory.getFeatureRoutes(),
    
    // Fallback to previous set of routes
    ...routes,
  ]);
