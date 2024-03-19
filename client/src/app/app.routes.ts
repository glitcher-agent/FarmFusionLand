import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { ForgetComponent } from './pages/forget/forget.component';
import { RestComponent } from './pages/rest/rest.component';
import { ProductsComponent } from './pages/products/products.component';
import { CollectionComponent } from './pages/collection/collection.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { UpdateComponent } from './pages/update/update.component';

export const routes: Routes = [
    {
        path: '',redirectTo:'login', pathMatch:'full'
    },
    {
        path:'login',
        component:LoginComponent,
    },    
    {
        path:'home',
        component:HomeComponent,
    },
    {
        path:'register',
        component:RegisterComponent,
    },
    {
        path:'forget',
        component:ForgetComponent,
    },
    {
        path:'reset/:token',
        component:RestComponent,
    },
    {
        path:'products/:storename',
        component:ProductsComponent,
    },
    {
        path:'profiles',
        component:ProfilesComponent,
    },
    {
        path:'collection',
        component:CollectionComponent,
    },
    {
        path:'update',
        component:UpdateComponent,
    },
    {
        path:'checkout',
        component:CheckoutComponent,
    }
];
