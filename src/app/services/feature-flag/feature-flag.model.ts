import { Routes } from "@angular/router";

export enum FeatureFlag {
  ON = "ON",
  OFF = "OFF",
}

export abstract class FeatureFlagFactory {
  abstract getFeatureRoutes(): Routes;
}

export type GetRoutesFactory = (routes: Routes) => (featureFlagFactory: FeatureFlagFactory) => Routes
