# Kowa High School Birnin Gwari - Fee Payment System

A responsive web application for managing student fee payments with separate interfaces for students and administrators.

## Features

### Student Features
- User registration and login
- View fee schedules with due dates
- Make payments (mock payment system)
- View payment history
- Download payment receipts
- Mobile-responsive interface

### Admin Features
- Dashboard with payment statistics
- View and confirm pending payments
- Manage student records
- Filter payments by status
- Revenue tracking

## Default Admin Account

**Admin Account:**
- Email: admin@kowahs.edu.ng
- Password: KowaHS@2024!Admin

*Note: Students can register their own accounts through the registration form.*

## Installation & Setup

1. **Clone/Download the project**
2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```
   The app will open at http://localhost:3000

## Deployment Options

### Option 1: Static Hosting (Recommended)
1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder to:**
   - **Netlify:** Drag and drop the build folder
   - **Vercel:** Connect your GitHub repo or upload build folder
   - **GitHub Pages:** Upload build contents to gh-pages branch
   - **Firebase Hosting:** Use Firebase CLI

### Option 2: Mobile App (Future Enhancement)
To convert to a mobile app:
- Use **Capacitor** or **Cordova** to wrap the web app
- Deploy to app stores using the wrapped version

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Main application pages
│   ├── Login.js        # Authentication page
│   ├── StudentDashboard.js
│   └── AdminDashboard.js
├── context/            # React Context for state management
│   └── AuthContext.js  # Authentication & payment logic
├── utils/              # Utilities and mock data
│   └── mockData.js     # Sample users, fees, payments
└── styles/             # CSS styling files
```

## Security Features

- Basic authentication with role-based access
- Session management with localStorage
- Input validation and error handling
- Secure routing with protected pages

## Technical Stack

- **Frontend:** React 18, React Router
- **Styling:** CSS3 with responsive design
- **State Management:** React Context API
- **Data:** Mock data (no backend required)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Real payment gateway integration
- Backend API with database
- Email notifications
- Advanced reporting
- Multi-language support
- Native mobile app versions