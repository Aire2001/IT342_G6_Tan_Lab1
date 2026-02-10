# User Authentication Web App - ReactJS

A full-featured React application with user authentication, registration, login, and protected dashboard.

## Features

✅ **User Registration** - Create new accounts with email and password
✅ **User Login** - Secure login with JWT token authentication
✅ **Protected Dashboard** - Access user profile only when authenticated
✅ **User Profile Page** - View and manage user information
✅ **Logout Functionality** - Secure logout with token cleanup
✅ **Responsive Design** - Mobile-friendly interface
✅ **Error Handling** - User-friendly error messages
✅ **Token Management** - JWT tokens stored securely in localStorage

## Tech Stack

- **React 18** - UI library
- **React Router 6** - Client-side routing and protected routes
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and dev server
- **Context API** - State management

## Project Structure

```
src/
├── pages/
│   ├── Home.jsx           # Landing page
│   ├── Register.jsx       # Registration page
│   ├── Login.jsx          # Login page
│   └── Dashboard.jsx      # Protected dashboard/profile page
├── components/
│   ├── Navigation.jsx     # Navigation bar with dynamic links
│   └── ProtectedRoute.jsx # Route guard for authenticated pages
├── context/
│   └── AuthContext.jsx    # Authentication context and hooks
├── api/
│   └── axios.js          # Axios instance with interceptors
├── App.jsx               # Main app component with routes
├── main.jsx              # React entry point
└── index.css             # Global styles
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:8080`

### Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:3000`

3. **Build for production**
   ```bash
   npm run build
   ```

## API Integration

The app communicates with the backend API at `http://localhost:8080/api`. The following endpoints are used:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/user/me` - Get current user info

All requests (except register/login) include the JWT token in the Authorization header.

## Authentication Flow

1. User registers with email and password
2. User logs in with credentials
3. Backend returns JWT token
4. Token is stored in localStorage
5. Token is included in all subsequent API requests
6. Protected routes check for valid token before allowing access
7. User logs out, token is cleared

## Key Components

### AuthContext
Manages authentication state globally:
- User info
- Loading state
- Error messages
- login/register/logout functions

### ProtectedRoute
Wrapper component that:
- Checks if user is authenticated
- Redirects to login if not
- Loads dashboard if authenticated

### Navigation
Dynamic navbar that shows:
- Login/Register links (if not authenticated)
- Dashboard/Logout buttons (if authenticated)
- User's first name (if authenticated)

## Usage Examples

### Registering a user
1. Click "Register" in navigation
2. Fill in first name, last name, email, and password
3. Click "Register" button
4. Redirected to login page

### Logging in
1. Click "Login" in navigation
2. Enter email and password
3. Click "Login" button
4. Redirected to dashboard

### Accessing dashboard
1. Must be logged in
2. Navigate to "Dashboard" link
3. View user profile information
4. Click logout to exit

## Environment Configuration

Create a `.env` file in the root directory:

```
VITE_API_BASE_URL=http://localhost:8080/api
```

Currently set to localhost:8080. Update if your backend runs on a different server.

## Error Handling

- **Network errors** - User-friendly error messages displayed
- **Validation errors** - Client-side validation before submission
- **API errors** - Handled by axios interceptors
- **401 Unauthorized** - Automatic redirect to login page
- **Invalid token** - Token cleared, user logged out

## Security Features

- JWT token-based authentication
- Secure password storage (handled by backend)
- Protected routes that check authentication
- Automatic logout on invalid token
- No sensitive data in localStorage except token

## Future Enhancements

- Edit profile functionality
- Change password feature
- Remember me option
- Social media login
- Two-factor authentication
- Email verification
- Password reset functionality

## Troubleshooting

**CORS errors?**
- Ensure backend has CORS enabled
- Check that backend is running on port 8080

**Login fails with 401?**
- Verify backend is running
- Check email and password are correct
- Ensure AWS/Database is properly configured

**Can't access dashboard after login?**
- Check browser console for errors
- Verify token is in localStorage
- Ensure `/auth/user/me` endpoint is working

## License

This project is part of IT342 Lab assignment.
