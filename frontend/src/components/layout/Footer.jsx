const Footer = () => {
  return (
    <footer className="bg-gray-900  py-8 border-t border-gray-800">
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
