import { Component, OnInit } from '@angular/core';

interface PayrollRecord {
  id: string;
  employeeName: string;
  role: string;
  department: string;
  basePay: number;
  allowances: number;
  deductions: number;
  netPay: number;
  status: 'Paid' | 'Pending' | 'Processing';
  payDate: string;
}

@Component({
  selector: 'app-payroll-home',
  templateUrl: './payroll-home.component.html',
  styleUrls: ['./payroll-home.component.scss']
})
export class PayrollHomeComponent implements OnInit {
  
  payrollRecords: PayrollRecord[] = [];
  
  metrics = {
    totalPayroll: 1250000,
    pendingApprovals: 3,
    nextPayDate: '31 Aug 2026',
    totalEmployees: 45
  };

  ngOnInit(): void {
    this.payrollRecords = [
      {
        id: 'PAY-001',
        employeeName: 'Dr. Vikram Singh',
        role: 'Principal',
        department: 'Leadership',
        basePay: 150000,
        allowances: 30000,
        deductions: 25000,
        netPay: 155000,
        status: 'Paid',
        payDate: '31 Jul 2026'
      },
      {
        id: 'PAY-002',
        employeeName: 'Anita Desai',
        role: 'Librarian',
        department: 'Support Staff',
        basePay: 45000,
        allowances: 5000,
        deductions: 4000,
        netPay: 46000,
        status: 'Paid',
        payDate: '31 Jul 2026'
      },
      {
        id: 'PAY-003',
        employeeName: 'Rahul Patel',
        role: 'Senior Science Teacher',
        department: 'Science',
        basePay: 75000,
        allowances: 15000,
        deductions: 10000,
        netPay: 80000,
        status: 'Pending',
        payDate: '31 Aug 2026'
      },
      {
        id: 'PAY-004',
        employeeName: 'Sunita Sharma',
        role: 'Math Teacher',
        department: 'Mathematics',
        basePay: 65000,
        allowances: 10000,
        deductions: 8000,
        netPay: 67000,
        status: 'Processing',
        payDate: '31 Aug 2026'
      }
    ];
  }

  runPayroll() {
    alert('Initiating payroll run for the current month...');
  }

  exportData() {
    alert('Exporting payroll data to CSV...');
  }

  viewPayslip(id: string) {
    alert(`Viewing payslip for ${id}`);
  }
}
