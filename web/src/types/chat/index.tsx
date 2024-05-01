export type ChatStateType = {
  loading: boolean;
  isReady: boolean;
  mode: string;
  text: string;
};

export type HistoryStateType = {
  type: string;
  question: string;
  answer: string;
};
