import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-home',
  templateUrl: './settings-home.component.html',
  styleUrls: ['./settings-home.component.scss']
})
export class SettingsHomeComponent {
  activeTab = 'general';
  
  toasterMessage: string | null = null;
  toasterTimeout: any;

  setTab(tab: string) {
    this.activeTab = tab;
  }

  showToaster(message: string) {
    this.toasterMessage = message;
    if (this.toasterTimeout) {
      clearTimeout(this.toasterTimeout);
    }
    this.toasterTimeout = setTimeout(() => {
      this.toasterMessage = null;
    }, 3000);
  }

  saveChanges() {
    this.showToaster('Settings saved successfully!');
  }

  toggleSetting(settingName: string) {
    this.showToaster(`${settingName} setting updated`);
  }
}
