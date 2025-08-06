// src/components/Contact.js
"use client";
import { useState, useEffect, useRef } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Address",
      details: ["123 Rural Road", "Farmville, State 12345"],
      color: "from-red-400 to-red-600"
    },
    {
      icon: "📞",
      title: "Helpline",
      details: ["+1 (555) 123-4567", "Available 24/7"],
      color: "from-blue-400 to-blue-600"
    },
    {
      icon: "✉️",
      title: "Email",
      details: ["info@ruralhub.com", "support@ruralhub.com"],
      color: "from-green-400 to-green-600"
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Contact Us
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Get in touch with us for any questions or support
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h3>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={info.title}
                  className="flex items-start space-x-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300"
                  style={{ animationDelay: `${0.5 + index * 0.2}s` }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0`}>
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {info.title}
                    </h4>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="mt-8 h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-gray-600">Interactive Map Coming Soon</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending...
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;


















// [17:59:49.087] Running build in Washington, D.C., USA (East) – iad1
// [17:59:49.088] Build machine configuration: 2 cores, 8 GB
// [17:59:49.110] Cloning github.com/aryankumarsingh99/Rural-Hub (Branch: main, Commit: 56a9d31)
// [17:59:49.290] Previous build caches not available
// [17:59:49.536] Cloning completed: 426.000ms
// [17:59:52.109] Running "vercel build"
// [17:59:52.557] Vercel CLI 44.7.2
// [17:59:52.941] Installing dependencies...
// [18:00:02.369] 
// [18:00:02.370] added 130 packages in 9s
// [18:00:02.370] 
// [18:00:02.371] 26 packages are looking for funding
// [18:00:02.371]   run `npm fund` for details
// [18:00:02.421] Detected Next.js version: 15.4.5
// [18:00:02.423] Running "npm run build"
// [18:00:02.533] 
// [18:00:02.534] > shopping-app@0.1.0 build
// [18:00:02.534] > next build
// [18:00:02.534] 
// [18:00:03.314] Attention: Next.js now collects completely anonymous telemetry regarding usage.
// [18:00:03.315] This information is used to shape Next.js' roadmap and prioritize features.
// [18:00:03.315] You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
// [18:00:03.315] https://nextjs.org/telemetry
// [18:00:03.315] 
// [18:00:03.418]    ▲ Next.js 15.4.5
// [18:00:03.418] 
// [18:00:03.460]    Creating an optimized production build ...
// [18:00:17.308]  ✓ Compiled successfully in 10.0s
// [18:00:17.313]    Linting and checking validity of types ...
// [18:00:24.670]    Collecting page data ...
//  [18:00:25.255] Error: Please define the MONGODB_URI environment variable inside .env.local
//  [18:00:25.256]     at 74877 (.next/server/app/api/auth/login/route.js:1:7995)
//  [18:00:25.256]     at c (.next/server/webpack-runtime.js:1:127)
//  [18:00:25.256]     at 56528 (.next/server/app/api/auth/login/route.js:1:1769)
//  [18:00:25.256]     at c (.next/server/webpack-runtime.js:1:127)
// [18:00:25.257]     at <unknown> (.next/server/app/api/auth/login/route.js:1:8690)
// [18:00:25.257]     at c.X (.next/server/webpack-runtime.js:1:1191)
//  [18:00:25.257]     at <unknown> (.next/server/app/api/auth/login/route.js:1:8665)
// [18:00:25.257]     at Object.<anonymous> (.next/server/app/api/auth/login/route.js:1:8722)
// [18:00:25.259] 
//  [18:00:25.260] > Build error occurred
// [18:00:25.263] [Error: Failed to collect page data for /api/auth/login] {
//  [18:00:25.263]   type: 'Error'
//  [18:00:25.263] }
//  [18:00:25.286] Error: Command "npm run build" exited with 1                                               