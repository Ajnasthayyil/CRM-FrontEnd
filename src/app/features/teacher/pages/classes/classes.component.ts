import { Component, OnInit } from '@angular/core';
import { ClassInfo } from '../../models/class.model';
import { ClassService } from '../../services/class.service';
import { MatDialog } from '@angular/material/dialog';
import { ClassDialogComponent } from './class-dialog/class-dialog.component';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {
  classes: ClassInfo[] = [];
  isLoading = true;

  constructor(
    private classService: ClassService,
    private dialog: MatDialog,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.classService.getClasses().subscribe(data => {
      this.classes = data;
      this.isLoading = false;
    });
  }

  viewClass(cls: ClassInfo) {
    this.toastService.info(`Viewing details for class: ${cls.className} - Section ${cls.section}`);
  }

  addClass() {
    const dialogRef = this.dialog.open(ClassDialogComponent, { width: '500px' });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.classService.addClass(result as ClassInfo).subscribe(newClass => {
          if (newClass) {
            this.classes.push(newClass);
            this.toastService.success(`Class '${newClass.className}' created successfully.`);
          }
        });
      }
    });
  }

  editClass(cls: ClassInfo) {
    const dialogRef = this.dialog.open(ClassDialogComponent, {
      width: '500px',
      data: cls
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.classService.updateClass(cls.id, result).subscribe(updated => {
          if (updated) {
            const index = this.classes.findIndex(c => c.id === cls.id);
            if (index !== -1) {
              this.classes[index] = updated;
              this.toastService.success(`Class '${updated.className}' updated successfully.`);
            }
          }
        });
      }
    });
  }

  deleteClass(cls: ClassInfo) {
    if (confirm(`Are you sure you want to delete ${cls.className} (${cls.section})?`)) {
      this.classService.deleteClass(cls.id).subscribe(success => {
        if (success) {
          const index = this.classes.findIndex(c => c.id === cls.id);
          if (index !== -1) {
            this.classes.splice(index, 1);
            this.toastService.success(`Class '${cls.className}' deleted successfully.`);
          }
        }
      });
    }
  }
}
