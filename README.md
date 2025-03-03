# PlantPal 🌿

AI-powered plant disease detection and care assistant platform.

## Overview

PlantPal is an innovative mobile and web platform that helps users identify and treat plant diseases using advanced machine learning. By combining real-time image recognition with community knowledge and expert insights, we make plant care accessible to everyone.

## Features

- 🔍 Real-time disease detection using phone camera
- 🤖 AI-powered plant identification
- 💊 Treatment recommendations with local availability
- 📈 Growth tracking and prediction
- 📱 Offline model support for rural areas
- 👥 Community knowledge sharing
- 📚 Expert consultation system
- 📅 Plant care calendar and reminders

## Project Structure

```
plantpal/
├── src/
│   ├── frontend/          # React web application
│   ├── backend/           # FastAPI backend service
│   ├── ml_model/          # TensorFlow/PyTorch models
│   └── mobile_app/        # React Native mobile app
├── docs/                  # Documentation
├── tests/                 # Test suites
└── requirements.txt       # Python dependencies
```

## Technology Stack

### Frontend & Mobile
- React.js for web interface
- React Native for mobile app
- TailwindCSS for styling
- Redux for state management

### Backend
- FastAPI for REST API
- PostgreSQL for main database
- Redis for caching
- JWT for authentication

### Machine Learning
- TensorFlow/PyTorch for model development
- OpenCV for image processing
- MLflow for model tracking
- TensorFlow Lite for mobile deployment

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- PostgreSQL 13+
- Redis

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Roxonn-FutureTech/plantpal.git
cd plantpal
```

2. Set up Python environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Install frontend dependencies:
```bash
cd src/frontend
npm install
```

4. Install mobile app dependencies:
```bash
cd ../mobile_app
npm install
```

5. Set up environment variables:
```bash
cp .env.example .env
```

6. Start development servers:
```bash
# Backend
cd src/backend
uvicorn main:app --reload

# Frontend
cd ../frontend
npm start

# Mobile App
cd ../mobile_app
npm start
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Website: [roxonn.com](https://roxonn.com)
- GitHub: [@Roxonn-FutureTech](https://github.com/Roxonn-FutureTech)
