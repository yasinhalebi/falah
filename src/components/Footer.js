import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer(){
    return (
    <footer className="w-full py-4 bg-[#2E6DB4] dark:bg-[#1E2A38] border-t border-[#D8E1ED] dark:border-[#2A313C] backdrop-blur-lg shadow-md mt-auto z-50">
            <div className="flex justify-between items-center max-w-4xl mx-auto px-4 text-sm text-white font-system flex-col gap-4 md:flex-row md:gap-0">
                <p className='text-sm'>© 2024 Falah. All rights reserved.</p>
                <div className="flex items-center gap-4">
                    <span className="text-sm mr-2">Contact developer =></span>
                    <a href="https://github.com/yasinhalebi" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:opacity-80">
                        <FaGithub size={18} />
                    </a>
                    <a href="https://www.linkedin.com/in/yasinhalebi/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-80">
                        <FaLinkedin size={18} />
                    </a>
                    <a href="https://www.instagram.com/yasin_halebi/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-80">
                        <FaInstagram size={18} />
                    </a>
                </div>
            </div>
        </footer>
    );
}