import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from '../app/services/guard.service';
import { OfertaComponent } from './components/admin/oferta/oferta.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { CurriculumComponent } from './components/admin/curriculum/curriculum.component';
import { StepComponent } from './components/admin/step/step.component';
import { OfferDetailComponent } from './components/admin/offer-detail/offer-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: 'oferta', pathMatch: 'prefix' },
    { path: 'oferta', component: OfertaComponent },
    { path: 'oferta/detalle', component: OfferDetailComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
