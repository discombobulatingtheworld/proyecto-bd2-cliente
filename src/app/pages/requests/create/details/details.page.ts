import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule, MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class DetailsPage implements OnInit {
  protected processing: boolean = false;
  protected isAlertOpen: boolean = false;
  protected alertMessage: string = '';
  protected alertButtons: any = ['Ok'];

  protected requestCreationDetailsForm = this.formBuilder.group({
    title: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    location: new FormControl<string>('', Validators.required),
  });


  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }

  protected onBack() {
    this.navCtrl.navigateBack('/requests/requests');
  }

  protected onNext() {
    this.navCtrl.navigateForward('/requests/create/skills');
  }

}
