import React from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Pencil,
} from 'lucide-react';

function UserProfileMain() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-600 h-48"></div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-28" style={{position: "relative", bottom: "8rem"
      }}>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden pb-5">
          <div className="p-6 sm:p-8 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row items-center p-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow">
                  <Pencil className="w-4 h-4 text-orange-500" />
                </button>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start">
                  <h1 className="text-2xl font-semibold text-gray-800">John Davidson</h1>
                  <button className="ml-2 p-1 rounded hover:bg-gray-100 transition">
                    <Pencil className="w-4 h-4 text-orange-500" />
                  </button>
                </div>
                <p className="text-gray-500 text-sm">Premium Member since 2022</p>
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-8 space-y-8">
            <div>
              <div className="flex items-center justify-between mb-4 px-3">
                <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                <button className="p-2 rounded hover:bg-gray-100 transition">
                  <Pencil className="w-5 h-5 text-orange-500" />
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 space-y-4 mx-4">
                {[
                  {
                    icon: <User className="w-5 h-5 text-blue-600 mr-3" />,
                    label: "Full Name",
                    value: "John Robert Davidson",
                  },
                  {
                    icon: <Mail className="w-5 h-5 text-blue-600 mr-3" />,
                    label: "Email",
                    value: "john.davidson@example.com",
                  },
                  {
                    icon: <Phone className="w-5 h-5 text-blue-600 mr-3" />,
                    label: "Phone",
                    value: "+1 (555) 123-4567",
                  },
                  {
                    icon: <MapPin className="w-5 h-5 text-blue-600 mr-3" />,
                    label: "Address",
                    value: "123 Rental Street, New York, NY 10001",
                  },
                  {
                    icon: <Calendar className="w-5 h-5 text-blue-600 mr-3" />,
                    label: "Driver's License Expiry",
                    value: "January 15, 2026",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start">
                    {item.icon}
                    <div>
                      <p className="text-sm text-gray-500">{item.label}</p>
                      <p className="text-gray-800">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-4 px-3">
                <h2 className="text-xl font-semibold text-gray-800">Membership Status</h2>
                <button className="p-2 rounded hover:bg-gray-100 transition">
                  <Pencil className="w-5 h-5 text-orange-500" />
                </button>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mx-4">
                <div className="flex items-center mb-4">
                  <Shield className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-800 font-medium">Premium Membership</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Current Plan</p>
                    <p className="text-gray-800 font-medium">Premium</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Valid Until</p>
                    <p className="text-gray-800 font-medium">December 31, 2024</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 px-3">Recent Rentals</h2>
              <div className="space-y-4 mx-4">
                {[
                  {
                    car: 'Tesla Model 3',
                    date: 'Mar 1 - Mar 5, 2024',
                    status: 'Completed',
                    image: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=200&h=120&fit=crop',
                  },
                  {
                    car: 'BMW X5',
                    date: 'Feb 15 - Feb 18, 2024',
                    status: 'Completed',
                    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&h=120&fit=crop',
                  },
                ].map((rental, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-xl p-4 flex items-center shadow-sm mb-4"
                  >
                    <img
                      src={rental.image}
                      alt={rental.car}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-800">{rental.car}</h3>
                      <p className="text-sm text-gray-500">{rental.date}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                        {rental.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileMain;
