export interface TErrorResponse {
  status: string;
  statusCode: number;
  message: string;
  issues: TErrorIssue;
}

export type TErrorIssue = {
  path: string;
  message: string;
}[];
