import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          
          {/* Column 1: Government */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Government</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a href="https://kdsg.gov.ng" target="_blank" rel="noopener noreferrer" className="hover:text-kaduna-emerald transition-colors">
                  Kaduna State Government
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-kaduna-emerald transition-colors">Ministry of Business</a>
              </li>
              <li>
                <a href="#" className="hover:text-kaduna-emerald transition-colors">KADIPA</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Business Services */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">For Business</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a href="#" className="hover:text-kaduna-emerald transition-colors">Register a Business</a>
              </li>
              <li>
                <a href="#" className="hover:text-kaduna-emerald transition-colors">Tax Information</a>
              </li>
              <li>
                <a href="#" className="hover:text-kaduna-emerald transition-colors">Investment Guide</a>
              </li>
              <li>
                <a href="#" className="hover:text-kaduna-emerald transition-colors">Verification Portal</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <a href="#" className="hover:text-kaduna-emerald transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-kaduna-emerald transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-kaduna-emerald transition-colors">Report an Issue</a>
              </li>
              <li>
                <a href="#" className="hover:text-kaduna-emerald transition-colors">FAQs</a>
              </li>
            </ul>
          </div>

           {/* Column 4: Legal */}
           <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="#" className="hover:text-kaduna-emerald transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-kaduna-emerald transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link href="#" className="hover:text-kaduna-emerald transition-colors">Cookie Policy</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Kaduna State Government. All rights reserved.</p>
          <div className="flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-kaduna-emerald"></span>
             <span>Powered by KADGITIS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

