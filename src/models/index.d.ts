import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class QuestionCategory {
  readonly id: string;
  readonly category?: string;
  readonly questions?: (QuestionQuestionCategory | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<QuestionCategory>);
  static copyOf(source: QuestionCategory, mutator: (draft: MutableModel<QuestionCategory>) => MutableModel<QuestionCategory> | void): QuestionCategory;
}

export declare class QuestionQuestionCategory {
  readonly id: string;
  readonly question: Question;
  readonly questioncategory: QuestionCategory;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<QuestionQuestionCategory>);
  static copyOf(source: QuestionQuestionCategory, mutator: (draft: MutableModel<QuestionQuestionCategory>) => MutableModel<QuestionQuestionCategory> | void): QuestionQuestionCategory;
}

export declare class Question {
  readonly id: string;
  readonly question: string;
  readonly QuestionQuestionCategories?: QuestionQuestionCategory[];
  readonly meetings?: (MeetingQuestion | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Question>);
  static copyOf(source: Question, mutator: (draft: MutableModel<Question>) => MutableModel<Question> | void): Question;
}

export declare class MeetingQuestion {
  readonly id: string;
  readonly meeting: Meeting;
  readonly question: Question;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<MeetingQuestion>);
  static copyOf(source: MeetingQuestion, mutator: (draft: MutableModel<MeetingQuestion>) => MutableModel<MeetingQuestion> | void): MeetingQuestion;
}

export declare class Meeting {
  readonly id: string;
  readonly meetingDate: string;
  readonly isDisabled?: boolean;
  readonly meetingScheduleID?: string;
  readonly MeetingQuestions?: (MeetingQuestion | null)[];
  readonly isCompleted?: boolean;
  readonly isStarted?: boolean;
  readonly annotations?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Meeting>);
  static copyOf(source: Meeting, mutator: (draft: MutableModel<Meeting>) => MutableModel<Meeting> | void): Meeting;
}

export declare class MeetingSchedule {
  readonly id: string;
  readonly startDate: string;
  readonly recurrenceRule?: string;
  readonly Member: Member;
  readonly Meetings?: (Meeting | null)[];
  readonly isDisabled?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<MeetingSchedule>);
  static copyOf(source: MeetingSchedule, mutator: (draft: MutableModel<MeetingSchedule>) => MutableModel<MeetingSchedule> | void): MeetingSchedule;
}

export declare class Member {
  readonly id: string;
  readonly name: string;
  readonly phoneNumber?: string;
  readonly isDisabled?: boolean;
  readonly email?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Member>);
  static copyOf(source: Member, mutator: (draft: MutableModel<Member>) => MutableModel<Member> | void): Member;
}