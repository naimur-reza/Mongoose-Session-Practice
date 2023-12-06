interface TErrorResponse {
  status: string;
  statusCode: number;
  message: string;
  issues: TErrorIssue[];
}

interface TErrorIssue {
  path: string;
  message: string;
}

export default TErrorResponse;
