import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { Mail } from "lucide-react";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/Priyanshu-69",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/priyanshu-69",
    icon: FaLinkedinIn,
  },
  {
    name: "Email",
    href: "priyanshukumarbgs066@gmail.com",
    icon: Mail,
  },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-5">
      {socials.map((social) => {
        const Icon = social.icon;

        return (
          <a
            key={social.name}
            href={social.href}
            target={social.href.startsWith("http") ? "_blank" : undefined}
            rel={
              social.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            aria-label={social.name}
            className="text-neutral-500 transition-all duration-300 hover:-translate-y-1 hover:text-black dark:text-neutral-400 dark:hover:text-white"
          >
            <Icon size={22} />
          </a>
        );
      })}
    </div>
  );
}