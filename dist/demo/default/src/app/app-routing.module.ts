import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'login',
		loadChildren: 'pages/auth/auth.module#AuthModule'
	},
	{
		path: '',
		loadChildren: 'pages/pages.module#PagesModule'
	},
	{
		path: '**',
		redirectTo: '404',
		pathMatch: 'full'
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes)
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
