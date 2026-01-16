# Feature: Authentication

## Requirements
- Users can sign up and sign in
- Authentication handled by Better Auth on frontend
- Backend verifies user via JWT token

## Security
- All API routes require JWT
- Unauthorized requests return 401
- Users can only access their own tasks
