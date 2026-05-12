import { 
  FaLinkedin, 
  FaGithub, 
  FaWhatsapp, 
  FaInstagram, 
  FaFacebook 
} from "react-icons/fa";

export const SOCIAL_LINKS = [
  { 
    id: "linkedin", 
    href: "https://linkedin.com",
    label: "LinkedIn",
    icon: FaLinkedin
  },
  { 
    id: "github", 
    href: "https://github.com/Alg4ret3",
    label: "GitHub",
    icon: FaGithub
  },
  { 
    id: "whatsapp", 
    href: "https://wa.me/573170098770", 
    label: "WhatsApp",
    icon: FaWhatsapp
  },
];

export const WHATSAPP_CONFIG = {
  number: "573170098770",
  messages: [
    { text: "Hello!" },
    { text: "Have a project?" },
    { text: "Let's talk!" },
    { text: "How can I help?" },
    { text: "Message me!" },
  ]
};
