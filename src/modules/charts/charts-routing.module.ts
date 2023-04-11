/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ChartsModule } from './charts.module';

/* Containers */
import * as chartsContainers from './containers';

/* Guards */
import * as chartsGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [],
        component: chartsContainers.ChartsComponent,
        data: {
            title: 'Ordem de serviço - Ótica Panda',
            breadcrumbs: [
                {
                    text: 'SGO',
                    link: '/dashboard',
                },
                {
                    text: 'Cadastrar',
                    active: true,
                },
            ],
        } as SBRouteData,
    },
];

@NgModule({
    imports: [ChartsModule, RouterModule.forChild(ROUTES), ],
    exports: [RouterModule],
})
export class ChartsRoutingModule {}
