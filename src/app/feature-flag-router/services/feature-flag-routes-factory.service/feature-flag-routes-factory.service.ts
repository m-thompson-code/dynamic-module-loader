import { Injectable } from "@angular/core";
import { LoadChildrenCallback, Route, Routes, UrlMatcher, UrlSegment, UrlSegmentGroup } from "@angular/router";
import { mergeMap, Observable, Subject, takeUntil, tap } from "rxjs";
import { defaultUrlMatcher } from "../../angular-utils/default-url-matcher";
import { wrapIntoObservable } from "../../angular-utils/wrap-into-observable";
import { FeatureFlagRoute, FeatureFlagRoutes } from "../../factories/feature-flag-routes-factory.model";
import { FeatureFlagRoutesService } from "../../feature-flag-routes.service";

@Injectable()
export class FeatureFlagRoutesFactoryService {
    readonly unsubscribe$ = new Subject<void>();

    constructor(private readonly featureFlagRoutesService: FeatureFlagRoutesService) {}

    getLoadChildrens(
        getFeatureFlag$: Observable<boolean>,
        loadChildren: LoadChildrenCallback,
        loadFeatureChildren: LoadChildrenCallback,
    ): [LoadChildrenCallback, LoadChildrenCallback] {
        return [
            () => getFeatureFlag$.pipe(
                mergeMap((featureFlag) => {
                    if (featureFlag) {
                        return wrapIntoObservable(loadFeatureChildren());
                    }
                        
                    return wrapIntoObservable(loadChildren());
                })
            ),
            () => getFeatureFlag$.pipe(
                mergeMap((featureFlag) => {
                    if (!featureFlag) {
                        return wrapIntoObservable(loadFeatureChildren());
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
        const featureFlag$ = wrapIntoObservable(featureFlag);

        let urlMatcherFeatureFlag = false;
        let loadChildrenFeatureFlag = false;

        featureFlag$.pipe(
            tap(value => urlMatcherFeatureFlag = value),
            takeUntil(this.unsubscribe$),
        ).subscribe();

        const loadChildrenFeatureFlag$ = featureFlag$.pipe(
            tap(value => loadChildrenFeatureFlag = value),
        );

        const featureFlagLatestValuesMatch = () => urlMatcherFeatureFlag === loadChildrenFeatureFlag;

        const [ firstLoadChildren, secondLoadChildren ] = this.getLoadChildrens(loadChildrenFeatureFlag$, loadChildren, alternativeLoadChildren);
        const [ firstUrlMatcher, secondUrlMatcher ] = this.getUrlMatchers(featureFlagLatestValuesMatch, featureFlagRoute.matcher);

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
