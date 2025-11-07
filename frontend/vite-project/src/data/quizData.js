// Round 1 Quiz Questions - 12 questions worth ₹100 each
export const quizQuestions = [
  {
    id: 1,
    question: "What does IoT stand for?",
    options: [
      "Internet of Things",
      "Integration of Technology",
      "Interface of Terminals",
      "Intelligence of Transmission"
    ],
    correctAnswer: 0,
    difficulty: "easy",
    category: "basics"
  },
  {
    id: 2,
    question: "Which component is responsible for converting analog sensor signals to digital data?",
    options: [
      "Microcontroller",
      "ADC (Analog-to-Digital Converter)",
      "DAC (Digital-to-Analog Converter)",
      "Actuator"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    category: "hardware"
  },
  {
    id: 3,
    question: "In a typical IoT system, what is the primary role of a microcontroller?",
    options: [
      "Store large amounts of data",
      "Process sensor data and make decisions",
      "Provide internet connectivity",
      "Display information to users"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    category: "architecture"
  },
  {
    id: 4,
    question: "Which communication protocol is most commonly used for short-range IoT device communication?",
    options: [
      "HTTP",
      "FTP",
      "Bluetooth/BLE",
      "SMTP"
    ],
    correctAnswer: 2,
    difficulty: "easy",
    category: "communication"
  },
  {
    id: 5,
    question: "What is the purpose of signal conditioning in an IoT system?",
    options: [
      "To encrypt data for security",
      "To filter, amplify, and prepare sensor signals for processing",
      "To store sensor readings",
      "To display sensor data"
    ],
    correctAnswer: 1,
    difficulty: "hard",
    category: "hardware"
  },
  {
    id: 6,
    question: "In Neurovia's parallel universe, gravity fluctuates. Which sensor would best detect water flow direction changes?",
    options: [
      "Temperature sensor",
      "Flow sensor with directional capability",
      "Light sensor",
      "Proximity sensor"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    category: "scenario"
  },
  {
    id: 7,
    question: "What type of database is most suitable for storing time-series sensor data in IoT applications?",
    options: [
      "Relational Database (SQL)",
      "Time-Series Database (InfluxDB, TimescaleDB)",
      "Graph Database",
      "File System"
    ],
    correctAnswer: 1,
    difficulty: "hard",
    category: "cloud"
  },
  {
    id: 8,
    question: "Which component would you use to control a physical device like a valve or motor?",
    options: [
      "Sensor",
      "Actuator",
      "Router",
      "Database"
    ],
    correctAnswer: 1,
    difficulty: "easy",
    category: "hardware"
  },
  {
    id: 9,
    question: "In the Lumina District, sensors must adapt to 4-hour day-night cycles. What programming concept would help?",
    options: [
      "Static thresholds",
      "Dynamic thresholds with adaptive algorithms",
      "Manual adjustments only",
      "Random values"
    ],
    correctAnswer: 1,
    difficulty: "hard",
    category: "scenario"
  },
  {
    id: 10,
    question: "What is the main advantage of edge computing in IoT systems?",
    options: [
      "Cheaper hardware costs",
      "Reduced latency and faster local processing",
      "Better graphics display",
      "Longer battery life only"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    category: "architecture"
  },
  {
    id: 11,
    question: "Which component would help protect an IoT system from electromagnetic interference in AeroHab?",
    options: [
      "Signal conditioning with filtering",
      "Larger battery",
      "More sensors",
      "Brighter display"
    ],
    correctAnswer: 0,
    difficulty: "hard",
    category: "scenario"
  },
  {
    id: 12,
    question: "What is MQTT in the context of IoT?",
    options: [
      "A type of sensor",
      "A lightweight messaging protocol for IoT communication",
      "A microcontroller brand",
      "A programming language"
    ],
    correctAnswer: 1,
    difficulty: "medium",
    category: "communication"
  }
];

// Component Store - 12 components with prices
export const componentStore = [
  {
    id: 1,
    code: "SENSOR_MULTI",
    name: "Multi-Sensor Module",
    price: 300,
    description: "Advanced sensor array capable of reading temperature, humidity, pressure, and light levels.",
    tags: ["sensor", "essential"],
    icon: "📡",
    essential: true
  },
  {
    id: 2,
    code: "SENSOR_LIGHT",
    name: "Light Sensor (LDR + ADC)",
    price: 150,
    description: "Light-dependent resistor with integrated ADC for precise luminosity measurements.",
    tags: ["sensor", "optional"],
    icon: "💡",
    essential: false
  },
  {
    id: 3,
    code: "SENSOR_PRESSURE",
    name: "Pressure/Flow Sensor",
    price: 250,
    description: "High-precision sensor for measuring fluid pressure and flow rates.",
    tags: ["sensor", "optional"],
    icon: "🌊",
    essential: false
  },
  {
    id: 4,
    code: "SIGNAL_COND",
    name: "Signal Conditioning Unit",
    price: 200,
    description: "Op-amp based circuit for filtering, amplifying, and preparing sensor signals.",
    tags: ["conditioning", "essential"],
    icon: "⚡",
    essential: true
  },
  {
    id: 5,
    code: "SIGNAL_SCALE",
    name: "Signal Scaling Module",
    price: 150,
    description: "ADC and voltage divider for converting analog signals to digital format.",
    tags: ["conditioning", "essential"],
    icon: "📊",
    essential: true
  },
  {
    id: 6,
    code: "MCU_BOARD",
    name: "Microcontroller (MCU)",
    price: 400,
    description: "Powerful microcontroller board for processing sensor data and controlling actuators.",
    tags: ["controller", "essential"],
    icon: "🧠",
    essential: true
  },
  {
    id: 7,
    code: "COMM_WIFI",
    name: "Wi-Fi/BLE Module",
    price: 250,
    description: "Dual-mode communication module supporting Wi-Fi and Bluetooth Low Energy.",
    tags: ["communication", "essential"],
    icon: "📶",
    essential: true
  },
  {
    id: 8,
    code: "COMM_LORA",
    name: "LoRa Communication Module",
    price: 300,
    description: "Long-range, low-power communication module for remote IoT deployments.",
    tags: ["communication", "optional"],
    icon: "📡",
    essential: false
  },
  {
    id: 9,
    code: "CLOUD_DB",
    name: "Cloud/Database Token",
    price: 350,
    description: "Subscription token for cloud storage and database access for sensor data.",
    tags: ["cloud", "essential"],
    icon: "☁️",
    essential: true
  },
  {
    id: 10,
    code: "ACTUATOR",
    name: "Actuator Module",
    price: 200,
    description: "Relay and motor driver for controlling physical devices like valves and motors.",
    tags: ["actuator", "essential"],
    icon: "🔧",
    essential: true
  },
  {
    id: 11,
    code: "EDGE_GATEWAY",
    name: "Edge Gateway",
    price: 320,
    description: "Local data aggregator and edge computing device for faster processing.",
    tags: ["edge", "optional"],
    icon: "🖥️",
    essential: false
  },
  {
    id: 12,
    code: "WATCHDOG",
    name: "Fail-Safe Watchdog",
    price: 220,
    description: "Safety module that monitors system health and triggers fail-safe protocols.",
    tags: ["safety", "optional"],
    icon: "🛡️",
    essential: false
  }
];

// Ideal component set (for Round 2 validation)
export const idealComponents = [
  "SENSOR_MULTI",
  "SIGNAL_SCALE", // or SIGNAL_COND
  "MCU_BOARD",
  "COMM_WIFI", // or COMM_LORA
  "CLOUD_DB",
  "ACTUATOR"
];
