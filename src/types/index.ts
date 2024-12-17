export interface Question {
  question_id: number;
  question_text: string;
  question_image?: string;
  question_audio?: string;
  question_video?: string;
  correct_answer: string;
  category_id: number;
  difficulty_level: 'easy' | 'medium' | 'hard';
  options: Option[];
}

export interface Option {
  option_id: number;
  option_text: string;
  is_correct: boolean;
}

export interface Exam {
  exam_id: number;
  exam_title: string;
  exam_description: string;
  category_id: number;
  is_paid: boolean;
  price: number;
  start_time: string;
  end_time: string;
}

export interface Payment {
  payment_id: number;
  user_id: number;
  exam_id: number;
  amount: number;
  payment_method: string;
  status: 'pending' | 'completed' | 'failed';
}