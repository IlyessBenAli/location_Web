import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BsComponentComponent } from './bs-component.component';
import { AddPostComponent } from './components/add_posts/add_posts.component';
 
const routes: Routes = [
    {
        path: '',
        component: BsComponentComponent,
        children: [

 
          // Other child routes for BsComponentComponent
        ]
      },

      { path: 'add-post', component: AddPostComponent, data: { title: 'Addpost' } },


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BsComponentRoutingModule {}
