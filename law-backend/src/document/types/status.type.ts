export type TStatus = Partial<'todo' | 'done' | 'rejected'>;

export enum Status {
  TODO = 'todo',
  DONE = 'done',
  REJECT = 'reject',
}
