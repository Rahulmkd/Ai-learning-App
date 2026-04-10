// import { NavLink } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="px-6 mt-20  md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
//       <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
//         {/* Logo + Description */}
//         <div className="md:max-w-sm">
//           <img
//             src="/logo.svg"
//             alt="AI Learning Platform"
//             className="w-12 h-12 object-contain"
//           />
//           <p className="mt-5 text-sm leading-relaxed">
//             Transform your study materials into smart summaries, quizzes, and
//             flashcards using AI. Learn faster, smarter, and more efficiently.
//           </p>
//         </div>
//         <div className="flex-1 flex items-start md:justify-end gap-20">
//           {/* Company Links */}
//           <div>
//             <h2 className="font-semibold text-gray-800 mb-4">Company</h2>
//             <ul className="text-sm space-y-2">
//               <li>
//                 <NavLink to="/" className="hover:text-indigo-600 transition">
//                   Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/about"
//                   className="hover:text-indigo-600 transition"
//                 >
//                   About Us
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/contact"
//                   className="hover:text-indigo-600 transition"
//                 >
//                   Contact Us
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/privacy"
//                   className="hover:text-indigo-600 transition"
//                 >
//                   Privacy Policy
//                 </NavLink>
//               </li>
//             </ul>
//           </div>

//           <div>
//             <h2 className="font-semibold text-gray-800 mb-4 text-base sm:text-lg">
//               Stay Updated
//             </h2>

//             <div className="text-sm space-y-2">
//               <p className="text-gray-600">
//                 Get product updates and new features delivered to your inbox.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-2 pt-4">
//                 <input
//                   className="w-full h-10 px-3 rounded-md border border-gray-300 outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
//                   type="email"
//                   placeholder="Enter your email"
//                 />

//                 <button className="w-full sm:w-auto h-10 px-4 bg-indigo-500 text-white text-sm rounded-md hover:bg-indigo-700 transition cursor-pointer">
//                   Subscribe
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Section */}
//       <p className="pt-4 text-center text-xs md:text-sm pb-5">
//         Copyright 2026 ©{" "}
//         <a href="https://ai-learning-app-smoky.vercel.app">
//           Ai-Learning-Platform
//         </a>
//         . All Right Reserved.
//       </p>
//     </footer>
//   );
// };

// export default Footer;

import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {/* Logo + Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img
                src="/logo.svg"
                alt="AI Learning Platform"
                className="w-10 h-10 object-contain"
              />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Transform your study materials with smart platform.
            </p>
          </div>

          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Changelog", "Roadmap"],
            },
            { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
            {
              title: "Support",
              links: ["Help Center", "Contact", "Privacy Policy", "Terms"],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-4">
          <p className="text-center text-xs sm:text-sm text-gray-500">
            © 2026{" "}
            <a
              href="https://ai-learning-app-smoky.vercel.app"
              className="font-medium hover:text-white transition"
            >
              Ai-Learning-Platform
            </a>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
