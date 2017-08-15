import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { CurrentComponent } from './current/current.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ResolveLocationService } from './resolve-location.service';

const WEATHER_ROUTES: Routes = [
    {path: '', redirectTo: '/current', pathMatch: 'full'},
    {path: 'current', component: CurrentComponent, resolve: {myWeather: ResolveLocationService}},
    {path: 'forecast', component: ForecastComponent}
];

export const weatherRouting:ModuleWithProviders = RouterModule.forRoot(WEATHER_ROUTES);