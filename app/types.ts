export interface Teacher {
  id: string;
  name: string;
  email: string;
}

export interface Assignment {
  id: string;
  name: string;
  start: string;
  due: string;
  course_id: string;
  student_id: string;
  grade: number;
}

export interface Project {
  id: string;
  name: string;
  start: string;
  due: string;
  course_id: string;
  grade: number;
}


export interface Course {
  id: string;
  name: string;
  location: string;
  code: string;
  start: string;
  end: string;
  days: string;
}

export interface Student {
  id: string;
  name: string;
  grade: number;
  passing: "Passing" | "Failing";
}
