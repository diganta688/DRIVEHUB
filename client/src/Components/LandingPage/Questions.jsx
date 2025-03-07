import { useState } from "react";
import { TypeAnimation } from "react-type-animation";

const FAQData = [
  {
    question: "What are the requirements to rent a car with DriveHUB?",
    answer:
      "To rent a car with DriveHUB, you must:\n• Be at least 21 years old\n• Hold a valid driver's license issued at least one year prior to the rental date\n• Present a valid credit card in your name for the security deposit",
  },
  {
    question: "Can I rent a car if I'm under 25 years old?",
    answer:
      "Yes, drivers aged 21 to 24 can rent vehicles with DriveHUB. However, a young driver surcharge may apply.",
  },
  {
    question: "What forms of payment are accepted?",
    answer:
      "DriveHUB accepts major credit cards, including Visa, MasterCard, and American Express. Debit cards and cash payments are not accepted for the security deposit.",
  },
  {
    question: "Is insurance included in the rental rate?",
    answer:
      "Basic insurance coverage is included in your rental rate. Additional protection plans are available for purchase to reduce liability in case of an accident or damage.",
  },
  {
    question: "Can I add an additional driver to my rental?",
    answer:
      "Yes, additional drivers can be added for a nominal fee. All additional drivers must meet the same rental requirements and be present at the time of vehicle pickup to sign the rental agreement.",
  },
  {
    question: "What is DriveHUB's fuel policy?",
    answer:
      "Vehicles are provided with a full tank of fuel and should be returned full. If the vehicle is returned with less fuel, refueling charges will apply.",
  },
  {
    question: "Are there mileage limits on rentals?",
    answer:
      "DriveHUB offers rentals with unlimited mileage. However, certain vehicle categories may have specific mileage restrictions. It's advisable to check the terms during booking.",
  },
  {
    question: "What should I do in case of an accident or breakdown?",
    answer:
      "In the event of an accident or breakdown, contact DriveHUB's 24/7 roadside assistance immediately. Detailed instructions and contact information are provided in your rental agreement and vehicle documentation.",
  },
  {
    question: "Can I modify or cancel my reservation?",
    answer:
      "Yes, reservations can be modified or canceled online through your DriveHUB account. Please note that changes may affect rental rates, and cancellations may be subject to fees depending on the timing.",
  },
  {
    question:
      "Are there any restrictions on where I can drive the rental vehicle?",
    answer:
      "Rental vehicles from DriveHUB can be driven within national borders. Cross-border travel is subject to approval and may incur additional fees. Always inform DriveHUB in advance if you plan to travel outside the country.",
  },
  {
    question:
      "24/7 contact support",
    answer:
      "abc@gmail.com",
  },
];

const FAQItem = ({ question, answer, isActive, onClick }) => {
  return (
    <div className="h-full overflow-hidden rounded shadow-sm bg-white transition-all duration-300 ease-in-out">
      <div
        className="p-2 bg-gray-50 cursor-pointer flex justify-between items-center hover:bg-gray-100 transition-colors duration-300"
        onClick={onClick}
      >
        <h5 className="">{question}</h5>
        <span
          className={`transform transition-transform duration-300 text-sm ${
            isActive ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </div>
      <div
        className="transition-all duration-500 ease-in-out overflow-hidden"
        style={{
          maxHeight: isActive ? "500px" : "0",
          opacity: isActive ? 1 : 0,
        }}
      >
        <div className="p-2 text-xs text-gray-600 whitespace-pre-line">
          <h6>{answer}</h6>
        </div>
      </div>
    </div>
  );
};

const Questions = () => {
  const [activeIndices, setActiveIndices] = useState(new Set());

  const toggleQuestion = (index) => {
    setActiveIndices((prev) => {
      const newIndices = new Set(prev);
      if (newIndices.has(index)) {
        newIndices.delete(index);
      } else {
        newIndices.add(index);
      }
      return newIndices;
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-2 mt-5 q-main">
      <h1 className="text-xl font-bold text-center mb-4 text-gray-800">
        DriveHUB{" "}
        <TypeAnimation
          sequence={[
            "FAQ",
            1000,
            "Queries",
            1000,
            "Support",
            1000,
            "Help Center",
            1000,
          ]}
          speed={10}
          repeat={Infinity}
          className="text-black bg-cyan-200 px-2 py-1 rounded-md"
        />
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {FAQData.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isActive={activeIndices.has(index)}
            onClick={() => toggleQuestion(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Questions;
