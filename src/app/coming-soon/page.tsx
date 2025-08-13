export default function ComingSoonPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-7 sm:px-10 md:px-14 lg:px-20 xl:px-[var(--fluid-pad)]">
      <h1 className="text-4xl md:text-7xl font-black tracking-tight text-center">
        SOMETHING BIG IS COMING.
      </h1>
      <p className="mt-6 text-white/70 max-w-xl text-center text-base md:text-lg">
        We are crafting an unforgettable culinary experience. Stay tuned.
      </p>

      {/* HORIZONTAL LINKS */}
      <nav
        aria-label="Social & feedback links"
        className="mt-14 w-full max-w-3xl"
      >
        <ul className="flex justify-between items-center w-full">
          <li className="flex-1">
            <a
              href="https://instagram.com/robertocchef"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-lg md:text-xl font-semibold text-white/60 hover:text-white transition-colors"
            >
              Instagram
            </a>
          </li>
          <li className="flex-1">
            <a
              href="https://www.facebook.com/robertocchef"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-lg md:text-xl font-semibold text-white/60 hover:text-white transition-colors"
            >
              Facebook
            </a>
          </li>
          <li className="flex-1">
            <a
              href="https://share.google/K9blaWcdiWGhXV2Xx" /* cambia con il tuo link */
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-lg md:text-xl font-semibold text-white/60 hover:text-white transition-colors"
            >
              Feedback
            </a>
          </li>
        </ul>
              </nav>
    </div>
  )
}