interface HeroProps {
  subtitle: string
}

const Hero = ({ subtitle }: HeroProps) => {
  return (
    <div className='w-full mb-5 text-[var(--green)]'>
      {/* Logo + Title row */}
      <div className='flex flex-col sm:flex-row items-center justify-center gap-5'>
        <img src='https://placehold.co/60' alt='Hemo Bleed Social Logo' />
        <h1 className='jaro-logo text-4xl sm:text-5xl md:text-6xl text-center sm:text-left'>
          Hemo Bleed Social
        </h1>
      </div>

      {/* Subtitle centered horizontally across the screen */}
      <h2 className='mt-4 w-full text-center'>{subtitle}</h2>
    </div>
  )
}

export default Hero
