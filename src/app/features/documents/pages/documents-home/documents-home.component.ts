import { Component } from '@angular/core';

@Component({
  selector: 'app-documents-home',
  templateUrl: './documents-home.component.html',
  styleUrls: ['./documents-home.component.scss']
})
export class DocumentsHomeComponent {
  folders = [
    { name: 'Company Policies', count: 12, iconClass: 'blue' },
    { name: 'Employee Handbooks', count: 4, iconClass: 'green' },
    { name: 'Contracts', count: 45, iconClass: 'purple' },
    { name: 'Training Materials', count: 28, iconClass: 'orange' }
  ];

  recentDocuments = [
    { name: '2026_Holiday_Schedule.pdf', type: 'PDF', size: '1.2 MB', date: 'Jul 25, 2026', author: 'HR Dept' },
    { name: 'Employee_Code_of_Conduct.docx', type: 'DOCX', size: '2.5 MB', date: 'Jul 20, 2026', author: 'Admin' },
    { name: 'Q2_Performance_Review_Template.xlsx', type: 'XLSX', size: '850 KB', date: 'Jul 15, 2026', author: 'HR Dept' },
    { name: 'Health_Insurance_Policy_Updates.pdf', type: 'PDF', size: '3.1 MB', date: 'Jul 10, 2026', author: 'HR Dept' }
  ];

  toasterMessage: string | null = null;
  toasterTimeout: any;

  showToaster(message: string) {
    this.toasterMessage = message;
    if (this.toasterTimeout) {
      clearTimeout(this.toasterTimeout);
    }
    this.toasterTimeout = setTimeout(() => {
      this.toasterMessage = null;
    }, 3000);
  }

  triggerUpload(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const today = new Date();
      const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
      
      this.recentDocuments.unshift({
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        size: sizeMB,
        date: dateStr,
        author: 'Current User'
      });

      this.showToaster(`Successfully uploaded ${file.name}`);
    }
  }

  viewDocument(doc: any) {
    this.showToaster(`Opening document: ${doc.name}`);
  }

  downloadDocument(doc: any) {
    this.showToaster(`Downloading ${doc.name}...`);
  }
}
