import Link from "next/link";
import React from "react";
import { Mail, Phone } from "lucide-react";
import {
  FaLocationDot,
  FaSquareFacebook,
  FaSquareInstagram,
  FaTelegram,
  FaYoutube,
} from "react-icons/fa6";
export default function Footer() {
  const footer = [
    {
      header: "Contact Us",
      items: [
        {
          icon: FaLocationDot,
          name: "Russian Federation Boulevard, Khan Toul kork, Phnom Penh, Cambodia",
          link: "https://maps.app.goo.gl/F85DQhQCzFiuvzsC6",
        },
        {
          icon: Phone,
          name: "+855 089240766",
          link: "tel:+855089240766",
        },
        {
          icon: Mail,
          name: "cheng.menglay79@gmail.com",
          link: "mailto:cheng.menglay79@gmail.com",
        },
      ],
    },
    {
      header: "Link",
      items: [
        { icon: "", name: "Book Tickets", link: "/book-tickets" },
        { icon: "", name: "My Booking", link: "/my-booking" },
        { icon: "", name: "About Us", link: "/about" },
        { icon: "", name: "Contact Us", link: "/contact" },
      ],
    },
  ];
  const socailMedia = [
    {
      header: "Social Media",
      items: [
        {
          icon: FaSquareFacebook,
          name: "",
          link: "https://www.facebook.com/cheng.menglay",
        },
        {
          icon: FaSquareInstagram,
          name: "",
          link: "https://www.instagram.com/chengmenglay/",
        },
        {
          icon: FaTelegram,
          name: "",
          link: "https://t.me/Cheng_Meglay",
        },
        {
          icon: FaYoutube,
          name: "",
          link: "https://www.youtube.com/@chengmenglay",
        },
      ],
    },
  ];
  return (
    <footer className="w-full px-4 py-8">
      <div className="container mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {footer.map((footer) => (
          <div key={footer.header} className="min-h-[200px] space-y-4">
            <h1 className="font-bold text-2xl">{footer.header}</h1>
            <ul className=" space-y-3">
              {footer.items.map((item, idx) => (
                <Link key={idx} href={item.link} className="flex items-center">
                  {item.icon && (
                    <item.icon
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "8px",
                      }}
                    />
                  )}
                  {item.name}
                </Link>
              ))}
            </ul>
          </div>
        ))}
        {socailMedia.map((socailMedia) => (
          <div key={socailMedia.header} className="min-h-[200px] space-y-2">
            <h1 className="font-bold text-2xl">{socailMedia.header}</h1>
            <ul className=" space-x-3 flex">
              {socailMedia.items.map((item, idx) => (
                <Link key={idx} href={item.link} className="flex items-center">
                  {item.icon && (
                    <item.icon
                      style={{
                        width: "30px",
                        height: "30px",
                        marginRight: "8px",
                      }}
                    />
                  )}
                  {item.name}
                </Link>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
