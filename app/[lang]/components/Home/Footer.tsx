'use client'
import { useDataStore } from '@/stores/dataStore';
import { useSettingsStore } from '@/stores/settingsStore';
import { Clock, MapPin, Phone } from 'lucide-react';
import { PiTelegramLogoBold } from 'react-icons/pi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

const CONTACT_NUMBER = '09130232357';
const CONTACT_NUMBER_INTL = '+989130232357';

const socialLinks = [
  {
    icon: PiTelegramLogoBold,
    href: `https://t.me/${CONTACT_NUMBER_INTL}`,
    label: 'Telegram',
  },
  {
    icon: FaWhatsapp,
    href: `https://wa.me/${CONTACT_NUMBER_INTL}`,
    label: 'WhatsApp',
  },
  {
    icon: FaInstagram,
    href: 'https://instagram.com/maherservices',
    label: 'Instagram',
  }
];

export default function Footer() {
  const {tags: cardData} = useDataStore()
  const {dict, isRTL} = useSettingsStore()
  return (
    <footer className="w-full bg-(--theme) text-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">{dict.logo}</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              {dict.providingSpecializedCoilWindingAndRepairServicesForAllTypesOfElectricMotorsWithYearsOfExperienceAndQualityGuarantee}
            </p>
            <div className={`flex flex-wrap gap-2 pt-2 ${isRTL ? 'justify-end' : 'justify-start'}`}>
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-10 h-10 hover:bg-cyan-500 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  {Icon ? <Icon size={20} /> : ""}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{dict.ourServices}</h4>
            <ul className="space-y-2">
              {cardData.slice(0, 6).map((item) => (
                <li key={item.id}>
                  <div className="text-gray-300 hover:text-white text-sm transition-colors duration-200 block">
                    {dict.services[item.label as keyof typeof dict.services]}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{dict.contactUs}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-white mt-1 shrink-0" />
                <div>
                  
                  <a href={`tel:${CONTACT_NUMBER}`}
                    className="text-gray-300 text-sm hover:text-cyan-400 transition-colors duration-200"
                    dir="ltr"
                  >
                    {CONTACT_NUMBER}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-white mt-1 shrink-0" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  {dict.industrialDistrict}
                </p>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-white mt-1 shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">{dict.workingHoursDays}</p>
                  <p className="text-gray-300 text-sm">{dict.workingHoursTime}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={`text-white text-sm text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
              © {new Date().getFullYear()} {dict.allRightsReserved}
            </p>
            <p className={`text-white text-sm text-center ${isRTL ? 'md:text-left' : 'md:text-right'}`}>
              {dict.designedAndDevelopedByWebitur}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}