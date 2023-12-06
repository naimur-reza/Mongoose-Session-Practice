interface TErrorResponse {
  success: boolean;
  statusCode: number;
  error: TErrorIssue[];
}

interface TErrorIssue {
  path: string;
  message: string;
}

export default TErrorResponse;
