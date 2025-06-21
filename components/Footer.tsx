import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin as LinkedIn,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <img className="w-24" src="/logo-couleur.svg" alt="" />
          </div>

          {/* Contact Email */}
          <div className="flex items-center mb-8">
            <Mail className="h-5 w-5 mr-2 text-gray-400" />
            <a
              href="mailto:contact@mrservices.com"
              className="text-gray-300 hover:text-white transition-colors text-lg"
            >
              mrs.services.36@gmail.com
            </a>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6 mb-8">
            <a
              href="https://www.facebook.com/share/1AfnkmjCwh/?mibextid=wwXIfr"
              className="text-gray-400 hover:text-blue-500 transition-colors transform hover:scale-110"
              aria-label="Facebook"
              target="_blank"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://x.com/services_36?s=21"
              className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110"
              aria-label="Twitter"
              target="_blank"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com/mr_services_36?igsh=Ym45OGxzejBlNmt1&utm_source=qr"
              className="text-gray-400 hover:text-pink-500 transition-colors transform hover:scale-110"
              aria-label="Instagram"
              target="_blank"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-gray-400 text-sm border-t border-gray-800 pt-8 w-full">
            <p>
              &copy; {new Date().getFullYear()} MRServices. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
