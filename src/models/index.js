// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { QuestionCategory, QuestionQuestionCategory, Question, MeetingQuestion, Meeting, MeetingSchedule, Member } = initSchema(schema);

export {
  QuestionCategory,
  QuestionQuestionCategory,
  Question,
  MeetingQuestion,
  Meeting,
  MeetingSchedule,
  Member
};