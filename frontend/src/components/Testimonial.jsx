// ShortlyTestimonial.jsx
import React from 'react';

const testimonials = [
  {
    name: "Rinki ke papa",
    role: "Freelance Developer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "Shortly is a game-changer! I can now share clean, short links with clients instantly. The custom slug feature is brilliant.",
  },
  {
    name: "Rinki",
    role: "Marketing Lead",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    quote:
      "Shortly helped me track my campaign links better. I love the simplicity and analytics integration!",
  },
  {
    name: "Rinki ke chacha",
    role: "Startup Founder",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
    quote:
      "We use Shortly daily to shorten and share links across our team. Super-fast and reliable!",
  },
];

const Testimonial = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 w-1/2">
      <div className="max-w-8xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">What Users Say About Shortly</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-gray-50 shadow rounded-2xl p-6 hover:shadow-lg transition duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <img
                  className="w-20 h-20 rounded-full mb-4 border-4 border-indigo-100"
                  src={t.image}
                  alt={t.name}
                />
                <p className="text-gray-600 italic">“{t.quote}”</p>
                <h4 className="mt-4 text-lg font-semibold text-gray-800">{t.name}</h4>
                <p className="text-sm text-indigo-500">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
