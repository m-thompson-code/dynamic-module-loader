import { Injectable, ɵisObservable as isObservable, ɵisPromise as isPromise } from "@angular/core";
import { LoadChildrenCallback, Route, Routes, UrlMatcher, UrlSegment, UrlSegmentGroup } from "@angular/router";
import { mergeMap, Observable, Subject, takeUntil, tap } from "rxjs";
import { defaultUrlMatcher } from "../../angular-utils/default-url-matcher";
import { wrapIntoObservable } from "../../angular-utils/wrap-into-observable";
import { FeatureFlagRoute, FeatureFlagRoutes } from "../../factories/feature-flag-routes-factory.model";
import { FeatureFlagRoutesService } from "../feature-flag-routes/feature-flag-routes.service";

@Injectable()
export class FeatureFlagRoutesFactoryService {
    readonly unsubscribe$ = new Subject<void>();

    constructor(private readonly featureFlagRoutesService: FeatureFlagRoutesService) {}

    getLoadChildrens(
        featureFlag$: Observable<boolean>,
        loadChildren: LoadChildrenCallback,
        alternativeFeatureChildren: LoadChildrenCallback,
    ): [LoadChildrenCallback, LoadChildrenCallback] {
        return [
            () => featureFlag$.pipe(
                mergeMap((featureFlag) => {
                    if (featureFlag) {
                        return wrapIntoObservable(alternativeFeatureChildren());
                    }
                        
                    return wrapIntoObservable(loadChildren());
                })
            ),
            () => featureFlag$.pipe(
                mergeMap((featureFlag) => {
                    if (!featureFlag) {
                        return wrapIntoObservable(alternativeFeatureChildren());
                    }
                        
                    return wrapIntoObservable(loadChildren());
                })
            ),
        ]
    };

    getUrlMatchers(featureFlagLatestValuesMatch: () => boolean, possibleUrlMatcher?: UrlMatcher): [UrlMatcher, UrlMatcher] {
        const urlMatcher = possibleUrlMatcher ?? defaultUrlMatcher;

        return [
            (segments: UrlSegment[], group: UrlSegmentGroup, route: Route) => {
                if (!featureFlagLatestValuesMatch()) {
                    return null;
                }
          
                return urlMatcher(segments, group, route);
            },
            urlMatcher
        ];
    }

    getRoutesFromFeatureFlagRoute(
        featureFlagRoute: FeatureFlagRoute
    ): [Route, Route] {
        const { loadChildren, alternativeLoadChildren, featureFlag } = featureFlagRoute;
        const featureFlag$ = wrapIntoObservable(featureFlag());

        let currentFeatureFlag: boolean | undefined;
        let initalFeatureFlag: boolean | undefined;

        featureFlag$.pipe(
            tap(value => {
                if (typeof initalFeatureFlag === 'undefined') {
                    initalFeatureFlag = value;
                }

                currentFeatureFlag = value;
            }),
            takeUntil(this.unsubscribe$),
        ).subscribe();

        const featureFlagLatestValuesMatchInitalValue = () => {
            const featureFlagValue = featureFlag();

            if (typeof featureFlagValue === 'boolean') {
                return featureFlagValue === initalFeatureFlag;
            }

            return currentFeatureFlag === initalFeatureFlag
        };

        const [ firstLoadChildren, secondLoadChildren ] = this.getLoadChildrens(featureFlag$, loadChildren, alternativeLoadChildren);
        const [ firstUrlMatcher, secondUrlMatcher ] = this.getUrlMatchers(featureFlagLatestValuesMatchInitalValue, featureFlagRoute.matcher);

        return [
            {
                ...featureFlagRoute,
                loadChildren: firstLoadChildren,
                matcher: firstUrlMatcher,
            },
            {
                ...featureFlagRoute,
                loadChildren: secondLoadChildren,
                matcher: secondUrlMatcher,
            }
        ];
    }

    getRoutesFromFeatureFlagRoutes(featureFlagRoutes: FeatureFlagRoutes): Routes {
        return featureFlagRoutes.map(featureFlagRoute => {
            if (!featureFlagRoute.alternativeLoadChildren) {
                return [featureFlagRoute];
            }

            return this.getRoutesFromFeatureFlagRoute(featureFlagRoute);
        }).flat();
    }

    getRoutesFromFeatureFlagRoutesGetterService(): Routes {
        const featureFlagRoutesFromService = this.featureFlagRoutesService?.getFeatureRoutes() ?? [];

        return this.getRoutesFromFeatureFlagRoutes(featureFlagRoutesFromService);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
