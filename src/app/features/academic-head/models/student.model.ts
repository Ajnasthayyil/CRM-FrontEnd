export interface Student {
  id: string;
  name: string;
  departmentId: number;
  email: string;
  phone: string;
  className: string;
  batch: string;
  semester: string;
  section: string;
  attendanceStatus: 'Present' | 'Absent' | 'Leave' | 'Late';
  photoUrl: string;
  attendanceSummary: {
    totalClasses: number;
    present: number;
    absent: number;
    leave: number;
    percentage: number;
  };
  currentMark?: string;
}
