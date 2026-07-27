export interface Teacher {
  id: string;
  name: string;
  departmentId: number;
  email: string;
  phone: string;
  subject: string;
  designation: string;
  joiningDate: string;
  gender: string;
  dob: string;
  qualification: string;
  experience: string;
  attendanceStatus: 'Present' | 'Absent' | 'Leave' | 'Late';
  performanceStatus: 'Excellent' | 'Very Good' | 'Good' | 'Needs Improvement' | 'Unsatisfactory' | 'Pending';
  status: 'Active' | 'Inactive';
  photoUrl: string;
  attendanceSummary: {
    present: number;
    absent: number;
    leave: number;
    late: number;
    percentage: number;
  };
  currentMark?: string;
}
