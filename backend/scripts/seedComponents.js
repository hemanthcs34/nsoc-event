import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Component from '../models/Component.js';
import QuizQuestion from '../models/QuizQuestion.js';
import Admin from '../models/Admin.js';

dotenv.config();

// Component data (from frontend)
const components = [
  {
    name: 'DHT22 Temperature & Humidity Sensor',
    type: 'sensor',
    icon: '📡',
    description: 'Digital sensor for measuring temperature and humidity with high accuracy',
    price: 300,
    specifications: {
      'Temperature Range': '-40°C to 80°C',
      'Humidity Range': '0-100% RH',
      'Interface': 'Digital'
    },
    category: 'essential'
  },
  {
    name: 'LM358 Op-Amp',
    type: 'signal',
    icon: '⚡',
    description: 'Dual operational amplifier for signal conditioning and amplification',
    price: 150,
    specifications: {
      'Channels': '2',
      'Supply Voltage': '3-32V',
      'Gain Bandwidth': '1MHz'
    },
    category: 'essential'
  },
  {
    name: 'ESP32 Microcontroller',
    type: 'controller',
    icon: '🧠',
    description: 'Powerful microcontroller with built-in WiFi and Bluetooth',
    price: 400,
    specifications: {
      'CPU': 'Dual-core 240MHz',
      'RAM': '520KB',
      'Flash': '4MB'
    },
    category: 'essential'
  },
  {
    name: 'ESP8266 WiFi Module',
    type: 'communication',
    icon: '📶',
    description: 'Low-cost WiFi module for IoT connectivity',
    price: 250,
    specifications: {
      'Protocol': 'WiFi 802.11 b/g/n',
      'Frequency': '2.4GHz',
      'Range': '100m'
    },
    category: 'essential'
  },
  {
    name: 'ThingSpeak Cloud Platform',
    type: 'cloud',
    icon: '☁️',
    description: 'IoT cloud platform for data visualization and analysis',
    price: 200,
    specifications: {
      'Data Channels': '8',
      'Update Rate': '15 sec',
      'API': 'RESTful'
    },
    category: 'essential'
  },
  {
    name: 'Relay Module',
    type: 'actuator',
    icon: '🔌',
    description: 'Electromagnetic switch for controlling high-power devices',
    price: 180,
    specifications: {
      'Channels': '1',
      'Load': '10A 250VAC',
      'Control': '5V DC'
    },
    category: 'essential'
  },
  {
    name: 'Ultrasonic Distance Sensor',
    type: 'sensor',
    icon: '📡',
    description: 'Non-contact distance measurement using ultrasonic waves',
    price: 200,
    specifications: {
      'Range': '2cm to 400cm',
      'Accuracy': '3mm',
      'Frequency': '40kHz'
    },
    category: 'optional'
  },
  {
    name: 'ADC Converter Module',
    type: 'signal',
    icon: '⚡',
    description: 'Analog to Digital Converter for precise signal conversion',
    price: 220,
    specifications: {
      'Resolution': '16-bit',
      'Channels': '4',
      'Sample Rate': '860 SPS'
    },
    category: 'optional'
  },
  {
    name: 'Arduino Nano',
    type: 'controller',
    icon: '🧠',
    description: 'Compact microcontroller board based on ATmega328P',
    price: 350,
    specifications: {
      'CPU': 'ATmega328P 16MHz',
      'Digital I/O': '14',
      'Analog Input': '8'
    },
    category: 'optional'
  },
  {
    name: 'LoRa Module',
    type: 'communication',
    icon: '📶',
    description: 'Long-range, low-power wireless communication module',
    price: 380,
    specifications: {
      'Frequency': '868/915MHz',
      'Range': 'Up to 15km',
      'Power': '100mW'
    },
    category: 'optional'
  },
  {
    name: 'AWS IoT Core',
    type: 'cloud',
    icon: '☁️',
    description: 'Amazon managed cloud service for IoT device connectivity',
    price: 350,
    specifications: {
      'Protocol': 'MQTT, HTTP',
      'Security': 'TLS 1.2',
      'Scale': 'Billions of devices'
    },
    category: 'optional'
  },
  {
    name: 'Servo Motor',
    type: 'actuator',
    icon: '🔌',
    description: 'Precision rotary actuator with position control',
    price: 280,
    specifications: {
      'Torque': '1.8kg-cm',
      'Speed': '0.1s/60°',
      'Control': 'PWM'
    },
    category: 'optional'
  }
];

