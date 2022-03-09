import { Injectable, isDevMode, Type } from "@angular/core";
import { LoadChildrenCallback, Route, Routes, UrlMatcher, UrlSegment, UrlSegmentGroup } from "@angular/router";
import { catchError, mergeMap, Observable, Subject, takeUntil } from "rxjs";
import { defaultUrlMatcher } from "../../angular-utils/default-url-matcher";
import { wrapIntoObservable } from "../../angular-utils/wrap-into-observable";
import { FeatureFlagRoute, FeatureFlagRoutes } from "../../factories/feature-flag-routes-factory.model";
import { FeatureFlagRoutesService } from "../feature-flag-routes/feature-flag-routes.service";


@Injectable()
export class FeatureFlagRoutesFactoryService {
    readonly unsubscribe$ = new Subject<void>();

    constructor(private readonly featureFlagRoutesService: FeatureFlagRoutesService) {}

    getLoadChildrens(
        featureFlag: Observable<boolean>,
        featureFlagMatchesdInitalValue: () => boolean,
        loadChildren: LoadChildrenCallback,
        alternativeFeatureChildren: LoadChildrenCallback,
    ): [() => Observable<Type<unknown>> , () => Observable<Type<unknown>> ] {
        const featureFlag$: Observable<boolean> = wrapIntoObservable(featureFlag);
        const module$: Observable<Type<unknown>> = wrapIntoObservable(loadChildren());
        const alternativeModule$: Observable<Type<unknown>> = wrapIntoObservable(alternativeFeatureChildren());

        let alternativeModuleIsUnsafe = false;

        const loadAlternativeOnFeatureFlag = (shouldLoadAlternative: boolean) => featureFlag$.pipe(
            mergeMap((value) => {
                if (shouldLoadAlternative !== featureFlagMatchesdInitalValue()) {
                    if (isDevMode()) {
                        console.error("Tracking feature flag value is unstable. Navigation can't predict which module to load. Falling back to `loadChildren` only and avoiding alternative module.");
                    }

                    alternativeModuleIsUnsafe = true;
                }

                if (alternativeModuleIsUnsafe) {
                    return module$;
                }

                if (value === shouldLoadAlternative) {
                    return alternativeModule$;
                }
                    
                return module$;
            }),
            catchError(error => {
                console.error(error);
                alternativeModuleIsUnsafe = true;
                return module$;
            })
        );

        return [
            () => loadAlternativeOnFeatureFlag(true),
            () => loadAlternativeOnFeatureFlag(false),
        ];
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
        const featureFlagValue = featureFlag();

        let initalFeatureFlag: boolean | null = typeof featureFlagValue === 'boolean' ? featureFlagValue : null;
        let currentFeatureFlag: boolean | null = initalFeatureFlag;
        
        const featureFlag$: Observable<boolean> = wrapIntoObservable(featureFlagValue);

        featureFlag$.pipe(
            takeUntil(this.unsubscribe$),
        ).subscribe(value => {
            initalFeatureFlag ??= value;
            currentFeatureFlag = value;
            console.log(initalFeatureFlag, currentFeatureFlag);
        });

        const featureFlagMatchesdInitalValue = () => {
            return currentFeatureFlag === initalFeatureFlag
        };

        const [ firstLoadChildren, secondLoadChildren ] = this.getLoadChildrens(featureFlag$, featureFlagMatchesdInitalValue, loadChildren, alternativeLoadChildren);
        const [ firstUrlMatcher, secondUrlMatcher ] = this.getUrlMatchers(featureFlagMatchesdInitalValue, featureFlagRoute.matcher);

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
        return this.getRoutesFromFeatureFlagRoutes(this.featureFlagRoutesService?.getFeatureRoutes() ?? []);
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
