import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuickSidebarComponent } from './layout/quick-sidebar/quick-sidebar.component';

import { MatInputModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatTooltipModule} from '@angular/material';

@NgModule({
	declarations: [
		QuickSidebarComponent
	],
	exports: [
		QuickSidebarComponent
	],
	imports: [
		CommonModule,
		RouterModule,
		NgbModule,
		MatSortModule,
		MatProgressSpinnerModule,
		MatTableModule,
		MatPaginatorModule,
		MatSelectModule,
		MatProgressBarModule,
		MatButtonModule,
		MatCheckboxModule,
		MatIconModule,
		MatTooltipModule
	]
})
export class PartialsModule {}