// Quiz questions (from frontend)
const quizQuestions = [
  {
    question: 'What does IoT stand for?',
    options: ['Internet of Things', 'Integration of Technology', 'Interface of Tools', 'Internet of Terminals'],
    correctAnswer: 0,
    points: 100,
    category: 'iot',
    difficulty: 'easy'
  },
  {
    question: 'Which protocol is commonly used for IoT device communication?',
    options: ['FTP', 'MQTT', 'SMTP', 'POP3'],
    correctAnswer: 1,
    points: 100,
    category: 'networking',
    difficulty: 'medium'
  },
  {
    question: 'What is the primary function of a sensor in an IoT system?',
    options: ['Store data', 'Collect data', 'Process data', 'Transmit data'],
    correctAnswer: 1,
    points: 100,
    category: 'iot',
    difficulty: 'easy'
  },
  {
    question: 'Which microcontroller is widely used for IoT projects?',
    options: ['Intel Core i7', 'ESP32', 'AMD Ryzen', 'NVIDIA Tesla'],
    correctAnswer: 1,
    points: 100,
    category: 'electronics',
    difficulty: 'easy'
  },
  {
    question: 'What is the purpose of signal conditioning in IoT?',
    options: ['Amplify or filter sensor signals', 'Store sensor data', 'Power the sensor', 'Display sensor values'],
    correctAnswer: 0,
    points: 100,
    category: 'electronics',
    difficulty: 'medium'
  },
  {
    question: 'Which cloud platform is specifically designed for IoT?',
    options: ['Google Drive', 'AWS IoT Core', 'Dropbox', 'OneDrive'],
    correctAnswer: 1,
    points: 100,
    category: 'iot',
    difficulty: 'medium'
  },
  {
    question: 'What does an actuator do in an IoT system?',
    options: ['Reads sensor data', 'Performs physical action', 'Stores data', 'Encrypts data'],
    correctAnswer: 1,
    points: 100,
    category: 'iot',
    difficulty: 'easy'
  },
  {
    question: 'Which wireless technology has the longest range?',
    options: ['Bluetooth', 'WiFi', 'LoRa', 'NFC'],
    correctAnswer: 2,
    points: 100,
    category: 'networking',
    difficulty: 'medium'
  },
  {
    question: 'What is the typical operating frequency of WiFi?',
    options: ['900 MHz', '1.8 GHz', '2.4 GHz', '5.8 GHz'],
    correctAnswer: 2,
    points: 100,
    category: 'networking',
    difficulty: 'medium'
  },
  {
    question: 'Which component converts analog signals to digital?',
    options: ['DAC', 'ADC', 'Op-Amp', 'Transistor'],
    correctAnswer: 1,
    points: 100,
    category: 'electronics',
    difficulty: 'medium'
  },
  {
    question: 'What is the main advantage of edge computing in IoT?',
    options: ['Cheaper hardware', 'Reduced latency', 'Better graphics', 'Larger storage'],
    correctAnswer: 1,
    points: 100,
    category: 'iot',
    difficulty: 'hard'
  },
  {
    question: 'Which protocol ensures secure data transmission in IoT?',
    options: ['HTTP', 'HTTPS/TLS', 'FTP', 'Telnet'],
    correctAnswer: 1,
    points: 100,
    category: 'networking',
    difficulty: 'hard'
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Component.deleteMany({});
    await QuizQuestion.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert components
    await Component.insertMany(components);
    console.log(`✅ Inserted ${components.length} components`);

    // Insert quiz questions
    await QuizQuestion.insertMany(quizQuestions);
    console.log(`✅ Inserted ${quizQuestions.length} quiz questions`);

    // Check if admin exists, if not create one
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      await Admin.create({
        username: 'admin',
        password: 'admin123',
        name: 'System Admin',
        email: 'admin@techsymphony.com',
        role: 'super_admin'
      });
      console.log('✅ Created admin user (username: admin, password: admin123)');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    console.log('\n✨ Database seeded successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

export default seedDatabase;
