export interface eventProps {
  date: string;
  title: string;
  description: string;
  typeEvent: string;
  repeatedly: boolean;
}

export type eventState = Record<string, eventProps>;
