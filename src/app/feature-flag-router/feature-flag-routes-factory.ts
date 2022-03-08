import { Injectable } from '@angular/core';
import { LoadChildrenCallback, Route, Routes, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { mergeMap, Observable, Subject, takeUntil, tap } from 'rxjs';
import { defaultUrlMatcher } from './angular-utils/default-url-matcher';
import {
    FeatureFlagRoute,
    FeatureFlagRoutesFactory,
    FeatureFlagRoutesGetter,
} from './feature-flag-routes-factory.model';
import { wrapIntoObservable } from './angular-utils/wrap-into-observable';

export const featureFlagRoutesFactory: FeatureFlagRoutesFactory = 
    (routes: Routes) => (featureFlagRoutesService: FeatureFlagRoutesService) => featureFlagRoutesService.getFeatureFlagRoutes(routes);

@Injectable()
export class FeatureFlagRoutesService {
    constructor(private readonly featureFlagRoutesGetter: FeatureFlagRoutesGetter) {}

    readonly unsubscribe$ = new Subject<void>();

    getLoadChildrens(
        getFeatureFlag$: Observable<boolean>,
        loadChildren: LoadChildrenCallback,
        loadFeatureChildren: LoadChildrenCallback,
    ): [LoadChildrenCallback, LoadChildrenCallback] {
        return [
            () => getFeatureFlag$.pipe(
                mergeMap((featureFlag) => {
                    console.log('moo first featureFlag', featureFlag);
    
                    if (featureFlag) {
                        return wrapIntoObservable(loadFeatureChildren());
                    }
                        
                    return wrapIntoObservable(loadChildren());
                })
            ),
            () => getFeatureFlag$.pipe(
                mergeMap((featureFlag) => {
                    console.log('moo second featureFlag', featureFlag);
    
                    if (!featureFlag) {
                        return wrapIntoObservable(loadFeatureChildren());
                    }
                        
                    return wrapIntoObservable(loadChildren());
                })
            ),
        ]
    };

    getFeatureRoutePair(
        featureFlagRoute: FeatureFlagRoute
    ): [Route, Route] {

        const loadChildren = featureFlagRoute.loadChildren;
        const loadFeatureChildren = featureFlagRoute.loadFeatureChildren;
        
        let currentFeatureFlag = false;
        const getFeatureFlag = () => currentFeatureFlag;

        featureFlagRoute.getFeatureFlag$.pipe(
            tap(featureFlag => currentFeatureFlag = featureFlag),
            takeUntil(this.unsubscribe$),
        ).subscribe();

        let routedFeatureFlag = false;
        const getRoutedFeatureFlag = () => routedFeatureFlag;

        const routedFeatureFlag$ = featureFlagRoute.getFeatureFlag$.pipe(
            tap(featureFlag => routedFeatureFlag = featureFlag),
        );

        const [ firstLoadChildren, secondLoadChildren ] = this.getLoadChildrens(routedFeatureFlag$, loadChildren, loadFeatureChildren);

        return [
            {
                ...featureFlagRoute,
                loadChildren: firstLoadChildren,
                matcher: (segments: UrlSegment[], group: UrlSegmentGroup, route: Route) => {

                    if (getFeatureFlag() !== getRoutedFeatureFlag()) {
                        return null;
                    }
              
                    const previousMatcher = featureFlagRoute.matcher ?? defaultUrlMatcher;
                    return previousMatcher(segments, group, route);
                }
            },
            {
                ...featureFlagRoute,
                loadChildren: secondLoadChildren,
                matcher: (segments: UrlSegment[], group: UrlSegmentGroup, route: Route) => {
                    const previousMatcher = featureFlagRoute.matcher ?? defaultUrlMatcher;
                    return previousMatcher(segments, group, route);
                  }
            }
        ];
    };

    getFeatureFlagRoutes(routes: Routes): Routes {
        const featureFlagRoutes: Routes = this.featureFlagRoutesGetter
            .getFeatureRoutes()
            .map((route) => {
                if (!route.loadFeatureChildren) {
                    return [route];
                }

                return this.getFeatureRoutePair(route);
            })
            .flat();

        return [
            // // Override routes using a custom loadChildren that allows for overriding
            ...featureFlagRoutes,

            // Fallback to previous set of routes
            ...routes,
        ];
    }

    ngOnDestroy(): void {
        console.log('FeatureFlagRoutesService ngOnDestroy');
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
