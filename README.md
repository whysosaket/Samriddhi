# Samriddhi Financial Application

### Samriddhi

Samriddhi is a full-stack financial application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) along with Framer Motion, Atropos, and Tailwind CSS. It aims to revolutionize financial services by offering digital payments, fund management, insurance integration, and enhanced security features.

## Features

- **Digital Payments:** Seamlessly make payments using phone numbers without requiring a smartphone. Verification is done using voice recognition for added security.
- **Fund Management:** Create and manage community funds with rotating roles for fund managers. Participants can contribute to national funds for collective financial assistance.
- **Insurance Integration:** Access insurance products tailored to individual needs, enhancing financial security and stability.
- **Enhanced Security:** Transactions are safeguarded with multi-factor authentication, including secure PINs and voice recognition for verification.

## Technologies Used

- **Frontend:** React.js, Framer Motion, Atropos, Tailwind CSS, Aceternity UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** HTTPS, Secure PINs, Voice Recognition

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/whysosaket/samriddhi.git
   ```

2. Navigate to the project directory:
   ```bash
   cd samriddhi
   ```

3. Install dependencies for both frontend and backend:
   ```bash
   cd client
   npm install

   cd ../server
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the backend directory.
   - Add necessary environment variables (e.g., MongoDB URI, JWT secret, etc.).

5. Start the development server for both frontend and backend:
   ```bash
   cd client
   npm run dev

   cd ../server
   npm run dev
   ```

6. Access the application in your browser at `http://localhost:5173`.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. For major updates, please open an issue first to discuss the proposed changes.


## Contact

For any inquiries or feedback, please contact [Your Name](mailto:your.email@example.com).
