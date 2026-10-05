const WHATSAPP_NUMBER = "5516997407304";
const WHATSAPP_MESSAGE = "Olá! Vim pelo site do Católico Digital e gostaria de saber mais.";

export function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      className="whatsapp-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o Católico Digital pelo WhatsApp (abre em nova aba)"
    >
      <svg aria-hidden="true" viewBox="0 0 32 32" width="32" height="32" fill="currentColor">
        <path d="M16.04 3C9.4 3 4 8.4 4 15.03c0 2.12.55 4.19 1.6 6.01L4 29l8.14-1.56a12.03 12.03 0 0 0 3.9.65h.01C22.69 28.09 28 22.7 28 16.07 28 9.4 22.68 3 16.04 3Zm0 22.06h-.01c-1.18 0-2.34-.32-3.35-.92l-.24-.14-4.83.93.97-4.7-.16-.25a9.97 9.97 0 0 1-1.54-5.32c0-5.5 4.5-9.97 10.03-9.97 5.52 0 9.97 4.47 9.97 9.98 0 5.5-4.47 10.39-9.84 10.39Zm5.47-7.47c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
