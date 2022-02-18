export interface UserOAuth {
  id: number;
  code: string;
  name: string;
  avatar: string;
  email: string;
  language: string;
  socket_connection_token: string;
}

export interface UserOAuthResponse {
  data: UserOAuth;
}
